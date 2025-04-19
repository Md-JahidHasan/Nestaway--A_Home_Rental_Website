
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdSettings } from 'react-icons/md';
import MenuItem from '../MenuItem';

const HostMenu = () => {
    return (
        <>
            {/* Add Room */}
              <MenuItem label='Add Room' icon={BsFillHouseAddFill} address={'add-room'}></MenuItem>


              {/* My Listing */}
            <MenuItem label={'My Listings'} icon={MdHomeWork} address={'my-listings'}></MenuItem>
            
            {/* Manage Boookings */}
            <MenuItem label={'Manage Bookings'} icon={MdSettings} address={'manage-bookings'}></MenuItem>
        </>
    );
};

export default HostMenu;