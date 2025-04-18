import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { differenceInCalendarDays } from 'date-fns';
import BookingModal from '../modal/BookingModal';
import useAuth from '../../hooks/useAuth';


const RoomReservation = ({ room }) => {

  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  const [state, setState] = useState([
    {
      startDate: new Date(room?.from),
      endDate: new Date(room?.to),
      key: 'selection'
    }
  ]);

  const totalAmount = parseInt(
    differenceInCalendarDays(
      new Date(room?.to),
      new Date(room?.from)
    ) * room?.price
  )
console.log(user);


  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {room?.price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex justify-center">
        <DateRange
          showDateDisplay={false}
          rangeColors={["#f6536D"]}
          onChange={(item) =>
            setState([
              {
                startDate: new Date(room?.from),
                endDate: new Date(room.to),
                key: "selection",
              },
            ])
          }
          moveRangeOnFirstSelection={false}
          ranges={state}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button onClick={() => setIsOpen(true)} label={"Reserve"} />
      </div>
      <BookingModal
        closeModal={closeModal}
        isOpen={isOpen}
        bookingInfo={{
          ...room,
          guest: { name: user?.displayName },
          price: totalAmount,
        }}
      ></BookingModal>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${totalAmount}</div>
      </div>
    </div>
  );
}

RoomReservation.propTypes = {
  room: PropTypes.object,
}

export default RoomReservation
