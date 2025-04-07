import { useState } from 'react';
import AddRoomForm from '../../../components/Forms/AddRoomForm';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';


const AddRoom = () => {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const [imagePreview, setImagePreview] = useState();
    const [imageText, setImagetext] = useState('Upload Image');

    const handleImagePreview = image => {
        setImagePreview(URL.createObjectURL(image))
        setImagetext(image.name)
        console.log(image);
        
    }

    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosSecure.post('/room', roomData);
            return data;
        },
        onSuccess: () => {
            console.log('Room Added Successsfully!');
            setLoading(false)
            toast.success('Room Added Successsfully!', {
                position: "top-center",
                autoClose: 100,
                draggable: true,
                progress: undefined,
                theme: "colored",

                })
            navigate('/dashboard/my-listings')
        }
   })

    const handleDates = range => {
        // console.log(range);
        
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
        const image = form.image.files[0];
        const price = form.price.value;
        const guests = form.total_guest.value;
        const bedrooms = form.bedrooms.value;
        const bathroooms = form.bathrooms.value;
        const description = form.description.value;
        const host = {
            name: user?.displayName,
            photo: user?.photoURL,
            email: user?.email
        }

        try {
            setLoading(true)
            const image_url = await imageUpload(image)
            const roomData = {
                location,
                category,
                from,
                to,
                title,
                image: image_url,
                price,
                guests,
                bedrooms,
                bathroooms,
                description,
                host
            }
            console.log( roomData);
            
            // post data to server
            await mutateAsync(roomData)


            
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    return (
        <>
            <Helmet>
                <title> Add Room | Dashboard</title>
            </Helmet>
            <AddRoomForm
                loading={loading}
                dates = {dates}
                handleDates = {handleDates}
                handleSubmit = {handleSubmit}
                imagePreview = {imagePreview}
                imageText = {imageText}
                handleImagePreview = {handleImagePreview}
            ></AddRoomForm>
        </>
    );
};

export default AddRoom;