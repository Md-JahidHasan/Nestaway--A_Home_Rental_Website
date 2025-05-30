import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import RoomDataRow from '../../../components/TableRows/RoomDataRow';
import Heading from '../../../components/Shared/Heading';
import { useState } from 'react';
import { axiosCommon } from '../../../hooks/useAxiosCommon';
import { toast } from 'react-toast';


const MyListings = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    // let [isOpen, setIsOpen] = useState(false)

    // room data fetch
    const { data:rooms, isLoading, refetch } = useQuery({
        queryKey: ['my-listings', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-listings/${user?.email}`)
            return data;
        }
    })

  
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/room/${id}`);
      return data
    }
  })

  // handle delete room
  const handleDelete =  async (id) => {
    console.log(id);
    try {
      await mutateAsync(id)
      toast.success(`Deleted successfully!`, {
        position: "top-center",
        autoClose: 10,
        
      })
      refetch()
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <>
      <Helmet>
        <title>My Listings</title>
      </Helmet>

      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Location
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                     {/* Room row data */}
                                  
                    
                    
                                  {
                                     
                                    rooms && rooms.length > 0 ? rooms.map(room => <RoomDataRow
                                   key={room?._id}
                                    room={room}
                                        refetch={refetch}
                                        handleDelete={handleDelete}
                                ></RoomDataRow>) : (
        <div className='flex items-center justify-center min-h-[calc(100vh-300px)]'>
          <Heading
            center={true}
            title='No Rooms Available In This Category!'
            subtitle='Please Select Other Categories.'
          />
        </div>
      )
                                      
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyListings