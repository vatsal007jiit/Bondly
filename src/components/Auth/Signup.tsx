import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/Logo-B2.jpg";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HttpInterceptor from "../../lib/HttpInterceptor";
import { toast } from "react-toastify";
import catchErr from "../../lib/CatchErr";

const Signup = () => {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState("password");
  const [signupForm, setSignupForm] = useState({
    email: "",
    fullName: "",
    mobile: "",
    password: "",
    gender: "",
    dob: "",
  });

  const handleSignup = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  };

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await HttpInterceptor.post("/auth/signup", signupForm);
      toast.success(data.message);
      setSignupForm({
        fullName: "",
        email: "",
        password: "",
        mobile: "",
        gender: "",
        dob: "",
      });
      setTimeout(() =>{
            navigate("/login");
        }, 2500)
      
    } catch (error: unknown) {
      catchErr(error)
    }
  };

  const handlePassword = () => {
    if (showPass === "password") {
      setShowPass("text");
      return;
    }
    setShowPass("password");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 min-h-screen flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-md p-8 m-2 flex flex-col gap-3 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Create Account
        </h1>
        {/* Logo and Project Name */}
        <div className="mx-auto">
          <img
            src={logo}
            alt="CircleSync Logo"
            className="h-16 w-16 mb-2 rounded-full"
          />
        </div>
        {/* Registration Form */}
        <form className="flex flex-col gap-3" onSubmit={signUp}>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
              placeholder="you@example.com"
              onChange={handleSignup}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
              placeholder="Your full name"
              onChange={handleSignup}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              required
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
              placeholder="1234567890"
              onChange={handleSignup}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
              <input
                type={showPass}
                name="password"
                required
                className="w-full outline-none"
                placeholder="Create a password"
                onChange={handleSignup}
              />
              {showPass === "password" ? (
                <FaEye
                  size={20}
                  className="cursor-pointer"
                  onClick={handlePassword}
                />
              ) : (
                <FaEyeSlash
                  size={20}
                  className="cursor-pointer"
                  onClick={handlePassword}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              onChange={handleSignup}
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
            >
              <option value="">-Select Gender-</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              required
              className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
              onChange={handleSignup}
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-semibold py-3 rounded-lg mt-4 w-full"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button className="text-indigo-600 hover:underline">
            <Link to="/">Sign In</Link>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
