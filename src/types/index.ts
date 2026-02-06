// User types
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  roles: UserRole[];
  avatar?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  chatId: string;
  isRead: boolean;
}

// Chat types
export interface PrivateChat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

export interface GroupChat {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  members: User[];
  admin: string; // User ID
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

export type Chat = PrivateChat | GroupChat;

// Form types
export interface LoginFormData {
  identifier: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateGroupFormData {
  name: string;
  description?: string;
  memberIds: string[];
}
