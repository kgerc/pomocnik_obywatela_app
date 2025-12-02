import { supabase } from '../config/supabase.js';

class PurchasedDocument {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.documentId = data.document_id || data.documentId;
    this.documentType = data.document_type || data.documentType;
    this.stripePaymentIntentId = data.stripe_payment_intent_id || data.stripePaymentIntentId;
    this.stripeCustomerId = data.stripe_customer_id || data.stripeCustomerId;
    this.amountPaid = data.amount_paid || data.amountPaid;
    this.status = data.status; // 'pending', 'paid', 'failed'
    this.documentData = data.document_data || data.documentData;
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Find a purchased document by user and document ID
  static async findByUserAndDocumentId(userId, documentId) {
    try {
      const { data, error } = await supabase
        .from('purchased_documents')
        .select('*')
        .eq('user_id', userId)
        .eq('document_id', documentId)
        .eq('status', 'paid')
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      return data ? new PurchasedDocument(data) : null;
    } catch (error) {
      console.error('Error finding purchased document:', error);
      throw error;
    }
  }

  // Find by payment intent ID
  static async findByPaymentIntentId(paymentIntentId) {
    try {
      const { data, error } = await supabase
        .from('purchased_documents')
        .select('*')
        .eq('stripe_payment_intent_id', paymentIntentId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new PurchasedDocument(data) : null;
    } catch (error) {
      console.error('Error finding purchased document by payment intent:', error);
      throw error;
    }
  }

  // Get all purchased documents for a user
  static async findByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('purchased_documents')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'paid')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(d => new PurchasedDocument(d));
    } catch (error) {
      console.error('Error finding user purchased documents:', error);
      throw error;
    }
  }

  // Create a new purchase record
  static async create(purchaseData) {
    try {
      const { data, error } = await supabase
        .from('purchased_documents')
        .insert({
          user_id: purchaseData.userId,
          document_id: purchaseData.documentId,
          document_type: purchaseData.documentType || 'generator_pism',
          stripe_payment_intent_id: purchaseData.stripePaymentIntentId,
          stripe_customer_id: purchaseData.stripeCustomerId,
          amount_paid: purchaseData.amountPaid || 200, // 2 PLN in grosze
          status: purchaseData.status || 'pending',
          document_data: purchaseData.documentData || null
        })
        .select()
        .single();

      if (error) throw error;

      return new PurchasedDocument(data);
    } catch (error) {
      console.error('Error creating purchased document:', error);
      throw error;
    }
  }

  // Update purchase status (e.g., after payment confirmation)
  static async updateStatus(paymentIntentId, status, documentData = null) {
    try {
      const updateData = {
        status: status,
        updated_at: new Date()
      };

      if (documentData) {
        updateData.document_data = documentData;
      }

      const { data, error } = await supabase
        .from('purchased_documents')
        .update(updateData)
        .eq('stripe_payment_intent_id', paymentIntentId)
        .select()
        .single();

      if (error) throw error;

      return new PurchasedDocument(data);
    } catch (error) {
      console.error('Error updating purchased document status:', error);
      throw error;
    }
  }

  // Check if user has purchased a specific document
  static async hasPurchased(userId, documentId) {
    try {
      const document = await PurchasedDocument.findByUserAndDocumentId(userId, documentId);
      return document !== null;
    } catch (error) {
      console.error('Error checking if document is purchased:', error);
      return false;
    }
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      documentId: this.documentId,
      documentType: this.documentType,
      stripePaymentIntentId: this.stripePaymentIntentId,
      stripeCustomerId: this.stripeCustomerId,
      amountPaid: this.amountPaid,
      status: this.status,
      documentData: this.documentData,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  isPaid() {
    return this.status === 'paid';
  }
}

export default PurchasedDocument;
