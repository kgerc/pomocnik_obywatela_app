import { supabase } from '../config/supabase.js';

class PromoCode {
  constructor(data) {
    this.id = data.id;
    this.code = data.code;
    this.description = data.description;
    this.maxUses = data.max_uses || data.maxUses;
    this.currentUses = data.current_uses || data.currentUses || 0;
    this.validFrom = data.valid_from || data.validFrom;
    this.validUntil = data.valid_until || data.validUntil;
    this.isActive = data.is_active !== undefined ? data.is_active : data.isActive;
    this.discountPercent = data.discount_percent !== undefined ? data.discount_percent : (data.discountPercent || 100);
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Find promo code by code string
  static async findByCode(code) {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      return data ? new PromoCode(data) : null;
    } catch (error) {
      console.error('Error finding promo code:', error);
      throw error;
    }
  }

  // Check if user already redeemed this code
  static async hasUserRedeemed(promoCodeId, userId) {
    try {
      const { data, error } = await supabase
        .from('promo_code_redemptions')
        .select('id')
        .eq('promo_code_id', promoCodeId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking redemption:', error);
      throw error;
    }
  }

  // Validate if code can be used
  async validate(userId) {
    const now = new Date();

    // Check if active
    if (!this.isActive) {
      return { valid: false, reason: 'Kod promocyjny jest nieaktywny' };
    }

    // Check validity period
    if (this.validFrom && new Date(this.validFrom) > now) {
      return { valid: false, reason: 'Kod promocyjny jeszcze nie obowiązuje' };
    }

    if (this.validUntil && new Date(this.validUntil) < now) {
      return { valid: false, reason: 'Kod promocyjny wygasł' };
    }

    // Check max uses
    if (this.maxUses !== null && this.currentUses >= this.maxUses) {
      return { valid: false, reason: 'Kod promocyjny osiągnął limit użyć' };
    }

    // Check if user already redeemed
    const alreadyRedeemed = await PromoCode.hasUserRedeemed(this.id, userId);
    if (alreadyRedeemed) {
      return { valid: false, reason: 'Już wykorzystałeś ten kod promocyjny' };
    }

    return { valid: true };
  }

  // Redeem code for user
  async redeem(userId) {
    try {
      // Validate first
      const validation = await this.validate(userId);
      if (!validation.valid) {
        throw new Error(validation.reason);
      }

      // Create redemption record
      const { error: redemptionError } = await supabase
        .from('promo_code_redemptions')
        .insert({
          promo_code_id: this.id,
          user_id: userId
        });

      if (redemptionError) throw redemptionError;

      // Increment current uses
      const { error: updateError } = await supabase
        .from('promo_codes')
        .update({
          current_uses: this.currentUses + 1,
          updated_at: new Date()
        })
        .eq('id', this.id);

      if (updateError) throw updateError;

      return true;
    } catch (error) {
      console.error('Error redeeming promo code:', error);
      throw error;
    }
  }

  // Create new promo code (admin function)
  static async create(codeData) {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert({
          code: codeData.code.toUpperCase(),
          description: codeData.description,
          max_uses: codeData.maxUses,
          valid_from: codeData.validFrom,
          valid_until: codeData.validUntil,
          is_active: codeData.isActive !== undefined ? codeData.isActive : true
        })
        .select()
        .single();

      if (error) throw error;

      return new PromoCode(data);
    } catch (error) {
      console.error('Error creating promo code:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      description: this.description,
      maxUses: this.maxUses,
      currentUses: this.currentUses,
      validFrom: this.validFrom,
      validUntil: this.validUntil,
      isActive: this.isActive,
      discountPercent: this.discountPercent,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  isFree() {
    return this.discountPercent === 100;
  }
}

export default PromoCode;
