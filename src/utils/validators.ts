// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Username validation
export const isValidUsername = (username: string): boolean => {
  return username.length >= 3 && username.length <= 20;
};

// Chat name validation
export const isValidChatName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 100;
};

// Message validation
export const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.length <= 5000;
};
