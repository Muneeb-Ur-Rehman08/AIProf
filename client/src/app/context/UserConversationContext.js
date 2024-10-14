import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { getUser } from "../../comon.lib";
import _ from "lodash";
import { createClient } from "@supabase/supabase-js";

// Create a context
const UserConversationContext = createContext();

export const useUserConversation = () => {
  return useContext(UserConversationContext);
};

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)


// Create a provider component
export const UserConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [session, setSession] = useState(null)
  const [selectedConversation, setSelectedConversation] = useState(null);
  const fetchHistoryCalled = useRef(false);

  const fetchHistory = async () => {
    if (session?.user?.id && !fetchHistoryCalled.current) {
      fetchHistoryCalled.current = true;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/conversations`,
        {
          params: {
            user_id: session?.user?.id,
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


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session && session?.user?.id && !conversations?.length) {
      fetchHistory();
    }
  }, [session, window.location.href]);

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    if (window.SecureStore) {
      window.SecureStore.clearAll();
    }
    setSession(null);
    setConversations([]);
    setSelectedConversation(null);
    fetchHistoryCalled.current = false;
  }

  const useConversationProps = {
    conversations: _.isArray(conversations) ? conversations : [],
    setConversations,
    addConversation,
    removeConversation,
    fetchHistory,
    session,
    supabase,
    signOut,
    selectedConversation,
    setSelectedConversation,
  };

  return (
    <UserConversationContext.Provider value={useConversationProps}>
      {children}
    </UserConversationContext.Provider>
  );
};
