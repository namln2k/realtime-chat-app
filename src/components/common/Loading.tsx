import '../../styles/Loading.css';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export function Loading({ fullScreen = false, message = 'Loading...' }: LoadingProps) {
  return (
    <div className={`loading ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}
