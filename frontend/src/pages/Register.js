import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/apiSlice";

const Register = () => {
  const navigate = useNavigate();

  const [registerUser, { data, isLoading, isError, error }] =
    useRegisterUserMutation();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [passwordType, setPasswordType] = useState("password");

  const { email, password, repeatPassword } = userCredentials;
  const token = data?.token;
  const errorMessage = error?.data?.message;

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("token", data?.token);
    navigate("/");
  });

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerUser({
      email,
      password,
      repeatPassword,
    });
  };

  const handleClick = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  }

  return (
    <div className="register-container">
      <div className="register-inner-container">
        <div className="form-title">
          <h2>Sign up</h2>
          <p>Please enter your details</p>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-item">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label>Password</label>
            <input
              name="password"
              type={passwordType}
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label>Repeat password</label>
            <input
              name="repeatPassword"
              type={passwordType}
              required
              value={repeatPassword}
              onChange={handleChange}
            />
          </div>

          <div className="toggle-password-visibility">
            <input type="checkbox" onClick={handleClick}/>
            <p>Show password</p>
          </div>

          <div className="form-item">
            <button type="submit">Sign up</button>
          </div>
          <div className="form-bottom">
            {isLoading ? <p>...loading</p> : ""}
            {isError ? <p className="error-message">{errorMessage}</p> : ""}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
