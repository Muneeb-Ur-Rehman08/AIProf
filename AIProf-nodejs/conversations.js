import supabase from "./supabase.config.js";

export const createConversation = async (userId, prompt, content, type = 'text') => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ user_id: userId, prompt, content, type }]);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error creating conversation:', err.message);
    throw err;
  }
};

export const getConversationsByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching conversations:', err.message);
    throw err;
  }
};

export const getConversationById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching conversation:', err.message);
    throw err;
  }
};

export const updateConversation = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error updating conversation:', err.message);
    throw err;
  }
};

export const deleteConversation = async (id) => {
  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error deleting conversation:', err.message);
    throw err;
  }
};

export default {
  createConversation,
  getConversationsByUser,
  getConversationById,
  updateConversation,
  deleteConversation,
};