import Login from "../components/Login";
import Signup from "../components/Signup";
import GoogleOAuth from "../components/GoogleOAuth";

const UserAuth = () => {
  return (
    <>
      <Signup />
      <Login />
      <GoogleOAuth />
    </>
  );
};

export default UserAuth;
