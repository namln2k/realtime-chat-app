import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { type Message } from '../../types';

export function ChatWindow() {
  const { user } = useAuth();
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
      <div className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center p-8 max-w-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 dark:bg-gray-750">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800 mb-2 dark:text-white font-rubik tracking-tight">No Chat Selected</h3>
            <p className="text-gray-400 dark:text-gray-500 font-medium">Pick a conversation from the left to start messaging. Your chats are encrypted and secure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden dark:bg-gray-900 transition-colors duration-300">
      <div className="h-20 px-8 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 bg-white/80 backdrop-blur-md dark:bg-gray-800/80 sticky top-0 z-10">
        <div className="flex items-center gap-4">
            <div className="relative">
                <img 
                    src={('participantAvatar' in currentChat) ? (currentChat as any).participantAvatar || 'https://ui-avatars.com/api/?name=' + (currentChat as any).participantName : (currentChat as any).avatar || '/default-group.png'} 
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-700 shadow-sm" 
                    alt="Current chat" 
                />
            </div>
            <div>
                <h2 className="text-[17px] font-extrabold text-gray-900 dark:text-white font-rubik tracking-tight leading-none mb-1">
                    {('participantName' in currentChat) ? currentChat.participantName : currentChat.name}
                </h2>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active now</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-400 hover:text-accent hover:bg-gray-50 rounded-xl transition-all dark:hover:bg-gray-700 dark:hover:text-accent duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            <button className="p-2.5 text-gray-400 hover:text-accent hover:bg-gray-50 rounded-xl transition-all dark:hover:bg-gray-700 dark:hover:text-accent duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide bg-gray-50/30 dark:bg-transparent">
        {chatMessages.map((msg: Message) => {
          const isSent = msg.senderId === user?.id;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isSent ? 'items-end' : 'items-start'} group`}
            >
              {!isSent && (
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-4 mb-2 dark:text-gray-500">
                    {msg.senderName}
                </span>
              )}
              <div className="relative max-w-[70%]">
                  <div className={`px-5 py-3.5 rounded-3xl text-[15px] font-medium shadow-sm transition-all duration-200 ${
                      isSent 
                      ? 'bg-accent text-white rounded-tr-none dark:bg-accent-dark' 
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700'
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                  <div className={`absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2 py-1 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest dark:bg-gray-800/90 dark:border-gray-700 translate-y-full mt-1 ${
                      isSent ? 'right-0' : 'left-0'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-white border-t border-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] transition-all">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-3">
          <button type="button" className="p-3 text-gray-400 hover:text-accent transition-colors duration-200">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </button>
          <div className="flex-1 relative group">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message here..."
                disabled={isSending}
                className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-semibold text-gray-700 outline-none focus:bg-white focus:border-accent group-hover:bg-gray-100/50 dark:bg-gray-900 dark:border-transparent dark:text-gray-200 dark:focus:border-accent-dark dark:focus:bg-gray-900/50 dark:group-hover:bg-gray-900/80 disabled:opacity-50 transition-all duration-300"
                id="message-input"
                name="message"
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-accent transition-colors duration-200">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                 </svg>
              </button>
          </div>
          <button 
            type="submit" 
            disabled={isSending || !messageInput.trim()} 
            className="w-14 h-14 flex items-center justify-center bg-accent text-white rounded-2xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 active:translate-y-0 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:translate-y-0 dark:bg-accent-dark dark:disabled:bg-gray-700"
          >
            {isSending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-45 transform -translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
