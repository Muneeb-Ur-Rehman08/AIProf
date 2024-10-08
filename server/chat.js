import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatGroq } from '@langchain/groq';
import { createConversation } from './conversations.js';

const models = {
  'gemma-7b-it': { name: 'Gemma-7b-it', tokens: 8192, developer: 'Google' },
  'llama2-70b-4096': { name: 'LLaMA2-70b-chat', tokens: 4096, developer: 'Meta' },
  'llama3-70b-8192': { name: 'LLaMA3-70b-8192', tokens: 8192, developer: 'Meta' },
  'llama3-8b-8192': { name: 'LLaMA3-8b-8192', tokens: 8192, developer: 'Meta' },
  'mixtral-8x7b-32768': { name: 'Mixtral-8x7b-Instruct-v0.1', tokens: 32768, developer: 'Mistral' },
};

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  streaming: true,
});

export const handleChat = async (req, res) => {
  const { model_option, prompt, user_id, conversation_id } = req.body;

  if (!req.session.messages) {
    req.session.messages = [];
  }

  if (req.session.selected_model !== model_option) {
    req.session.messages = [];
    req.session.selected_model = model_option;
  }

  const max_tokens_range = models[model_option]?.tokens || 8192;

  if (prompt) {
    const userMessage = new HumanMessage(prompt);
    req.session.messages.push(userMessage);

    try {
      llm.modelName = model_option;
      llm.maxTokens = max_tokens_range;

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.flushHeaders();

      let assistantContent = '';
      await llm.call(
        req.session.messages,
        {},
        [
          {
            handleLLMNewToken: (token) => {
              assistantContent += token;
              res.write(`${token}`);
            },
          },
        ]
      );

      const assistantMessage = new SystemMessage(assistantContent);
      req.session.messages.push(assistantMessage);

      await createConversation(user_id, conversation_id, prompt, assistantContent, 'text');

      res.write('\n\n');
      res.end();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.json({ messages: req.session.messages });
  }
};