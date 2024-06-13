import React, { useState } from "react";
import "./StudentDashboard.css";
import axios from 'axios';

const AddRoomModal = ({ onAddRoom, onClose }) => {
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomCapacity: "",
    roomOccupancy: "",
   
  });

const [isSubmitting, setIsSubitting] = useState(false);
const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubitting(true);
    setError("");
    try {
    const response = await axios.post("http://localhost:3500/room/createNewRoom", newRoom);

    onAddRoom(response.data);
    onClose();
    } catch (error) {
      setError("Failed to add room", error);
      console.log(error)
    } finally {
      setIsSubitting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content --flex-start --dir-column">
        <h2 className="modal-title">Add New Room</h2>
        <label htmlFor="roomNumber" className="room-label">
          Room Number:
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={newRoom.roomNumber}
          onChange={handleChange}
          className="input-field"
        />
        <label htmlFor="roomCapacity" className="room-label">
          Capacity:
        </label>
        <input
          type="text"
          id="capacity"
          name="roomCapacity"
          value={newRoom.roomCapacity}
          onChange={handleChange}
          className="input-field"
        />
        
        <label htmlFor="roomLocation" className="room-label">
          Location:
        </label>
        <input
          type="text"
          id="location"
          name="roomLocation"
          value={newRoom.roomLocation}
          onChange={handleChange}
          className="input-field"
        />

        {error && <p>{error}</p>}
        <div className="button-group">
          <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;