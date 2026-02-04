import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  touched?: boolean;
}

export function Input({
  label,
  icon,
  error,
  touched,
  type,
  className = '',
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`relative w-full mb-2 lg:mb-5 ${className}`}>
      <div className="flex items-center gap-3 h-12 border border-chat-border rounded-full px-8 bg-primary-bg relative lg:px-8 lg:py-4 lg:h-auto dark:bg-primary-dark dark:border-gray-700">
        {icon && (
          <div className="w-5 h-5 flex items-center justify-center shrink-0 lg:w-7 lg:h-7 text-chat-border">
            {icon}
          </div>
        )}
        <input
          {...props}
          type={inputType}
          className="flex-1 border-none bg-transparent min-w-36 font-rubik text-base font-normal text-chat-lightText tracking-wide outline-none placeholder:text-chat-placeholder disabled:opacity-60 disabled:cursor-not-allowed focus:text-chat-darkText dark:text-gray-300 dark:placeholder:text-gray-500"
        />
        {isPassword && (
          <button
            type="button"
            className="w-4 h-4 lg:w-6 lg:h-6 border-none bg-transparent cursor-pointer p-0 flex items-center justify-center shrink-0 opacity-70 transition-opacity hover:opacity-100 disabled:cursor-not-allowed text-chat-border"
            onClick={() => setShowPassword(!showPassword)}
            disabled={props.disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {showPassword ? (
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
              ) : (
                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm2.31-7.37h-.02a.996.996 0 00-1.09.85l-.73 4.21 4.21.73c.48.08.89-.35.97-.84l.02-.02c1.06-6.49-1.08-5.66-3.36-4.93z" fill="currentColor" />
              )}
            </svg>
          </button>
        )}
      </div>
      <label
        htmlFor={props.id}
        className="absolute -top-4 left-[54px] lg:left-[62px] bg-primary-bg px-3 font-rubik text-base font-medium text-chat-border tracking-wide leading-relaxed dark:bg-primary-dark transition-all"
      >
        {label}
      </label>
      <span
        className={`block font-rubik text-xs text-chat-error mt-1 pl-8 leading-relaxed ${
          touched && error ? 'visible' : 'invisible'
        }`}
      >
        {error}!
      </span>
    </div>
  );
}
