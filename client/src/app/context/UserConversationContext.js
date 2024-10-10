import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { getUser } from "../../comon.lib";
import _ from "lodash";

// Create a context
const UserConversationContext = createContext();

export const useUserConversation = () => {
  return useContext(UserConversationContext);
};

// Create a provider component
export const UserConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const userData = getUser();
  const fetchHistory = async () => {
    if (userData?.user?.id) {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/conversations`,
        {
          params: {
            user_id: userData?.user?.id,
          },
        }
      );
      if (response?.data?.code === 0) {
        setConversations(response?.data?.result);
      }
    }
  };

  // Function to add a new conversation
  const addConversation = (conversation) => {
    setConversations([...conversations, conversation]);
  };

  // Function to remove a conversation
  const removeConversation = (id) => {
    setConversations(conversations.filter((convo) => convo.id !== id));
  };

  const useConversationProps = {
    conversations: _.isArray(conversations) ? conversations : [],
    setConversations,
    userData,
    addConversation,
    removeConversation,
    fetchHistory,
  };

  return (
    <UserConversationContext.Provider value={useConversationProps}>
      {children}
    </UserConversationContext.Provider>
  );
};
