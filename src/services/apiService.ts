import { type User, type Message, type PrivateChat, type GroupChat } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private headers = {
    'Content-Type': 'application/json',
  };



  private getHeaders() {
    return this.headers;
  }

  // Auth endpoints
  async login(identifier: string, password: string): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ identifier, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${errorData.message || ''}`);
    }

    const data = await response.json();
    return data;
  }

  async register(
    name: string,
    username: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, username, email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  }

  async logout(): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return response.json();
  }

  // Chat endpoints
  async getChats(): Promise<(PrivateChat | GroupChat)[]> {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    return response.json();
  }

  async getMessages(chatId: string): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  }

  async sendMessage(chatId: string, content: string): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ content }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }

  async createPrivateChat(participantId: string): Promise<{ chat: PrivateChat }> {
    const response = await fetch(`${API_BASE_URL}/chats/private`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ participantId }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to create private chat');
    }

    return response.json();
  }

  async createGroupChat(
    name: string,
    memberIds: string[],
    description?: string
  ): Promise<{ chat: GroupChat }> {
    const response = await fetch(`${API_BASE_URL}/chats/group`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, memberIds, description }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to create group chat');
    }

    return response.json();
  }

  async deleteChat(chatId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to search users');
    }

    return response.json();
  }

  async getUser(userId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: this.getHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  async updateUser(data: { name?: string; avatar?: string }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update user profile');
    }

    return response.json();
  }
}

export default new ApiService();
