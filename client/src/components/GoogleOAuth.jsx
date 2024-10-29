import { useGoogleOAuth } from "../hooks/useGoogleOAuth";

const GoogleOAuth = () => {
  const { signInWithGoogle } = useGoogleOAuth();

  return (
    <div className="google-OAuth">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default GoogleOAuth;
