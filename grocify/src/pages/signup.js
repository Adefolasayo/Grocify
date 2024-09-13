import React, { useState } from 'react';
import logo from '../images/logo.png';
import patternBG from '../images/patternBG.png';


const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // such as sending the data to an API
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#f5f5dc] p-8 flex flex-col">
        <img src={logo} alt="Grocify Logo" className="w-32 mb-8" />
        <div className="flex-grow flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-MAIL"
                className="w-full mb-4 p-2 border border-[#4a7c59] rounded"
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="PHONE NUMBER"
                className="w-full mb-4 p-2 border border-[#4a7c59] rounded"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="PASSWORD"
                className="w-full mb-4 p-2 border border-[#4a7c59] rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="CONFIRM PASSWORD"
                className="w-full mb-6 p-2 border border-[#4a7c59] rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#4a7c59] text-white py-2 rounded hover:bg-[#3d6b4a] transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <div 
        className="w-1/2 bg-[#4a7c59] bg-opacity-90 bg-blend-multiply"
        style={{
          backgroundImage: `url(${patternBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};

export default SignupPage;