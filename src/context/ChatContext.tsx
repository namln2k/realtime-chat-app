import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { type Chat, type Message } from '../types';

interface ChatState {
  chats: Chat[];
  currentChat: Chat | null;
  messages: Map<string, Message[]>; // chatId -> messages
  isLoading: boolean;
  error: string | null;
}

interface ChatAction {
  type:
    | 'LOAD_CHATS_START'
    | 'LOAD_CHATS_SUCCESS'
    | 'LOAD_CHATS_ERROR'
    | 'SELECT_CHAT'
    | 'ADD_MESSAGE'
    | 'LOAD_MESSAGES_SUCCESS'
    | 'CREATE_CHAT_SUCCESS'
    | 'DELETE_CHAT'
    | 'UPDATE_CHAT';
  payload?: any;
}

const initialState: ChatState = {
  chats: [],
  currentChat: null,
  messages: new Map(),
  isLoading: false,
  error: null,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'LOAD_CHATS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOAD_CHATS_SUCCESS':
      return {
        ...state,
        chats: action.payload,
        isLoading: false,
      };
    case 'LOAD_CHATS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SELECT_CHAT':
      return {
        ...state,
        currentChat: action.payload,
      };
    case 'ADD_MESSAGE':
      if (!state.currentChat) return state;
      const chatMessages = state.messages.get(state.currentChat.id) || [];
      return {
        ...state,
        messages: new Map(state.messages).set(state.currentChat.id, [
          ...chatMessages,
          action.payload,
        ]),
      };
    case 'LOAD_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: new Map(state.messages).set(action.payload.chatId, action.payload.messages),
      };
    case 'CREATE_CHAT_SUCCESS':
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case 'DELETE_CHAT':
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload),
        currentChat: state.currentChat?.id === action.payload ? null : state.currentChat,
      };
    case 'UPDATE_CHAT':
      return {
        ...state,
        chats: state.chats.map((chat) => (chat.id === action.payload.id ? action.payload : chat)),
      };
    default:
      return state;
  }
};

interface ChatContextType extends ChatState {
  selectChat: (chat: Chat) => void;
  sendMessage: (content: string) => Promise<void>;
  loadChats: () => Promise<void>;
  loadMessages: (chatId: string) => Promise<void>;
  createPrivateChat: (participantId: string) => Promise<void>;
  createGroupChat: (name: string, memberIds: string[], description?: string) => Promise<void>;
  deleteChat: (chatId: string) => void;
  dispatch: React.Dispatch<ChatAction>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const selectChat = (chat: Chat) => {
    dispatch({ type: 'SELECT_CHAT', payload: chat });
  };

  const sendMessage = async (content: string) => {
    if (!state.currentChat) return;
    try {
      // TODO: Replace with actual API call
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: 'current-user-id',
        senderName: 'Current User',
        content,
        timestamp: new Date(),
        chatId: state.currentChat.id,
        isRead: true,
      };
      dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const loadChats = async () => {
    dispatch({ type: 'LOAD_CHATS_START' });
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.getChats();
      dispatch({ type: 'LOAD_CHATS_SUCCESS', payload: [] });
    } catch (error) {
      dispatch({ type: 'LOAD_CHATS_ERROR', payload: (error as Error).message });
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.getMessages(chatId);
      dispatch({
        type: 'LOAD_MESSAGES_SUCCESS',
        payload: { chatId, messages: [] },
      });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const createPrivateChat = async (participantId: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.createPrivateChat(participantId);
      // dispatch({ type: 'CREATE_CHAT_SUCCESS', payload: response.chat });
    } catch (error) {
      console.error('Failed to create private chat:', error);
    }
  };

  const createGroupChat = async (name: string, memberIds: string[], description?: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.createGroupChat(name, memberIds, description);
      // dispatch({ type: 'CREATE_CHAT_SUCCESS', payload: response.chat });
    } catch (error) {
      console.error('Failed to create group chat:', error);
    }
  };

  const deleteChat = (chatId: string) => {
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
    // TODO: Call API to delete chat
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        selectChat,
        sendMessage,
        loadChats,
        loadMessages,
        createPrivateChat,
        createGroupChat,
        deleteChat,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
