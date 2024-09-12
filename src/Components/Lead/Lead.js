
import React, { useEffect, useState } from "react";
import { LeadList, leaddelete, leadid } from "../../axios/Services";
import { useSelector } from "react-redux";
import Leadmodel from "./Leadmodel";
import DeleteModule from "./Deletemodel";
import Editmodel from "./Editmodel";
import bookmark from '../../assets/Images/png.png'; // Empty bookmark icon
import filledbookmark from '../../assets/Images/png1.png'; // Filled bookmark icon
import styles from './Lead.module.css'; // Import the CSS module
import { message } from "antd"; 
import { AlipayCircleOutlined , HarmonyOSOutlined  } from "@ant-design/icons";
import DropdownModule from "./DropdownModule";
import Dropdown1Module from "./Dropdown1Module";


function Lead() {
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Lead modal
  const [deletemodel, setDeletemodel] = useState(false); // Delete model
  const [editModel, setEditModel] = useState(false); // Edit modal state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown modal state
  const [dropdownsOpen, setDropdownsOpen] = useState(false); // Dropdown modal state

  const [selectedLeadId, setSelectedLeadId] = useState(null); // Lead ID
  const [selectedLeadData, setSelectedLeadData] = useState(null); // Store the selected lead's data

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleDeleteModal = (leadId) => {
    setSelectedLeadId(leadId);
    setDeletemodel(true);
  };

  const handleEditUser = (leadId) => {
    setEditModel(true);
    setSelectedLeadId(leadId);
  };

  const handleId = (leadId) => {
    const formData = new FormData();
    formData.append("token", selector.token);
    formData.append("leadId", leadId);

    leadid(formData)
      .then((res) => {
        if (res.data.success) {
          console.log("Data updated successfully");
          message.success("OTP verified successfully! Please create a new password.");
          loadAdminData();
        } else {
          console.log("Failed to update data:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  };

  const loadAdminData = () => {
    const formData = new FormData();
    formData.append("token", selector.token);

    LeadList(formData)
      .then((res) => setData(res.data.data.items))
      .catch(() => console.log("Error loading data"));
  };

  const handleDelete = (leadId) => {
    const formData = new FormData();
    formData.append("token", selector.token);
    formData.append("leadId", leadId);

    leaddelete(formData)
      .then(() => {
        setData((prevData) =>
          prevData.filter((item) => item.leadId !== leadId)
        );
        setDeletemodel(false); // Close delete modal after deletion
        message.success("Deleted Successfully");
      })
      .catch(() => console.log("Error deleting lead"));
  };

  const handleDropdown = (leadId) => {
    setSelectedLeadId(leadId);
    setDropdownOpen(true);
  };

  const handleDropdowns = (value) => {
    setDropdownsOpen(true);
    setSelectedLeadId(value);
  }

  const toggleActiveStatus = (leadId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const formData = new FormData();
    formData.append("token", selector.token);
    formData.append("leadId", leadId);
    formData.append("isActive", newStatus);

    leadid(formData)
      .then(() => {
        loadAdminData();
        message.success("Active State");
      })
      .catch(() => console.log("Error updating status"));
   
  };

  useEffect(() => {
    if (selector.token) {
      loadAdminData();
    }
  }, [selector.token]);

  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={handleAddUser}>
        Add User
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Due Type</th>
            <th>Lead ID</th>
            <th>Lead Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Lead Status ID</th>
            <th>Lead Status Name</th>
            <th>Created By</th>
            <th>Created By ID</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.due_type}</td>
                <td>{item.leadId}</td>
                <td>{item.leadName}</td>
                <td>{item.mobile}</td>
                <td>{item.address}</td>
                <td>{item.leadStatusId}</td>
                <td>{item.leadStatusName}</td>
                <td>{item.created_by}</td>
                <td>{item.created_by_id}</td>
                <td>
                  <img
                    src={item.activeStatus === 1 ? filledbookmark : bookmark}
                    alt="status icon"
                    onClick={() => toggleActiveStatus(item.leadId, item.activeStatus)}
                  />
                </td>
                <td>
                  <button className={styles.button} onClick={() => handleDeleteModal(item.leadId)}>
                    Delete
                  </button> <br></br>
                  <button className={styles.button} onClick={() => handleEditUser(item.leadId)}>
                    Edit
                  </button> <br></br>
                  <button onClick={() => handleDropdown(item.leadId)}>
                    <AlipayCircleOutlined />
                  </button> <br></br>
                  <button onClick={() => handleDropdowns(item.leadId)}>
                  <HarmonyOSOutlined />
                  </button>


                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <Leadmodel
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
        />
      )}

      {deletemodel && (
        <DeleteModule
          deletemodel={deletemodel}
          userid={selectedLeadId} // Pass selected leadId for deletion
          confirmDelete={() => handleDelete(selectedLeadId)} // Pass delete handler
          closeModal={() => setDeletemodel(false)} // Pass close modal function
        />
      )}

      {editModel && (
        <Editmodel
          editModel={editModel}
          userid={selectedLeadId}
          handleModalClose={() => setEditModel(false)}
        />
      )}

      {dropdownOpen && (
        <DropdownModule
          isOpen={dropdownOpen}
          userid={selectedLeadId}
          onConfirm={() => {
            setDropdownOpen(false);
            // Perform any additional actions if needed
          }}
          onClose={() => setDropdownOpen(false)}
        />
      )}
      
      {dropdownsOpen && (
        <Dropdown1Module
          isOpen={dropdownsOpen}
          userid={selectedLeadId}
          onConfirm={() => {
            setDropdownsOpen(false);
            // Perform any additional actions if needed
          }}
          onClose={() => setDropdownsOpen(false)}
          selectedLeadId={selectedLeadId}/>
      )}


    </div>
  );
}

export default Lead;





















