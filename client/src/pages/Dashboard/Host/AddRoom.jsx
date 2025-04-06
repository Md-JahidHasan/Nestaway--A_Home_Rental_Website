import { useState } from 'react';
import AddRoomForm from '../../../components/Forms/AddRoomForm';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';

const AddRoom = () => {

    const { user } = useAuth();
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })

    const handleDates = range => {
        console.log(range);
        
        setDates(range.selection)
    }


    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;

        const location = form.location.value;
        const category = form.category.value;
        const from = dates.startDate;
        const to = dates.endDate;
        const title = form.title.value;
        const image = form.iamge.file[0];
        const price = form.price.value;
        const guests = form.total_guest.value;
        const badrooms = form.bedrooms.value;
        const bathroooms = form.bathrooms.value;
        const description = form.description.value;
        const host = {
            name: user?.displayName,
            photo: user?.photoURL,
            email: user?.email
        }

        try {
            const image_url = await imageUpload(image)


            
        } catch (error) {
            console.log(error);
            
        }

    }

    return (
        <div>
            <AddRoomForm dates={dates} handleDates={handleDates} handleSubmit={handleSubmit} ></AddRoomForm>
        </div>
    );
};

export default AddRoom;