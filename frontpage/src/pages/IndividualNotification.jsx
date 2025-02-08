import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function IndividualNotification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [fetchedComments, setFetchedComments] = useState([]);
    const data = location.state;
    const id = data.id;

    useEffect(() => {

        const setUserName = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/user/get-profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = await response.json();
                setUser(userData.userData.name);
            } catch (error) {
                console.log("Error fetching user data:");
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/get-comments', {
                    method: 'GET',
                    headers: { id: id }
                });
                const receivedData = await response.json();
                setFetchedComments(receivedData.comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
                toast.error('Failed to fetch comments');
            }
        };

        setUserName();
        fetchComments();

        const intervalId = setInterval(fetchComments, 1000); // Fetch comments every second

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [id, token]);

    const handleCommentSubmit = async () => {

        if (!comment.trim()) return;




        if (!token) {
            toast.error('Login to post comment');
            navigate('/login');
            window.scrollTo(0, 0);
            return;
        }

        try {

            const payload = { id, user, comment };
            // toast.success('Comment Posted')
            console.log('Sending payload:', payload);


            const response = await fetch('http://localhost:4000/api/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });





        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment'); // Display error toast
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg border border-gray-300">
                {data.title ? (
                    <h1 className="text-3xl font-bold text-blue-600">{data.title} <span className="text-sm text-gray-500">(Posted by: {data.user})</span></h1>
                ) : (
                    <h1 className="text-3xl font-bold text-red-500">Failed to load</h1>
                )}
                <p className="mt-3 text-gray-700">{data.body || 'Failed to load'}</p>
            </div>

            <div className="mt-6 w-full max-w-2xl flex gap-3">
                <input
                    type="text"
                    placeholder="Enter your comment"
                    className="flex-1 p-3 rounded-lg bg-gray-200 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="bg-blue-500 px-4 py-2 rounded-lg font-bold text-white hover:bg-blue-400 transition"
                    onClick={handleCommentSubmit}

                >
                    Post
                </button>
            </div>

            <h1 className="mt-6 text-2xl font-semibold text-blue-600">Comments</h1>
            <div className="w-full max-w-2xl mt-4 space-y-3">
                {fetchedComments.slice().reverse().map(comment => (
                    <div key={comment.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                        <h1 className="font-semibold text-blue-500">@{comment.user}</h1>
                        <p className="text-gray-700">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IndividualNotification;