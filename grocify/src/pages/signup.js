import React from 'react';
import logo from '../images/logo.png';
import patternBG from '../images/patternBG.png';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundImage: `url(${patternBG})`, backgroundSize: 'cover'}}>
      <div className="bg-white p-8 rounded-lg shadow-md w-[350px]">
        <img src={logo} alt="Grocify Logo" className="w-32 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up for Grocify</h2>
        <form>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
            <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
            <input type="password" placeholder="Confirm Password" className="w-full p-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Sign Up</button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
