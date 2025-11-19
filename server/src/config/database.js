import { supabase } from './supabase.js';

// Konfiguracja bazy danych i helper functions

export const db = {
  // Helper do wykonywania zapytań z obsługą błędów
  async query(tableName, operation) {
    try {
      const result = await operation(supabase.from(tableName));
      
      if (result.error) {
        throw new Error(`Database error in ${tableName}: ${result.error.message}`);
      }
      
      return result;
    } catch (error) {
      console.error(`Database query failed for ${tableName}:`, error);
      throw error;
    }
  },

  // SELECT
  async select(tableName, columns = '*', filters = {}) {
    return this.query(tableName, (table) => {
      let query = table.select(columns);
      
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else if (value !== null && value !== undefined) {
          query = query.eq(key, value);
        }
      });
      
      return query;
    });
  },

  // INSERT
  async insert(tableName, data) {
    return this.query(tableName, (table) => 
      table.insert(data).select()
    );
  },

  // UPDATE
  async update(tableName, id, data) {
    return this.query(tableName, (table) => 
      table.update(data).eq('id', id).select()
    );
  },

  // DELETE
  async delete(tableName, id) {
    return this.query(tableName, (table) => 
      table.delete().eq('id', id)
    );
  },

  // COUNT
  async count(tableName, filters = {}) {
    return this.query(tableName, (table) => {
      let query = table.select('*', { count: 'exact', head: true });
      
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
      
      return query;
    });
  },

  // SEARCH - full text search
  async search(tableName, column, searchTerm) {
    return this.query(tableName, (table) => 
      table.select('*').ilike(column, `%${searchTerm}%`)
    );
  }
};

// Transaction helper (Supabase nie wspiera natywnych transakcji, ale możemy symulować)
export const transaction = async (operations) => {
  const results = [];
  const rollbackOperations = [];

  try {
    for (const operation of operations) {
      const result = await operation();
      results.push(result);
      
      // Przygotuj operację rollback jeśli jest możliwa
      if (operation.rollback) {
        rollbackOperations.push(operation.rollback);
      }
    }
    
    return { success: true, results };
  } catch (error) {
    // Próba rollback
    console.error('Transaction failed, attempting rollback:', error);
    
    for (const rollback of rollbackOperations.reverse()) {
      try {
        await rollback();
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }
    
    throw error;
  }
};

// Pagination helper
export const paginate = (query, page = 1, limit = 10) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  return query.range(from, to);
};

// Connection check
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Database connection failed:', error);
      return false;
    }

    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

// Initialize database (sprawdź połączenie przy starcie)
export const initDatabase = async () => {
  console.log('🔌 Initializing database connection...');
  
  const connected = await checkConnection();
  
  if (!connected) {
    throw new Error('Cannot connect to database. Check your Supabase credentials.');
  }
  
  return true;
};

export default {
  db,
  transaction,
  paginate,
  checkConnection,
  initDatabase,
  supabase
};