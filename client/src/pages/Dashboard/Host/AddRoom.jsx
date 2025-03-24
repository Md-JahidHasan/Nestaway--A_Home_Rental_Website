import React, { useState } from 'react';
import AddRoomForm from '../../../components/Forms/AddRoomForm';

const AddRoom = () => {

    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: null,
        key: 'selection'
    })

    const handleDates = range => {
        console.log(range);
        
        setDates(range.selection)
    }


    return (
        <div>
            <AddRoomForm dates={dates} handleDates={handleDates}></AddRoomForm>
        </div>
    );
};

export default AddRoom;