//AI Use Statement: AI was used to determine how to disable the button based on empty values.
import React, { useState } from 'react';

const Signup = ({ onBackToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the JWT token
                localStorage.setItem('token', data.token);
                onBackToLogin();
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Could not connect to the server');
        }
    };

    //Disable login while values are empty
    const disableButton = !name || !email || !password;

    return (
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-sm shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
                />

                <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
                />

                <input
                    type="password"
                    required
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    disabled={disableButton}
                >
                    Create Account
                </button>

                <div className="pt-2 text-center">
                    <p className="text-slate-400 text-sm">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onBackToLogin}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline underline-offset-4"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;