import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login';
            const payload = state === 'Sign Up' ? { name, email, password } : { email, password };

            const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);
            
            if (data.success) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                toast.success(`${state} successful!`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) navigate('/');
    }, [token, navigate]);

    return (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-white via-gray-100 to-white'>
            <Toaster />
            <div className='bg-white text-gray-800 flex flex-col gap-6 p-10 w-full max-w-md border border-gray-300 rounded-xl shadow-xl transform transition duration-500 hover:scale-105'>
                <h2 className='text-3xl font-extrabold text-center text-[#5f6FFF]'>{state === 'Sign Up' ? "Create Account" : "Login"}</h2>
                <p className='text-center text-gray-500'>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
                
                {state === 'Sign Up' && (
                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Full Name</label>
                        <input
                            className='border border-gray-300 rounded w-full p-2 mt-1 focus:ring focus:ring-[#5f6FFF] bg-gray-50 text-gray-800'
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}
                
                <div>
                    <label className='block text-sm font-medium text-gray-600'>Email</label>
                    <input
                        className='border border-gray-300 rounded w-full p-2 mt-1 focus:ring focus:ring-[#5f6FFF] bg-gray-50 text-gray-800'
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                
                <div>
                    <label className='block text-sm font-medium text-gray-600'>Password</label>
                    <input
                        className='border border-gray-300 rounded w-full p-2 mt-1 focus:ring focus:ring-[#5f6FFF] bg-gray-50 text-gray-800'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                
                <button 
                    type='submit' 
                    className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base font-semibold disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#4d5fff]'
                    disabled={loading}
                >
                    {loading ? "Processing..." : state === 'Sign Up' ? "Create Account" : "Login"}
                </button>
                
                <p className='text-center text-sm text-gray-500'>
                    {state === 'Sign Up' ? "Already have an account? " : "Create a new account? "}
                    <span 
                        onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} 
                        className='text-[#5f6FFF] underline cursor-pointer transition duration-300 ease-in-out hover:text-[#4d5fff] hover:scale-105'
                    >
                        {state === 'Sign Up' ? "Login here" : "Click here"}
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Login;
