import React, { useState } from "react";
import "./authPage.css";
import Image from "../../components/image/Image";
import apiRequest from "../../utils/apiRequest";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/authStore";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post(
        `/users/auth/${isRegister ? "register" : "login"}`,
        data,
      );
      setCurrentUser(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="authPage">
      <div className="authContainer">
        <Image path="/general/logo.png" />
        <h1>{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key="registerForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                placeholder="displayName"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              Do you have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              Don't have an account? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
