import Image from "../../components/image/image";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiRequest from "../../utils/apiRequest";
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
        data
      );

      setCurrentUser(res.data);

      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-8 p-8 rounded-4xl shadow-[0_0_10px_0_rgba(0,0,0,0.1)] w-full max-w-112.5 max-sm:p-6 max-sm:gap-6">
        <Image path="/general/plogo.png" w={36} h={36} alt="logo" />
        <h1 className="font-normal text-[28px] max-sm:text-2xl">{isRegister ? "Create an Account" : "Login to your account"}</h1>
        {isRegister ? (
          <form key="register" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <input
                type="username"
                placeholder="Username"
                required
                name="username"
                id="username"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="displayName" className="text-sm font-medium">Name</label>
              <input
                type="displayName"
                placeholder="Name"
                required
                name="displayName"
                id="displayName"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <button type="submit" className="bg-red-600 p-4 border-none rounded-full text-white cursor-pointer font-bold text-base transition-colors hover:bg-red-700 max-sm:p-3.5">Register</button>
            <p onClick={() => setIsRegister(false)} className="text-sm text-center cursor-pointer transition-colors hover:text-red-600">
              Do you have an account? <b>Login</b>
            </p>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
                className="p-4 border-2 border-gray-200 rounded-2xl text-base transition-colors focus:outline-none focus:border-red-600 max-sm:p-3.5"
              />
            </div>
            <button type="submit" className="bg-red-600 p-4 border-none rounded-full text-white cursor-pointer font-bold text-base transition-colors hover:bg-red-700 max-sm:p-3.5">Login</button>
            <p onClick={() => setIsRegister(true)} className="text-sm text-center cursor-pointer transition-colors hover:text-red-600">
              Don&apos;t have an account? <b>Register</b>
            </p>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
