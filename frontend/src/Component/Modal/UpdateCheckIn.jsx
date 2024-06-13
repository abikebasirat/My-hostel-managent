import React, { useEffect, useState } from 'react'
import axios from "axios"

const UpdateCheckIn = ({student, onClose}) => {
    const [action, setAction] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [currentRoomNumber, setCurrentRoomNumber] = useState("");


    useEffect(() => {
        const fetchRoomDetails = async() => {
            if(student.room){
                try{
                    const response = await axios.get(`https://my-hostel-managent.vercel.app/room/get-single-room/${student.room}`);
                    setCurrentRoomNumber(response.data.roomNumber)
                } catch (error) {
                    console.error("Error feching room details", error);
                }
            }
        };
        fetchRoomDetails();
    }, [student.room]);

    const handleActionChange = (e) => {
        setAction(e.target.value)
    };

    const handleRoomChange = (e) => {
        setRoomNumber(e.target.value)
    };

    const handleSubmit = async () => {
        e.preventDefault();
    
        try {
          const response = await axios.post(
            `https://my-hostel-managent.vercel.app/student/check-in-status`,
            {
              action,
              roomNumber,
              studentId: student._id,
            }
          );
          onClose();
        } catch (error) {
          console.error("error updating status");
        }
      };



  return (
    <div className='modal'>
        <div className='modal-content'>

            <h2>Update Check-In Status</h2>

            <p>Current status: {student.checkedIn ? "Checked In" : "Checked Out"}{" "}
            </p>

            <p>
                Current Room: {currentRoomNumber || "Not Assigned"} 
            </p>

            <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              value={roomNumber}
              placeholder="Enter room number"
              onChange={handleRoomChange} />
          </div>

          <div>
            <label htmlFor=''>Action</label>

            <select value={action} onChange={handleActionChange}>
                <option value="&nbsp;">Select an action</option>
                <option value="checkIn" disabled={student.checkedIn}>Check In</option>
                <option value="checkOut" disabled={!student.checkedIn}>Check Out</option>
            </select>
          </div>

          <button>Update Status</button>
          <button onClick={onClose}>Close</button>
        </form>
        </div>
    </div>
  )
}

export default UpdateCheckIn