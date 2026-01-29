import { useEffect } from 'react';
import { ChatList } from '../components/chat/ChatList';
import { ChatWindow } from '../components/chat/ChatWindow';
import { Header } from '../components/common/Header';
import { useChat } from '../context/ChatContext';
import '../styles/ChatPage.css';

export function ChatPage() {
  const { loadChats } = useChat();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  return (
    <div className="chat-page">
      <Header />
      <div className="chat-main">
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  );
}
