import { useChat } from '../../context/ChatContext';
import { type Chat } from '../../types';
import '../../styles/ChatList.css';

export function ChatList() {
  const { chats, currentChat, selectChat } = useChat();

  const isPrivateChat = (chat: Chat): boolean => {
    return 'participantId' in chat;
  };

  const handleSelectChat = (chat: Chat) => {
    selectChat(chat);
  };

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>Chats</h2>
        <button className="btn btn-icon">+</button>
      </div>

      <div className="chat-list-container">
        {chats.length === 0 ? (
          <div className="empty-state">
            <p>No chats yet</p>
            <button className="btn btn-secondary">Start a conversation</button>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => handleSelectChat(chat)}
            >
              <img
                src={
                  isPrivateChat(chat)
                    ? (chat as any).participantAvatar || '/default-avatar.png'
                    : (chat as any).avatar || '/default-group.png'
                }
                alt={isPrivateChat(chat) ? (chat as any).participantName : (chat as any).name}
                className="chat-avatar"
              />
              <div className="chat-info">
                <h3>
                  {isPrivateChat(chat) ? (chat as any).participantName : (chat as any).name}
                </h3>
                <p className="last-message">{chat.lastMessage?.content || 'No messages yet'}</p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="unread-badge">{chat.unreadCount}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
