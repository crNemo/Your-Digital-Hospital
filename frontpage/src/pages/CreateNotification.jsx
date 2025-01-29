import React, { useState } from 'react';

const Login = () => {
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    let ParsedData = {
        "title": "",
        "body": "",
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>Fill out this form for notification</p>
                {state === 'Sign Up' && (
                    <div className='w-full'>
                        <p>Enter Title</p>
                        <input
                            className='border border-zinc-30 rounded w-full p-2 mt-1'
                            type="text"
                            onChange={(e) => ParsedData.title = e.target.value}


                            required

                        />
                    </div>
                )}
                <div className='w-full'>
                    <p>Body</p>
                    <textarea
                        className='border border-zinc-30 rounded w-full p-2 mt-1 h-[200px] overflow-y-auto'
                        onChange={(e) => ParsedData.body = e.target.value}
                        required
                    />
                </div>

                <button className='bg-primary text-white w-full py-2 rounded-mg text-base' onClick={async () => {
                    await fetch('http://localhost:4000/api/create', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(ParsedData)
                    })
                }}>
                    Post
                </button>

            </div>
        </form>
    );
};

export default Login;
