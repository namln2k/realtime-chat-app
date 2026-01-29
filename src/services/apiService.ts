import { type User, type Message, type PrivateChat, type GroupChat } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private headers = {
    'Content-Type': 'application/json',
  };

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders() {
    const token = this.getAuthToken();
    return {
      ...this.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    return data;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('authToken');
  }

  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getHeaders(),
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
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }

    return response.json();
  }

  async getMessages(chatId: string): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
      headers: this.getHeaders(),
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
    });

    if (!response.ok) {
      throw new Error('Failed to delete chat');
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to search users');
    }

    return response.json();
  }

  async getUser(userId: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }
}

export default new ApiService();
