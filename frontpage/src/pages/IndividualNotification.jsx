import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
function IndividualNotification() {
    const location = useLocation()
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const [user,setUser] = useState('')
    const [comment,setComment] = useState('')
    const data = location.state
    const id = data.id
    const [FetchedComments,setCommento]= useState([])

    
    
    
    useEffect(()=>{
        console.log("Pagee changedd")
        const setUserName = async()=>{
            const response =  await (await fetch('http://localhost:4000/api/user/get-profile',{ headers: { Authorization: `Bearer ${token}` }    })).json()
            setUser(response.userData.name)
           

        }

        const setFetchedComments = async()=>{
            const response = await fetch('http://localhost:4000/api/get-comments',{
                method:'GET',
                headers:{
                    id:id
                }
            })

            const RecievedData = await response.json()
            console.log(RecievedData)
            setCommento([RecievedData.comments])
        }
        setFetchedComments()
        setUserName()
        
    },[id,token])
  return (
    <div>
        {data.title? <h1 className='text-3xl'>{data.title} (Posted by: {data.user})</h1>:<h1 className='text-3xl'>Failed to load</h1>}
        {data.body? <p>{data.body}</p>:<p>Failed to load</p>}

        <input placeholder='Enter your comment' className=' border-b-2' onChange={(e)=>setComment(e.target.value)} onBlur={async()=>{

                    console.log(user+"okk")
                    await fetch('http://localhost:4000/api/comment', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id:id,
                            user:user,
                            comment:comment
                        })
                    })
        }}/>

        <h1>Comments</h1>
        
        {
            FetchedComments.map((e)=>(
                e.map((innerE)=>(
                    <div>
                        <h1>@{innerE.user}</h1>
                        <p>{innerE.comment}</p>
                    </div>
                
                ))
            ))
        }
    </div>
  )
}

export default IndividualNotification