import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../state/hooks";
import { fetchUserData, LoginUser, SignUpUser } from "../services/api";
import { Form } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { logImage, registerImage } from "../assets/image";
import { capitalize } from "../utils/helpers";
import styled from "styled-components";
const LoginPage = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const { setUser, setUserId } = useUser();
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await LoginUser(usernameLogin, passwordLogin);
      if (!data) {
        setError("Incorrect Username or Password. Try again.");
        return;
      }
      setUserId(data.id);
      const userData = await fetchUserData(data.id);
      if (userData) {
        setUser({
          firstName: userData.name.firstname,
          lastName: userData.name.lastname,
          fullName: `${capitalize(userData.name.firstname)} ${capitalize(
            userData.name.lastname
          )}`,
          city: capitalize(userData.address.city),
          streetAddress: `${userData.address.number}, ${capitalize(
            userData.address.street
          )}`,
          phoneNumber: userData.phone,
          email: userData.email,
        });
      }
      navigate("/");
    } catch (error) {
      setError("Incorrect Username or Password. Try again.");
      console.error(error);
    }
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!isChecked) {
      setError("You must agree to the terms & policy.");
      return;
    }
    try {
      const data = await SignUpUser(
        usernameSignUp,
        emailSignUp,
        passwordSignUp
      );
      sessionStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError("Error signing up. Please try again.");
      console.error(error);
    }
  };
  const handleSignUp = () =>
    containerRef.current?.classList.add("sign-up-mode");
  const handleSignIn = () =>
    containerRef.current?.classList.remove("sign-up-mode");
  return (
    <StyledWrapper>
      <div ref={containerRef} className="main-container">
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleLogin} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={usernameLogin}
                  onChange={(e) => setUsernameLogin(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <FaLock className="icon" />
                <input
                  type={"password"}
                  placeholder="Password"
                  name="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <input
                type="submit"
                value="Login"
                className="btn btn-danger solid"
              />
            </form>
            <form onSubmit={handleSignUpSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={usernameSignUp}
                  onChange={(e) => setUsernameSignUp(e.target.value)}
                  pattern="^[a-zA-Z0-9_]{4,15}$"
                  title="Username must be 4-15 characters long and contain only letters, numbers, and underscores (_)."
                  required
                />
              </div>
              <div className="input-field">
                <FaEnvelope className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={emailSignUp}
                  onChange={(e) => setEmailSignUp(e.target.value)}
                  required
                />
              </div>
              <div className="input-field">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={passwordSignUp}
                  onChange={(e) => setPasswordSignUp(e.target.value)}
                  required
                  min="5"
                  max="10"
                />
              </div>
              <Form.Check
                type="checkbox"
                id="terms-checkbox"
                label={
                  <>
                    I agree to
                    <Link to="/terms" className="terms-link ms-1">
                      terms & Policy
                    </Link>
                    .
                  </>
                }
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <input type="submit" className="btn btn-danger" value="Sign up" />
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Sign up now and join our amazing platform.</p>
              <button
                onClick={handleSignUp}
                className="btn btn-danger transparent"
              >
                Sign up
              </button>
            </div>
            <img src={logImage} className="image" alt="Login Illustration" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>Sign in and continue your journey with us.</p>
              <button
                onClick={handleSignIn}
                className="btn btn-danger transparent"
              >
                Sign in
              </button>
            </div>
            <img
              src={registerImage}
              className="image"
              alt="Register Illustration"
            />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .custom-input-group {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    top: -55px;
    right: 60px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  #terms-checkbox {
    font-size: 16px;
    color: #5a5a5a;
  }
  #terms-checkbox input {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  .terms-link {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
  .terms-link:hover {
    text-decoration: underline;
  }
  .error {
    color: red;
    font-size: 14px;
    text-align: center;
  }
  .main-container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
  }
  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  form.sign-up-form {
    opacity: 0;
    z-index: 1;
  }
  form.sign-in-form {
    z-index: 2;
  }
  .title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
  }
  .input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
  }
  .input-field .icon {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 1.5rem;
    margin: auto;
  }
  .input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
  }
  .input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
  }
  .social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
  }
  .social-media {
    display: flex;
    justify-content: center;
  }
  .btn {
    width: 150px;
    background-color: #dc3545;
    border: none;
    outline: none;
    height: 49px;
    border-radius: 49px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
  }
  .btn:hover {
    background-color: rgb(145, 35, 46);
  }
  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .main-container:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, rgb(36, 45, 54) 0%, #dc3545 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }
  .image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
  }
  .panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
  }
  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }
  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
  }
  .panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }
  .panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
  }
  .panel p {
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }
  .btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
  }
  .right-panel .image,
  .right-panel .content {
    transform: translateX(800px);
  }
  .main-container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 52%;
  }
  .main-container.sign-up-mode .left-panel .image,
  .main-container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
  }
  .main-container.sign-up-mode .signin-signup {
    left: 25%;
  }
  .main-container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
  }
  .main-container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
  }
  .main-container.sign-up-mode .right-panel .image,
  .main-container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
  }
  .main-container.sign-up-mode .left-panel {
    pointer-events: none;
  }
  .main-container.sign-up-mode .right-panel {
    pointer-events: all;
  }
  @media (max-width: 870px) {
    .main-container {
      min-height: 800px;
      height: 100vh;
    }
    .signin-signup {
      width: 100%;
      top: 95%;
      transform: translate(-50%, -100%);
      transition: 1s 0.8s ease-in-out;
    }
    .signin-signup,
    .main-container.sign-up-mode .signin-signup {
      left: 50%;
    }
    .panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }
    .panel {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 2.5rem 8%;
      grid-column: 1 / 2;
    }
    .right-panel {
      grid-row: 3 / 4;
    }
    .left-panel {
      grid-row: 1 / 2;
    }
    .image {
      width: 200px;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.6s;
    }
    .panel .content {
      padding-right: 15%;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.8s;
    }
    .panel h3 {
      font-size: 1.2rem;
    }
    .panel p {
      font-size: 0.7rem;
      padding: 0.5rem 0;
    }
    .btn.transparent {
      width: 110px;
      height: 35px;
      font-size: 0.7rem;
    }
    .main-container:before {
      width: 1500px;
      height: 1500px;
      transform: translateX(-50%);
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }
    .main-container.sign-up-mode:before {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }
    .main-container.sign-up-mode .left-panel .image,
    .main-container.sign-up-mode .left-panel .content {
      transform: translateY(-300px);
    }
    .main-container.sign-up-mode .right-panel .image,
    .main-container.sign-up-mode .right-panel .content {
      transform: translateY(0px);
    }
    .right-panel .image,
    .right-panel .content {
      transform: translateY(300px);
    }
    .main-container.sign-up-mode .signin-signup {
      top: 5%;
      transform: translate(-50%, 0);
    }
  }
  @media (max-width: 570px) {
    form {
      padding: 0 1.5rem;
    }
    .image {
      display: none;
    }
    .panel .content {
      padding: 0.5rem 1rem;
    }
    .main-container {
      padding: 1.5rem;
    }
    .main-container:before {
      bottom: 72%;
      left: 50%;
    }
    .main-container.sign-up-mode:before {
      bottom: 28%;
      left: 50%;
    }
  }
`;
export default LoginPage;
