import { Store } from 'express-session';

class SupabaseSessionStore extends Store {
  constructor(options = {}) {
    super(options);
    this.tableName = options.tableName || 'user_sessions';
    this.client = options.client; // Supabase client
  }

  // Get session from Supabase
  async get(sid, callback) {
    try {
      const { data, error } = await this.client
        .from(this.tableName)
        .select('sess')
        .eq('sid', sid)
        .single();

      if (error) return callback(error);
      if (!data) return callback(null, null);

      return callback(null, data.sess);
    } catch (err) {
      return callback(err);
    }
  }

  // Save session to Supabase
  async set(sid, sess, callback) {
    try {
      const expire = sess.cookie.expires ? new Date(sess.cookie.expires) : new Date(Date.now() + 86400000); // Default 24h
      const { data, error } = await this.client
        .from(this.tableName)
        .upsert({ sid, sess, expire })
        .eq('sid', sid);

      return callback(error);
    } catch (err) {
      return callback(err);
    }
  }

  // Delete session from Supabase
  async destroy(sid, callback) {
    try {
      const { error } = await this.client
        .from(this.tableName)
        .delete()
        .eq('sid', sid);

      return callback(error);
    } catch (err) {
      return callback(err);
    }
  }

  // Clear all sessions
  async clear(callback) {
    try {
      const { error } = await this.client.from(this.tableName).delete();
      return callback(error);
    } catch (err) {
      return callback(err);
    }
  }

  // Get the count of sessions
  async length(callback) {
    try {
      const { count, error } = await this.client
        .from(this.tableName)
        .select('sid', { count: 'exact' });

      return callback(error, count);
    } catch (err) {
      return callback(err);
    }
  }
}

export default SupabaseSessionStore;
