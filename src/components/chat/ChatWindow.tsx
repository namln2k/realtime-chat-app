import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { type Message } from '../../types';
import '../../styles/ChatWindow.css';

export function ChatWindow() {
  const { currentChat, messages, sendMessage, loadMessages } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat.id);
    }
  }, [currentChat, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const chatMessages = currentChat ? messages.get(currentChat.id) || [] : [];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(messageInput);
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!currentChat) {
    return (
      <div className="chat-window empty">
        <div className="empty-state">
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{('participantName' in currentChat) ? currentChat.participantName : currentChat.name}</h2>
      </div>

      <div className="messages-container">
        {chatMessages.map((msg: Message) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === 'current-user-id' ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p className="message-sender">{msg.senderName}</p>
              <p className="message-text">{msg.content}</p>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-input-form">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
          className="message-input"
        />
        <button type="submit" disabled={isSending || !messageInput.trim()} className="btn btn-primary">
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
