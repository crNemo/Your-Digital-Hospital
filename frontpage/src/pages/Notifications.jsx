import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Notifications() {
    const navigate = useNavigate()
    const arr = [1,2,3,4,5,6]
    const [data,setData] = useState([])


    useEffect(()=>{

      const FetchData = async()=>{
        try {
          const response = await fetch('http://localhost:4000/api/notification');
          const ResponseJson = await response.json();

          setData(prev=>{
            const FilteredData = ResponseJson.filter(e=>!prev.some(existingItem=>existingItem._id==e._id))

            return [...prev,...FilteredData]
          })
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
       

      FetchData()

      const Id = setInterval(FetchData, 2000);
      return()=>clearInterval(Id)

    },[]);
  return (
    <div  >
        <p className='uppercase font-bold underline mb-5'>Notifications</p>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
            {
             data.map((e)=>(
                
                <div  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                  
                  <p className='text-gray-900 text-lg font-medium underline'>{e.title}</p>
                  <p className='text-gray-600 text-sm'>{e.body}</p>
                    <p>Posted at:{new Date(e.date).toLocaleString()}</p>
                </div>
             ))
            }
          

        
        </div>
    </div>
  )
}

export default Notifications
