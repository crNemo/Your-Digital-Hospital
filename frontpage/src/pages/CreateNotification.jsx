import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NotificationForm = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

    let ParsedData = {
        "title": title,
        "body": body,
        "user": ""
    };

    const onSubmitHandler = async (event) => {
        
        event.preventDefault();
        if (!token) {
            toast.error('Login to post comment');
            navigate('/login');
            window.scrollTo(0, 0);
            return;
        }
        toast.success('Notification Sent');
        const response = await (await fetch('http://localhost:4000/api/user/get-profile', { headers: { Authorization: `Bearer ${token}` } })).json();
        if (response.success) {
            console.log(response.userData.name);
            ParsedData.user = response.userData.name;
        }

        await fetch('http://localhost:4000/api/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ParsedData)
        });
        
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-white via-gray-100 to-white'>
            <Toaster />
            <div className='bg-white text-gray-800 flex flex-col gap-6 p-10 w-full max-w-md border border-gray-300 rounded-xl shadow-xl transform transition duration-500 hover:scale-105'>
                <h2 className='text-3xl font-extrabold text-center text-[#5f6FFF]'>Notification Form</h2>
                <p className='text-center text-gray-500'>Fill out this form to send a notification</p>
                
                <div>
                    <label className='block text-sm font-medium text-gray-600'>Title</label>
                    <input
                        className='border border-gray-300 rounded w-full p-2 mt-1 focus:ring focus:ring-[#5f6FFF] bg-gray-50 text-gray-800'
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>
                
                <div>
                    <label className='block text-sm font-medium text-gray-600'>Body</label>
                    <textarea
                        className='border border-gray-300 rounded w-full p-2 mt-1 focus:ring focus:ring-[#5f6FFF] bg-gray-50 text-gray-800 h-32'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        required
                    />
                </div>

                <button 
                    type='submit' 
                    className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base font-semibold disabled:opacity-50 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#4a5ad4]'
                >
                    Send Notification
                </button>
            </div>
        </form>
    );
};

export default NotificationForm;