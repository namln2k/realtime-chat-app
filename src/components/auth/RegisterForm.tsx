import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { type RegisterFormData } from '../../types';
import { Input } from '../common/Input';
import { SocialLogin } from './SocialLogin';
import youngManImage from '../../assets/images/auth-hero.png';
import { Loading } from '../common/Loading';

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = (values: RegisterFormData) => {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {};

    if (!values.name) {
      errors.name = 'Full Name is required';
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useForm({
      initialValues: {
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validate: validateForm,
      onSubmit: async (values) => {
        try {
          await register(values.name, values.username, values.email, values.password);
          toast.success('Registration successful! You can now update your avatar and display name.', {
            duration: 50000,
            style: {
              background: '#333',
              color: '#fff',
            },
          });
          navigate('/me');
        } catch (err) {
          console.log(err);
        }
      },
    });

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-primary-bg overflow-hidden lg:items-stretch lg:justify-center dark:bg-primary-dark">
            {(isLoading || isSubmitting) && <Loading fullScreen message="Creating your account..." />}
            {/* Decorative background shape */}
            <div className="absolute top-0 right-0 w-full h-52 bg-accent rounded-bl-full rounded-br-full z-0 lg:fixed lg:top-40 lg:right-[10%] lg:left-auto lg:w-[540px] lg:h-[900px] lg:rounded-t-[400px] lg:rounded-b-none dark:bg-accent-dark"></div>

            {/* Page title */}
            <h1 className="relative z-20 font-rubik text-4xl lg:text-7xl font-bold text-chat-darkText text-center mt-10 leading-none lg:text-[48px] lg:mt-6 lg:mb-24 lg:ml-[8%] lg:w-[540px] lg:text-[#424242] dark:text-gray-100">Sign Up</h1>

            {/* Hero image */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 h-32 flex items-center justify-center z-10 lg:fixed lg:top-[56%] lg:left-[68%] lg:-translate-y-1/2 lg:w-[500px] lg:h-[500px]">
                <img src={youngManImage} alt="Young man with laptop" className="w-full h-full object-contain pointer-events-none" />
            </div>

            {/* Main content */}
            <div className="relative z-20 mt-52 lg:mt-0 lg:ml-[8%] lg:max-w-[540px] w-full max-w-[400px] px-8 sm:max-w-[450px] sm:mx-auto lg:mx-0 pb-6 lg:pb-0">
                {error && <div className="p-3 rounded-lg absolute -mt-20 w-[calc(100%-64px)] font-rubik text-sm leading-relaxed bg-red-50 text-chat-error border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 lg:gap-1 mb-4">
                    <Input
                        label="Full Name"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        disabled={isSubmitting || isLoading}
                        error={errors.name}
                        touched={touched.name}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 21V19C18 17.9391 17.5786 16.9217 16.8284 16.1716C16.0783 15.4214 15.0609 15 14 15H10C8.93913 15 7.92172 15.4214 7.17157 16.1716C6.42143 16.9217 6 17.9391 6 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />
                    <Input
                        label="Username"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Choose a username"
                        disabled={isSubmitting || isLoading}
                        error={errors.username}
                        touched={touched.username}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />

                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        disabled={isSubmitting || isLoading}
                        error={errors.email}
                        touched={touched.email}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M2 6L11 13L20 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />

                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Create a password"
                        disabled={isSubmitting || isLoading}
                        error={errors.password}
                        touched={touched.password}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10C18.66 10 20 11.34 20 13V19C20 20.66 18.66 22 17 22H7C5.34 22 4 20.66 4 19V13C4 11.34 5.34 10 7 10ZM9 10H15V8C15 6.34 13.66 5 12 5C10.34 5 9 6.34 9 8V10ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor" />
                            </svg>
                        }
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm your password"
                        disabled={isSubmitting || isLoading}
                        error={errors.confirmPassword}
                        touched={touched.confirmPassword}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10C18.66 10 20 11.34 20 13V19C20 20.66 18.66 22 17 22H7C5.34 22 4 20.66 4 19V13C4 11.34 5.34 10 7 10ZM9 10H15V8C15 6.34 13.66 5 12 5C10.34 5 9 6.34 9 8V10ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor" />
                            </svg>
                        }
                    />

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-4 px-3 bg-chat-buttonBg border-none rounded-full font-rubik text-lg lg:text-2xl font-semibold text-chat-buttonText cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(252,226,206,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-accent-dark dark:text-gray-200"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Sign Up'}
                    </button>
                </form>

                {/* Social Login */}
                <SocialLogin disabled={isSubmitting || isLoading} />

                {/* Login Link */}
                <div className="text-center mt-[10px] flex justify-center gap-1 font-rubik text-base lg:text-[18px] tracking-wide leading-relaxed">
                    <span className="font-normal text-chat-darkText opacity-40 dark:text-gray-100">Already have an account?</span>
                    <a href="/login" className="font-semibold text-chat-link transition-colors hover:text-chat-darkText dark:hover:text-gray-100 decoration-chat-link underline-offset-4">Login</a>
                </div>
            </div>
        </div>
  );
}
