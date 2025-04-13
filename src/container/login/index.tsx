"use client";
import Input from "@/component/input/inputText";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


const LoginContainer = () => {
  const router = useRouter();
  const { user, handleUserChange, loginUser, isUserLogin } = useContext(
    AdminContext
  ) as AdminContextType;

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await loginUser();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.SERVER_URL}api/auth/google`;
  };
  useEffect(() => {
    const checkLogin = async () => {
      const result = await isUserLogin();
      console.log("Login check result:", result);
      setIsLogin(result); // true means logged in
    };

    checkLogin();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="login-container">
      {isLogin ? (
        // Show login form if NOT logged in

        <div className="login-box">
          <h2>Job Tracker</h2>
          <p>
            {`You are already logged in. Please logout before logging in as a
          different user.`}
          </p>
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
          <button className="cancel-button" onClick={() => router.push("/")}>
            Cancel
          </button>
        </div>
      ) : (
        // Already logged in view
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="input-section">
              <Input
                labelName="Email"
                value={user.email}
                type="email"
                onChange={(value) => handleUserChange("email", value)}
                error={errors.email}
                arialLabel="Enter your email"
              />
              <div className="password-container">
                <Input
                  labelName="Password"
                  value={user.password}
                  type={showPassword ? "text" : "password"}
                  onChange={(value) => handleUserChange("password", value)}
                  error={errors.password}
                  arialLabel="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button className="login-button" onClick={handleSubmit}>
              Log In
            </button>
          </form>
          <p className="signup-link">
            {`Don't have an account?`}{" "}
            <a onClick={() => router.push("/register")}>Sign up</a>
          </p>
          <div className="google-signin-container">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <span className="icon">
                <FcGoogle size={30}/>
              </span>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginContainer;
