import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    navigate('/admin-dashboard');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    navigate('/doctor-dashboard');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-white p-6">
            <Toaster position="top-center" />
            <form onSubmit={onSubmitHandler} className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-gray-700 border border-gray-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative z-10 flex flex-col gap-5">
                    <h2 className="text-3xl font-bold text-center text-gray-900">{state} Login</h2>
                    <div>
                        <label className="text-sm">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full p-3 mt-1 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-3 mt-1 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <button className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all">Login</button>
                    <p className="text-center text-sm">
                        {state === 'Admin' ? (
                            <>Doctor Login? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setState('Doctor')}>Click here</span></>
                        ) : (
                            <>Admin Login? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setState('Admin')}>Click here</span></>
                        )}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
