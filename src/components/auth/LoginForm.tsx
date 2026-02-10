import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData } from '../../types';
import { Input } from '../common/Input';
import { SocialLogin } from './SocialLogin';
import heroImage from '../../assets/images/auth-hero.png';
import { Loading } from '../common/Loading';

export function LoginForm() {
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();

    const validateForm = (values: LoginFormData) => {
        const errors: Partial<Record<keyof LoginFormData, string>> = {};

        if (!values.identifier) {
            errors.identifier = 'Username or Email is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } =
        useForm({
            initialValues: { identifier: '', password: '' },
            validate: validateForm,
            onSubmit: async (values) => {
                try {
                    await login(values.identifier, values.password);
                    navigate('/');
                } catch (err) {
                    console.error('Login failed:', err);
                }
            },
        });

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-primary-bg overflow-hidden lg:items-stretch lg:justify-center dark:bg-primary-dark">
            {(isLoading || isSubmitting) && <Loading fullScreen message="Logging in..." />}
            {/* Decorative background shape */}
            <div className="absolute top-0 right-0 w-full h-52 bg-accent rounded-bl-full rounded-br-full z-0 lg:fixed lg:top-40 lg:right-[10%] lg:left-auto lg:w-[540px] lg:h-[900px] lg:rounded-t-[400px] lg:rounded-b-none dark:bg-accent-dark"></div>

            {/* Page title */}
            <h1 className="relative z-20 font-rubik text-4xl lg:text-7xl font-bold text-chat-darkText text-center mt-10 leading-none lg:text-[48px] lg:mt-6 lg:mb-24 lg:ml-[8%] lg:w-[540px] lg:text-[#424242] dark:text-gray-100">Login</h1>

            {/* Hero image */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2 w-40 h-32 flex items-center justify-center z-10 lg:fixed lg:top-[56%] lg:left-[68%] lg:-translate-y-1/2 lg:w-[500px] lg:h-[500px]">
                <img src={heroImage} alt="Young man with laptop" className="w-full h-full object-contain pointer-events-none" />
            </div>

            {/* Main content */}
            <div className="relative z-20 mt-52 lg:mt-0 lg:ml-[8%] lg:max-w-[540px] w-full max-w-[400px] px-8 sm:max-w-[450px] sm:mx-auto lg:mx-0 pb-6 lg:pb-0">
                {error && <div className="p-3 rounded-lg absolute -mt-20 w-[calc(100%-64px)] font-rubik text-sm leading-relaxed bg-red-50 text-chat-error border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 lg:gap-1 mb-4">
                    <Input
                        label="Username or Email"
                        id="identifier"
                        name="identifier"
                        value={values.identifier}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your username or email"
                        disabled={isSubmitting || isLoading}
                        error={errors.identifier}
                        touched={touched.identifier}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                        placeholder="Enter your password"
                        disabled={isSubmitting || isLoading}
                        error={errors.password}
                        touched={touched.password}
                        icon={
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10C18.66 10 20 11.34 20 13V19C20 20.66 18.66 22 17 22H7C5.34 22 4 20.66 4 19V13C4 11.34 5.34 10 7 10ZM9 10H15V8C15 6.34 13.66 5 12 5C10.34 5 9 6.34 9 8V10ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor" />
                            </svg>
                        }
                    />

                    {/* Forgot Password */}
                    <div className="text-right mb-2 lg:mb-6">
                        <a href="/forgot-password" title="Forgot Password" className="font-rubik text-sm lg:text-xl font-medium lg:font-semibold text-chat-lightText tracking-wide transition-colors hover:text-chat-link dark:text-gray-400">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-4 px-3 bg-chat-buttonBg border-none rounded-full font-rubik text-lg lg:text-2xl font-semibold text-chat-buttonText cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(252,226,206,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-accent-dark dark:text-gray-200"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Social Login */}
                <SocialLogin disabled={isSubmitting || isLoading} />

                {/* Sign Up Link */}
                <div className="text-center mt-[10px] lg:mt-6 flex justify-center gap-1 font-rubik text-base lg:text-[18px] tracking-wide leading-relaxed">
                    <span className="font-normal text-chat-darkText opacity-40 dark:text-gray-100">Don't have an account?</span>
                    <a href="/register" className="font-semibold text-chat-link transition-colors hover:text-chat-darkText dark:hover:text-gray-100 decoration-chat-link underline-offset-4">Sign up</a>
                </div>
            </div>
        </div>
    );
}
