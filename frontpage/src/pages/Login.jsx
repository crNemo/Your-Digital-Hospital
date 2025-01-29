import React, { useState } from 'react';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            className='border border-zinc-30 rounded w-full p-2 mt-1'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                )}
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        className='border border-zinc-30 rounded w-full p-2 mt-1'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
                        className='border border-zinc-30 rounded w-full p-2 mt-1'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button className='bg-primary text-white w-full py-2 rounded-mg text-base'>
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>
                {state === 'Sign Up' ? (
                    <p>
                        Already have an account? 
                        <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'> Login here</span>
                    </p>
                ) : (
                    <p>
                        Create a new account? 
                        <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'> Click here</span>
                    </p>
                )}
            </div>
        </form>
    );
};

export default Login;