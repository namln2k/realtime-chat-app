import { useEffect } from 'react';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { Header } from '../components/common/Header';
import { useChat } from '../context/ChatContext';

export function ChatPage() {
  const { loadChats } = useChat();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-0">
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  );
}
