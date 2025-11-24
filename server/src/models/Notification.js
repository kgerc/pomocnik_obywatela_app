// models/Notification.js
import { supabase } from '../config/supabase.js';

class Notification {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.message = data.message;
    this.category = data.category;
    this.link = data.link;
    this.is_urgent = data.is_urgent;
    this.meta = data.meta;
    this.created_at = data.created_at;
  }

  static async create({ title, message, category = null, link = null, is_urgent = false, meta = null }) {
    const payload = { title, message, category, link, is_urgent, meta };
    const { data, error } = await supabase
      .from('notifications')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return new Notification(data);
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data ? new Notification(data) : null;
  }

  static async findAll({ limit = 50, offset = 0, category = null, urgentOnly = false } = {}) {
    let query = supabase.from('notifications').select('*').order('created_at', { ascending: false }).range(offset, offset + limit - 1);
    if (category) query = query.eq('category', category);
    if (urgentOnly) query = query.eq('is_urgent', true);
    const { data, error, count } = await query;
    if (error) throw error;
    return { notifications: (data || []).map(d => new Notification(d)), total: count };
  }

  static async delete(id) {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
}

export default Notification;
