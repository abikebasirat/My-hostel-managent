import react, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import "./StudentDashboard.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoMenu, IoCloseSharp  } from "react-icons/io5";
import {FaPenFancy} from "react-icons/fa"
import {confirmAlert} from "react-confirm-alert";
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";
import UpdateCheckIn from "../Modal/UpdateCheckIn"
import ChangeStudentRoom from "../Modal/ChangeStudentRoom"
import 'react-confirm-alert/src/react-confirm-alert.css';
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";


const StudentDashboard = () => {
  const [search, setSearch] = useState("");     
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [isMoadalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);


  useEffect(() => {
    const fetchStudents = async() => {
      try {
        const response = await axios.get("http://localhost:3500/student/");
        setData(response.data);
      } catch (error) {
        console.erroe("Error fetching data:", error)
      }
    }

    fetchStudents();
  },[])

  const handleModalOpen = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setSelectedModal("");
    setIsModalOpen(false);
    setSelectedStudent(null);
  }

  const handleModalSelect = (modalType) => {
    setSelectedModal(modalType)
  }

  const removeUser = async (_id) => {
    try {
      console.log(`Delete student by id: ${_id}`);
      const response = await axios.delete(
        `http://localhost:3500/student/delete-student/${_id}`
      )

      console.log(response.data)

      // filtering out the deleted student from the data
      setData((prevData) => prevData.filter((student) => student._id !== _id));

      // setting success message
      setMessage("Student deleted successdully");


      
    } catch (error) {
       //seting error message
      setMessage("Failed to delete student")
      console.error("Error deleting:", error)
    }
  }

  // to confirm that, are yu truely want to delete the data or not(double check) when it pulp up
  const confirmDelete = (_id) => {
    confirmAlert({
      title: "Delete this Student",
      message: "Are you sure to delete this Student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(_id) 
        },
        {
          label: "Cancel",
          onClick: () => alert("Deletion cancelled"),
        }
      ]
    })
  }

  const filteredData = data.filter(
    (item) => 
      item.nationality.toLowerCase().includes(search.toLowerCase()) || 
      item.email.toLowerCase().includes(search.toLowerCase())

  )

  

  return (

    <div>
      {sidebarToggle && (
        <div className="mobile-side-nav">
        <Sidebar />
        </div>
      )}

      <div className="--flex --overflow-hidden">
      <div className="desktop-side-nav">
      <Sidebar />
      </div>

      <div className="--flex-dir-column --overflow-y-auto --flex-1 --overflow-x-hidden ">
     
     <main className="--flex-justify-center w-full">
     <div className="right dash-main">
       <div className="--flex-justify-between">
       <p>Students</p>
       {sidebarToggle ? (

         <IoCloseSharp className="sidebar-toggle-iconB"
         onClick={() => setSidebarToggle(false)}
         />
       ):(


       <IoMenu className="sidebar-toggle-iconB"
       onClick={() => setSidebarToggle(true)}

       />
       )}
       </div>
       <p>Search students</p>
       <input
         placeholder="Search by name, email, or ID number"
         type="text"
         className="search"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
       />

       <div className="table">
         <table className="table_wrapper">
           <thead className="table__head">
             <tr className="table__row">
               <th className="same_class">Student Name</th>
               <th className="same_class">Email</th>
               <th className="same_class">ID Number</th>
               <th className="same_class">Gender</th>
               <th className="same_class">Age</th>
               <th className="same_class">Nationality</th>
               <th className="same_class">Actions</th>
             </tr>
           </thead>

           <tbody className="table__body">
             {filteredData.map((student, index) => (
               <tr key={index} className="table__row">
                 <td className="same_class">{student.name}</td>
                 <td className="same_class">{student.email}</td>
                 <td className="same_class">{student._id}</td>
                 <td className="same_class">{student.gender}</td>
                 <td className="same_class">{student.age}</td>
                 <td className="same_class">{student.nationality}</td>
                 <td className="same_class">
                   <RiDeleteBin6Line
                     size={25}
                     color="red"
                     onClick={() => confirmDelete(student._id)}
                   />
                   &nbsp;&nbsp;
                   <FaPenFancy
                     size={25}
                     color="blue"
                     onClick={() => handleModalOpen(student)}
                     />
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
       <button className="btn-secondary">
           
           <Link to='/student-reg'> Add a student</Link>
       </button>
     </div>
     </main>
     
   </div>
    </div>
          

          {
            isMoadalOpen &&(
              <div className="modal">
                <div className="modal-content">
                  <h2>Select an Option</h2>
                  <button
                  onClick={() => handleModalSelect("UpdateStudentProfile")}
                  className="one"
                  >
                    Update Student Profile
                  </button>
                  <button onClick={() => handleModalSelect("changeStudentRoom")}
                  className="two"
                  >
                    Change Student Room
                  </button>
                  <button 
                  onClick={() => handleModalSelect("UpdateCheckIn")}
                  className="three"
                  >

                    Update check-In

                  </button>

                  <button onClick={handleModalClose}>
                      Close
                  </button>
                </div>
                </div>
            )
          }

          {
            selectedModal === "UpdateStudentProfile" && (
              <UpdateStudentProfile 
              student={selectedStudent}
              onClose ={handleModalClose}

             />
            )
          }
          {
            selectedModal === "changeStudentRoom" && (
              <ChangeStudentRoom 
              student={selectedStudent}
              onClose ={handleModalClose}

             />
            )
          }
          {
            selectedModal === "UpdateCheckIn" && (
              <UpdateCheckIn 
              student={selectedStudent}
              onClose ={handleModalClose}

             />
            )
          }
    </div>
   

  ) 
};

export default StudentDashboard;