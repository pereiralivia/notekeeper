import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../features/apiSlice";

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const navigate = useNavigate();

  const [loginUser, { data = [], isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const errorMessage = error?.data?.message;

  const token = data.token;

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

    await loginUser(userCredentials);

    if(isSuccess){
      setUserCredentials("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-inner-container">
        <div className="form-title">
          <h2>Login</h2>
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
              type="password"
              required
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <button type="submit">Login</button>
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

export default Login;
