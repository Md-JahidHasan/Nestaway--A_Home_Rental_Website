
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork } from 'react-icons/md';
import MenuItem from '../MenuItem';

const HostMenu = () => {
    return (
        <>
            {/* Add Room */}
              <MenuItem label='Add Room' icon={BsFillHouseAddFill} address={'add-room'}></MenuItem>


              {/* My Listing */}
              <MenuItem label={'My Listings'} icon={MdHomeWork} address={'my-listings'}></MenuItem>
        </>
    );
};

export default HostMenu;