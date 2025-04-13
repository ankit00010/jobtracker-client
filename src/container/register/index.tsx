"use client";
import Input from "@/component/input/inputText";
import { AdminContext, AdminContextType } from "@/context/admin_context";
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const RegisterContainer = () => {
  const router = useRouter();
  const { user, handleUserChange, registerUser } = useContext(
    AdminContext
  ) as AdminContextType;

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (!user.name.trim()) {
      newErrors.name = "Username is required";
      isValid = false;
    }

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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      registerUser();
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.SERVER_URL}api/auth/google`;
  };
  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form>
          <div className="input-section">
            <Input
              labelName="Username"
              value={user.name}
              type="text"
              onChange={(value) => handleUserChange("name", value)}
              error={errors.name}
              arialLabel="Enter your username"
            />
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
              <button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button className="register-button" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <a onClick={() => router.push("/login")}>Log in</a>
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
    </div>
  );
};

export default RegisterContainer;
