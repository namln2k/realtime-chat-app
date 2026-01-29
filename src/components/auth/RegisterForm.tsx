import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { type RegisterFormData } from '../../types';
import '../../../src/styles/Auth.css';

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();

  const validateForm = (values: RegisterFormData) => {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {};

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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      validate: validateForm,
      onSubmit: async (values) => {
        await register(values.username, values.email, values.password);
      },
    });

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Register</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              disabled={isSubmitting || isLoading}
            />
            {touched.username && errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              disabled={isSubmitting || isLoading}
            />
            {touched.email && errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
              disabled={isSubmitting || isLoading}
            />
            {touched.password && errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
              disabled={isSubmitting || isLoading}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting || isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="form-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
