import supabase from "./supabase.config.js";

export const createConversation = async (userId, conversationId, prompt, content, type = 'text') => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{ user_id: userId, conversation_id: conversationId, prompt, content, type }]);

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error creating conversation:', err.message);
    throw err;
  }
};

const re_arange_by_conversation_id = (data) => {
  const result = [];

  const conversationMap = data.reduce((acc, conversation) => {
    if (!acc[conversation.conversation_id]) {
      acc[conversation.conversation_id] = {
        conversation_id: conversation.conversation_id,
        title: conversation.prompt,
        created_date: conversation.created_at,
        messages: []
      };
    }
    acc[conversation.conversation_id].messages.push(conversation);
    return acc;
  }, {});

  for (const key in conversationMap) {
    result.push(conversationMap[key]);
  }

  return result;
}

export const getConversationsByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    const re_aranged_data = re_arange_by_conversation_id(data);

    if (error) throw error;
    return re_aranged_data;
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

export const getConversationByUserAndConversationId = async (userId, conversationId) => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .eq('conversation_id', conversationId);

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