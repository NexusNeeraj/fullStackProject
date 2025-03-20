import React, { useState } from 'react';
import API from '../utils/api';

const Auth = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isSignup ? '/signup' : '/login';
            const { data } = await API.post(endpoint, formData);

            localStorage.setItem('token', data.token);
            alert(`Successfully ${isSignup ? 'signed up' : 'logged in'}!`);
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {isSignup ? 'Sign Up' : 'Login'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignup && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p
                    className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-blue-500"
                    onClick={() => setIsSignup(!isSignup)}
                >
                    {isSignup ? 'Already have an account? Login' : 'New here? Sign Up'}
                </p>
            </div>
        </div>
    );
};

export default Auth;
