import { useChat } from '../../context/ChatContext';
import { type Chat } from '../../types';

export function ChatList() {
  const { chats, currentChat, selectChat } = useChat();

  const isPrivateChat = (chat: Chat): boolean => {
    return 'participantId' in chat;
  };

  const handleSelectChat = (chat: Chat) => {
    selectChat(chat);
  };

  return (
    <div className="w-[350px] bg-white border-r border-gray-100 flex flex-col overflow-hidden dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
      <div className="p-6 flex justify-between items-center border-b border-gray-50 dark:border-gray-700">
        <h2 className="text-xl font-extrabold text-gray-800 dark:text-white font-rubik tracking-tight">Messages</h2>
        <button className="w-10 h-10 flex items-center justify-center bg-accent/10 text-accent rounded-xl hover:bg-accent hover:text-white transition-all duration-200 dark:bg-accent-dark/20 dark:text-accent dark:hover:bg-accent-dark dark:hover:text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-hide">
        {chats.length === 0 ? (
          <div className="py-12 px-6 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 dark:bg-gray-750">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                 </svg>
            </div>
            <p className="text-gray-400 font-medium mb-6 dark:text-gray-500">No chats yet</p>
            <button className="px-5 py-2.5 bg-accent text-chat-buttonText rounded-xl font-bold shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:-translate-y-0.5 transition-all text-sm dark:bg-accent-dark">Start a conversation</button>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 group ${
                currentChat?.id === chat.id 
                ? 'bg-accent shadow-lg shadow-accent/20 text-white dark:bg-accent-dark dark:shadow-none' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={
                    isPrivateChat(chat)
                      ? (chat as any).participantAvatar || 'https://ui-avatars.com/api/?name=' + (chat as any).participantName
                      : (chat as any).avatar || '/default-group.png'
                  }
                  alt={isPrivateChat(chat) ? (chat as any).participantName : (chat as any).name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-300"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full dark:border-gray-800 ${currentChat?.id === chat.id ? 'bg-white' : 'bg-green-500'}`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <h3 className={`font-bold text-[15px] truncate ${currentChat?.id === chat.id ? 'text-white' : 'text-gray-900 dark:text-white font-rubik'}`}>
                      {isPrivateChat(chat) ? (chat as any).participantName : (chat as any).name}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-tight shrink-0 mt-1 ${currentChat?.id === chat.id ? 'text-white/70' : 'text-gray-400'}`}>12:45</span>
                </div>
                <p className={`text-xs truncate ${currentChat?.id === chat.id ? 'text-white/80 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                  {chat.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
              
              {chat.unreadCount > 0 && (
                <span className={`h-5 min-w-[20px] px-1.5 flex items-center justify-center rounded-lg text-[10px] font-bold ring-2 ring-white dark:ring-gray-800 shadow-sm ${
                    currentChat?.id === chat.id ? 'bg-white text-accent' : 'bg-accent text-white'
                }`}>
                    {chat.unreadCount}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
