import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../features/apiSlice";

const Register = () => {
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { email, password, repeatPassword } = userCredentials;

  const [registerUser, { data, isLoading, error }] = useRegisterUserMutation();

  const token = data?.token;

  const errorMessage = error?.data?.message;

  useEffect(() => {
    if (!token) return;
    localStorage.setItem("token", token);
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
    });
  };

  return (
    <div className="login-container">
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
            type="text"
            required
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <label>Repeat password</label>
          <input
            name="repeatPassword"
            type="text"
            required
            value={repeatPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <button type="submit">Sign up</button>
        </div>
        <div>
          {isLoading ? <p>...loading</p> : ""}
          <p className="error-message">{errorMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
