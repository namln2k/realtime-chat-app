import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData } from '../../types';
import '../../styles/LoginPage.css';

// Asset images from Figma (Mobile & Desktop designs)
const youngManImage = 'https://www.figma.com/api/mcp/asset/a7f76790-dac5-4abc-bc44-3d8c16a0fcd5';

// Social icons
const googleIcon = 'https://www.figma.com/api/mcp/asset/6f61d4f7-973e-4554-9915-5b6bd72458bc';
const facebookIcon = 'https://www.figma.com/api/mcp/asset/f57db32c-69b9-40d3-a323-bf5eddf57330';
const linkedinIcon = 'https://www.figma.com/api/mcp/asset/cfe16569-3600-46d2-897b-807865e3fb2a';

export function LoginForm() {
    const { login, isLoading, error } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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
                await login(values.identifier, values.password);
                navigate('/me');
            },
        });

    return (
        <div className="login-page-container">
            {/* Decorative background shape */}
            <div className="login-page-shape"></div>

            {/* Page title */}
            <h1 className="login-page-title">Login</h1>

            {/* Hero image */}
            <div className="login-page-image">
                <img src={youngManImage} alt="Young man with laptop" />
            </div>

            {/* Main content */}
            <div className="login-page-content">
                {error && <div className="login-page-alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-page-form">
                    {/* Identifier Field (Username or Email) */}
                    <div className="login-page-input-group">
                        <div className="login-page-input-wrapper">
                            <div className="login-page-input-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                value={values.identifier}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your username or email"
                                disabled={isSubmitting || isLoading}
                                className="login-page-input"
                            />
                        </div>
                        <label htmlFor="identifier" className="login-page-label">Username or Email</label>
                        <span className="login-page-error" style={{ visibility: touched.identifier && errors.identifier ? 'visible' : 'hidden' }}>{errors.identifier}!</span>
                    </div>

                    {/* Password Field */}
                    <div className="login-page-input-group">
                        <div className="login-page-input-wrapper">
                            <div className="login-page-input-icon">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 10V8C7 5.24 9.24 3 12 3C14.76 3 17 5.24 17 8V10C18.66 10 20 11.34 20 13V19C20 20.66 18.66 22 17 22H7C5.34 22 4 20.66 4 19V13C4 11.34 5.34 10 7 10ZM9 10H15V8C15 6.34 13.66 5 12 5C10.34 5 9 6.34 9 8V10ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z" fill="currentColor" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter your password"
                                disabled={isSubmitting || isLoading}
                                className="login-page-input"
                            />
                            <button
                                type="button"
                                className="login-page-eye-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isSubmitting || isLoading}
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
                        </div>
                        <label htmlFor="password" className="login-page-label">Password</label>
                        <span className="login-page-error" style={{ visibility: touched.password && errors.password ? 'visible' : 'hidden' }}>{errors.password}!</span>
                    </div>

                    {/* Forgot Password */}
                    <div className="login-page-forgot">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="login-page-button"
                        disabled={isSubmitting || isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Social Login */}
                <div className="login-page-divider">
                    <span>- or -</span>
                </div>

                <div className="login-page-social">
                    <button className="login-page-social-btn" type="button" disabled={isSubmitting || isLoading}>
                        <img src={googleIcon} alt="Google" />
                    </button>
                    <button className="login-page-social-btn" type="button" disabled={isSubmitting || isLoading}>
                        <img src={facebookIcon} alt="Facebook" />
                    </button>
                    <button className="login-page-social-btn" type="button" disabled={isSubmitting || isLoading}>
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </button>
                </div>

                {/* Sign Up Link */}
                <div className="login-page-signup">
                    <span>Don't have an account?</span>
                    <a href="/register">Sign up</a>
                </div>
            </div>
        </div>
    );
}
