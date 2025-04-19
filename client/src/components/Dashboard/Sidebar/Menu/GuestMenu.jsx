import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from '../MenuItem'
import { useState } from 'react'
import HostModal from '../../../modal/HostRequestModal'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'


const GuestMenu = () => {

  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)


  const closeModal = () => {
    setIsModalOpen(false)
  }

  const modalHandler = async() => {
    console.log('---I want to be a host');
    try {
      const currentUserData = {
        email: user?.email,
        role: 'guest',
        status: 'requested'
      }
      const { data } = await axiosSecure.put('/user', currentUserData)
      if (data.modifiedCount > 0) {
        toast.success("Success! Wait for admin confirmation...");
      } else {
        toast.success("Please wait for admin approval");
      }

      
    } catch (error) {
      console.log(error);
      
    } finally {
      closeModal()
    }
    
  }

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label='My Bookings'
        address='my-bookings'
      />

      

      <div onClick={()=>setIsModalOpen(true)} className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'>
        <GrUserAdmin className='w-5 h-5' />

        <span className='mx-4 font-medium'>Become A Host</span>
      </div>
      <HostModal isOpen={isModalOpen} closeModal={closeModal} handleModal={modalHandler}></HostModal>
    </>
  )
}

export default GuestMenu