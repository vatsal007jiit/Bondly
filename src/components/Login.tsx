import { useState } from "react";
import logo from "../Images/Logo.png";
import { Link } from "react-router-dom";
import { FaEye,FaEyeSlash } from "react-icons/fa";

export default function Signin() {

  const [showPass, setShowPass] = useState('password')
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    setLoading(true);
    // TODO: plug in real auth
    setTimeout(() => {
      alert("Signed in!");
      setLoading(false);
    }, 1200);
  };

  const handlePassword= (e)=>{
    
    if(showPass==='password')
    {
      setShowPass('text')
      return;
    }
  setShowPass('password')
  }

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* LEFT PANEL */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-8">
        <img
          src={logo}
          alt="CircleSync logo"
          className="w-48 mb-6 select-none drop-shadow-xl rounded-full"
        />

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center drop-shadow-lg max-w-xl">
            Building Bonds, <br />
            Bridging Relations.
        </h1>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Sign in to Bondly
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <div className="flex items-center p-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                      <input
                        type={showPass} name="password"
                        required
                        className="w-full outline-none"
                        placeholder="••••••••"
                      />
                      {showPass==='password'? <FaEye size={20} className="cursor-pointer" onClick={handlePassword} /> :
                      <FaEyeSlash size={20} className="cursor-pointer" onClick={handlePassword} />}
                        
                      </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl px-4 py-3 font-medium shadow-md active:scale-[.98] transition hover:shadow-lg bg-indigo-600 text-white"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <button className="text-indigo-600 hover:underline">
            <Link to="/signup" >Create one
            </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
