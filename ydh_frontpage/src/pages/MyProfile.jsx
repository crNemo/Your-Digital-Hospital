import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: "Ram Kumar Sharma",
    image: assets.profile_pic,
    email: 'ram.kumar09@gmail.com',
    phone: '9841234567',
    address: {
      lin1: "Maitighar",
      lin2: "Kathmandu,Nepal"
    },
    gender: 'Male',
    dob: '1998/09/09',
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      <img className='w-36 rounded' src={userData.image} alt="" />

      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChnage={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChnage={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address</p>
          {
            isEdit
              ? <p>
                <input className='bg-gray-50' onChnage={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, lin1: e.target.value } }))} value={userData.address.lin1} type="text" />
                <br />
                <input className='bg-gray-50' onChnage={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, lin2: e.target.value } }))} value={userData.address.lin2} type="text" />
              </p>
              : <p className='text-gray-500'>
                {userData.address.lin1}
                <br />
                {userData.address.lin2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Date of Birth:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hoverKtext-white transition-all' onClick={() => setIsEdit(false)}>Save</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hoverKtext-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile