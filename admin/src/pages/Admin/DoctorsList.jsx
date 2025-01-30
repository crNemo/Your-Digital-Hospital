import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { use } from 'react'

const DoctorsList = () => {

  const{doctors, aToken, getAllDoctors} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])

  return (
    <div>

    </div>
  )
}

export default DoctorsList