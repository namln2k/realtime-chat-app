import googleIcon from '../../assets/icons/google.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import appleIcon from '../../assets/icons/apple.svg';

interface SocialLoginProps {
  disabled?: boolean;
}

export function SocialLogin({ disabled }: SocialLoginProps) {
  const handleSocialLogin = (provider: string) => {
    // TODO: Implement actual social login logic when needed
    console.log(`Social login with ${provider} initiated`);
  };

  return (
    <>
      <div className="text-center opacity-40">
        <span className="font-rubik text-base lg:text-[18px] font-normal text-chat-darkText tracking-wide leading-relaxed dark:text-gray-100">
          - or -
        </span>
      </div>

      <div className="flex justify-center gap-5 lg:gap-[30px]">
        <SocialButton
          icon={googleIcon}
          alt="Google"
          onClick={() => handleSocialLogin('google')}
          disabled={disabled}
        />
        <SocialButton
          icon={facebookIcon}
          alt="Facebook"
          onClick={() => handleSocialLogin('facebook')}
          disabled={disabled}
        />
        <SocialButton
          icon={appleIcon}
          alt="Apple"
          onClick={() => handleSocialLogin('apple')}
          disabled={disabled}
        />
      </div>
    </>
  );
}

interface SocialButtonProps {
  icon: string;
  alt: string;
  onClick: () => void;
  disabled?: boolean;
}

function SocialButton({ icon, alt, onClick, disabled }: SocialButtonProps) {
  return (
    <button
      className="border-none bg-primary-bg rounded-full cursor-pointer flex items-center justify-center transition-all hover:bg-accent hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src={icon}
        alt={alt}
        className="w-12 h-12 object-contain"
        draggable={false}
      />
    </button>
  );
}
