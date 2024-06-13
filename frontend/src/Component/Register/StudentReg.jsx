import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Register.css'

const initialState = {
  name: "",
  age: "",
  roomNum: "",
  email: "",
  gender: "",
  g_name: "",
  g_email: "",
nationality: "",
};

const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {name, age, roomNum, email, gender, g_email, g_name, nationality} = formData;

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value})
  };

  const registerStudent = async (e) => {
e.preventDefault();

if(!name || !age || !roomNum || !email || !gender || !g_name || !g_email || !nationality) {
toast.error("All field required");
return
}

axios
.post("https://my-hostel-managent.vercel.app/register-student", formData)
.then((response) => {
console.log(response);
  setIsSubmitting(false);
 
  toast.success("Registration student Successful");
  navigate("/studentdash");

}).catch((error) => {
  setIsSubmitting(false)
  const message = error.response?.status === 400 ?
  "A student with same email already exist" : "Sever error unable to process the reg"
  setFormValidMessage(message)
  toast.error(message)
  })
}
  return (
    <div className="container form__ ">
    <div className="form-container">
      <p className="title"> Student Registration.</p>

      <form className="form" onSubmit={registerStudent}>
        <div className="--dir-column">
          <label htmlFor="name">Student&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Enter student's name"
            required
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            className="input"
            name="age"
            placeholder=" Enter age"
            required
            min={0}
            onChange={handleInputChange}
            value={formData.age}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="number">Room Number:</label>
          <input
            type="number"
            className="input"
            name="roomNum"
            placeholder="Enter room number"
            required
            onChange={handleInputChange}
            value={formData.roomNum}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="email">Contact Email:</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="example@yahoo.com"
            required
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="g_name">Guardian&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="g_name"
            placeholder="Enter guardian's name"
            required
            onChange={handleInputChange}
            value={formData.g_name}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="g_email">Guardian&apos;s Email:</label>
          <input
            type="email"
            className="input"
            name="g_email"
            placeholder="example@yahoo.com"
            required
            onChange={handleInputChange}
            value={formData.g_email}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="input"
            name="gender"
            placeholder="gender"
            required
            onChange={handleInputChange}
            value={formData.gender}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            className="input"
            name="nationality"
            placeholder="Nigeria"
            required
            onChange={handleInputChange}
            value={formData.nationality}
          />
        </div>

        <button className="--btn" disabled={isSubmitting}>{isSubmitting ? "Adding student..." : "Add student"} </button>
        </form>
        {formValidMessage && (
          <p className='erro-message'>{formValidMessage}</p>
        )}
       
    </div>
  </div>
  )
}

export default StudentReg
