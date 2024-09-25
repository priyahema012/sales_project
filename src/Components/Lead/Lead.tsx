import React, { useEffect, useState } from "react";
import { LeadList, leaddelete, leadid , leaddrop , dealerdropdown} from "../../axios/Services";
import { useSelector } from "react-redux";
import Leadmodel from "./Leadmodel";
import DeleteModule from "./Deletemodel";
import bookmark from "../../assets/Images/png.png";
import filledbookmark from "../../assets/Images/png1.png";
import styles from "./Lead.module.css";
import { Button, message } from "antd";
import { UserAddOutlined, DeleteOutlined, EditOutlined, FilterOutlined } from "@ant-design/icons";
import { useToken } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";
import { Pagination } from "antd";
import reassign from "../../assets/Images/treatment.png";
import active from "../../assets/Images/active-user.png";
import DropdownModule from "./DropdownModule";
import Dropdown1Module from "./Dropdown1Module";
import Editmodel from "./Editmodel";
 import { Outlet, useNavigate } from "react-router-dom";
import BookmarkModal from "./BookmarkModal";
import { Helmet } from "react-helmet";
import Editlead from "./Editlead";
import Filter from "./Filter";
import search from "antd/es/transfer/search";

interface LeadData {
  due_type: string;
  userid: string;
  leadId: string;
  leadName: string;
  mobile: string;
  address: string;
  leadStatusId: string;
  leadStatusName: string;
  created_by: string;
  created_by_id: string;
  activeStatus: number;
}

const Lead: React.FC = () => {
  const token = useToken();
  const selector = useSelector((state: storeDataProps) => state.auth);
  const [data, setData] = useState<LeadData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletemodel, setDeletemodel] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);
 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedLeadId, setSelectedLeadId] = useState<string >("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownsOpen, setDropdownsOpen] = useState<boolean>(false);
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState<boolean>(false);
const [selectedLeadForBookmark, setSelectedLeadForBookmark] = useState<string | null>(null);
const [currentStatus, setCurrentStatus] = useState<number>(0);

     const navigate = useNavigate();

     interface LeadState {
      search:string
     }

  useEffect(() => {
    if (token) {
      loadAdminData(currentPage);
    }
  }, [token, currentPage]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
     navigate("/Addlead");
  };


  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleBookmarkClick = (leadId: string, currentStatus: number) => {
    setSelectedLeadForBookmark(leadId);
    setCurrentStatus(currentStatus);
    setBookmarkModalOpen(true);
    handleModalClose();

  };
  

  const handleDeleteModal = (leadId: string) => {
    setSelectedLeadId(leadId);
    setDeletemodel(true);
  };

  const handleEditUser = (leadId: string) => {
   
    setSelectedLeadId(leadId);
    navigate("/Editlead", { state: { leadId } });
  };

  const handleDrop = (leadId:string) => {
    setSelectedLeadId(leadId);
    setDropdownOpen(true);
  };

  const handleDrop1 = (leadId: string) => {
    setSelectedLeadId(leadId);
    setDropdownsOpen(true);
    
  };

  const loadAdminData = (currentPage: number = 1, size: number = 10, search?: {userName?: string;  phoneNumber?: string; email?: string }) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("page", currentPage.toString());
    formData.append("size", size.toString());
    console.log("search" , search);
    


    if (search?.userName) {
      formData.append("name", search.userName);
    }
    // if (search?.email) {
    //   formData.append("email", search.email);
    // }
    if (search?.phoneNumber) {
      formData.append("phone", search.phoneNumber);
    }


    LeadList(currentPage, size, formData)
      .then((res) => {
        setData(res.data.data.items);
        setTotalItems(res.data.data.total_count);
        // message.success(res.data.msg);
      })
      .catch(() => console.log("Error loading data"));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadAdminData(page, pageSize);
  };

  const handleDelete = (leadId: string) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", leadId);

    leaddelete(formData)
      .then((res) => {
        setData((prevData) =>
          prevData.filter((item) => item.leadId !== leadId)
        );
        setDeletemodel(false);
         message.success(res.data.msg);
      })
      .catch(() => console.log("Error deleting lead"));
  };

  const toggleActiveStatus = (leadId: string, currentStatus: number) => {
    const newStatus = currentStatus === 0 ? 0 : 1;
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", leadId);
    formData.append("isActive", newStatus.toString());

    leadid(formData)
      .then((res) => {
        loadAdminData(currentPage, pageSize);
         message.success(res.data.msg);
      })
      .catch(() => console.log("Error updating status"));
  };
  console.log("LeadId",selectedLeadId);
  

  return (

<> <Helmet>
        <title>Lead</title>
        <meta name="description" content="This is the lead page " />
        <meta name="keywords" content="lead ,  React" />
      
      </Helmet>
    
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={handleAddUser}>
        ADD LEAD
        <UserAddOutlined />
      </button>
      <Button
            icon={<FilterOutlined />}
            // className={classes.filterButton}
            onClick={handleFilter}
          >
            Filter
          </Button>


          
        <div>
          {filter && <Filter functioncall={loadAdminData} />}
        </div>

      <table className={styles.table}>
        <thead>
          <tr>
         
            <th>Lead ID</th>
            <th>Lead Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Lead Status ID</th>
            <th>Lead Status Name</th>
          
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.leadId} className={item.activeStatus === 1 ? styles.activerow : styles.inactiverow}>
               
                <td>{item?.leadId}</td>
                <td>{item?.leadName}</td>
                <td>{item?.mobile}</td>
                <td>{item?.address}</td>
                <td>{item?.leadStatusId}</td>
                <td>{item?.leadStatusName}</td>
               
                <td>
                <img
       src={item.activeStatus === 1 ?  filledbookmark : bookmark}
        alt="status icon"
        onClick={() => handleBookmarkClick(item.leadId, item.activeStatus)}
  
       />

                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteModal(item.leadId)}
                  >
                    <DeleteOutlined />
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleEditUser(item.leadId)}
                  >
                    <EditOutlined />
                  </button>
                  <button onClick={()=>handleDrop(item.leadId)}> 
                    <img src={reassign} alt="Reassign" />
                  </button>
                  <br />
                  <button onClick={() => handleDrop1(item.leadId)}>
                
                    <img src={active} alt="Active" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <Leadmodel
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleAddClose={handleModalClose}
        />
      )}

      {deletemodel && selectedLeadId && (
        <DeleteModule
          deletemodel={deletemodel}
          userid={selectedLeadId}
          confirmDelete={() => handleDelete(selectedLeadId)}
          closeModal={() => setDeletemodel(false)}
        />
      )}

      {  selectedLeadId && (
        <Editlead
          leadId={selectedLeadId}
         
          loadAdminData={loadAdminData}
           closeModal={() => setSelectedLeadId("")} // Pass the closeModal function
        
          userid={selector.user_id} // Change to user_id
          selectedLeadId={selectedLeadId} // Added missing prop
        />
      )}

      {dropdownOpen && (
        <DropdownModule
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          userid={selectedLeadId || ''}
        />
      )}

{dropdownsOpen && (
  <Dropdown1Module
    isOpen={dropdownsOpen}
    onClose={() => setDropdownsOpen(false)}
   
    
    
    userid={selectedLeadId || ''} // Keep this as is
    selectedLeadId={selectedLeadId ?? ''} // Use nullish coalescing to default to an empty string
  />
)}


{bookmarkModalOpen && selectedLeadForBookmark && (
  <BookmarkModal
    isOpen={bookmarkModalOpen}
    onClose={() => setBookmarkModalOpen(false)}
    leadId={selectedLeadForBookmark}
    currentStatus={currentStatus}
    onConfirm={toggleActiveStatus} // Pass the function to update status
  />
)}

      <Pagination
        current={currentPage}
        pageSize={10}
        total={totalItems}
        onChange={handlePageChange}
      
      />
    </div>
    </>
  );
};


export default Lead;





















function state(leadId: string): import("react-router-dom").NavigateOptions | undefined {
  throw new Error("Function not implemented.");
}

function setFilter(arg0: boolean) {
  throw new Error("Function not implemented.");
}
// import React, { useEffect, useState } from "react";
// import { LeadList, leaddelete, leadid } from "../../axios/Services";
// import { useSelector } from "react-redux";
// import Leadmodel from "./Leadmodel";
// import DeleteModule from "./Deletemodel";
// import Editmodel from "./Editmodel";
// import bookmark from "../../assets/Images/png.png"; // Empty bookmark icon
// import filledbookmark from "../../assets/Images/png1.png"; // Filled bookmark icon
// import styles from "./Lead.module.css"; // Import the CSS module
// import { message } from "antd";
// import { AlipayCircleOutlined, HarmonyOSOutlined } from "@ant-design/icons";
// import DropdownModule from "./DropdownModule";
// import Dropdown1Module from "./Dropdown1Module";
// import { Outlet, useNavigate } from "react-router-dom";
// import { Pagination } from "antd";
// import reassign from "../../assets/Images/treatment.png";
// import active from "../../assets/Images/active-user.png";
// import {
//   FilterOutlined,
//   UserAddOutlined,
//   DeleteOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
// import { useToken } from "../../Utility/hooks";
// import { storeDataProps } from "../../Types/reducer";

// function Lead() {
//   const token = useToken();
//   const selector = useSelector((state: storeDataProps) => state.auth);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Lead modal
//   const [deletemodel, setDeletemodel] = useState(false); // Delete model
//   const [editModel, setEditModel] = useState(false); // Edit modal state
//   const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown modal state
//   const [dropdownsOpen, setDropdownsOpen] = useState(false); // Dropdown modal state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [pageSize, setPageSize] = useState(5); // Page size (number of items per page)
//   const [selectedLeadId, setSelectedLeadId] = useState(); // Lead ID
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       loadAdminData(currentPage);
//     }
//   }, [token, currentPage]);

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleAddUser = () => {
//     setIsModalOpen(true);
//     navigate("/Addlead");
//   };

//   const handleDeleteModal = (leadId) => {
//     setSelectedLeadId(leadId);
//     setDeletemodel(true);
//   };

//   const handleEditUser = (leadId) => {
//     setEditModel(true);
//     setSelectedLeadId(leadId);
//   };

//   const handleDrop = () => {
//     setDropdownOpen(true);
//   };

//   const handleDrop1 = (leadId) => {
//     setSelectedLeadId(leadId);
//     setDropdownsOpen(true);
//   };

//   const loadAdminData = (currentPage = 1, size = 10) => {
//     const formData = new FormData();
//     formData.append("token", token);
//     formData.append("page", currentPage);
//     formData.append("size", size);

//     LeadList(currentPage, size, formData)
//       .then((res) => {
//         setData(res.data.data.items);
//         setTotalItems(res.data.data.total_count);
//       })
//       .catch(() => console.log("Error loading data"));
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     loadAdminData(page, pageSize);
//   };

//   const handleDelete = (leadId) => {
//     const formData = new FormData();
//     formData.append("token", token);
//     formData.append("leadId", leadId);

//     leaddelete(formData)
//       .then(() => {
//         setData((prevData) =>
//           prevData.filter((item) => item.leadId !== leadId)
//         );
//         setDeletemodel(false);
//         message.success("Deleted Successfully");
//       })
//       .catch(() => console.log("Error deleting lead"));
//   };

//   const toggleActiveStatus = (leadId, currentStatus) => {
//     const newStatus = currentStatus === 1 ? 0 : 1;
//     const formData = new FormData();
//     formData.append("token", token);
//     formData.append("leadId", leadId);
//     formData.append("isActive", newStatus);

//     leadid(formData)
//       .then(() => {
//         loadAdminData(currentPage, pageSize);
//         message.success("Active State Updated");
//       })
//       .catch(() => console.log("Error updating status"));
//   };

//   return (
//     <div className={styles.container}>
//       <button className={styles.button} type="button" onClick={handleAddUser}>
//         ADD LEAD
//         <UserAddOutlined />
//       </button>

//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th>Due Type</th>
//             <th>Lead ID</th>
//             <th>Lead Name</th>
//             <th>Mobile</th>
//             <th>Address</th>
//             <th>Lead Status ID</th>
//             <th>Lead Status Name</th>
//             <th>Created By</th>
//             <th>Created By ID</th>
//             <th>Active Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((item , index) => (
             
//               <tr key={item.leadId}>
//                      {/* <td>{(currentPage - 1) * 2 + index + 1}</td>{" "} */}
//                 <td>{item.due_type}</td>
//                 <td>{item.leadId}</td>
//                 <td>{item.leadName}</td>
//                 <td>{item.mobile}</td>
//                 <td>{item.address}</td>
//                 <td>{item.leadStatusId}</td>
//                 <td>{item.leadStatusName}</td>
//                 <td>{item.created_by}</td>
//                 <td>{item.created_by_id}</td>
//                 <td>
//                   <img
//                     src={item.activeStatus === 1 ? filledbookmark : bookmark}
//                     alt="status icon"
//                     onClick={() =>
//                       toggleActiveStatus(item.leadId, item.activeStatus)
//                     }
//                   />
//                 </td>
//                 <td>
//                   <button
//                     className={styles.button}
//                     onClick={() => handleDeleteModal(item.leadId)}
//                   >
//                     <DeleteOutlined />
//                   </button>{" "}
//                   <br />
//                   <button
//                     className={styles.button}
//                     onClick={() => handleEditUser(item.leadId)}
//                   >
//                     <EditOutlined />
//                   </button>{" "}
//                   <br />
//                   <button onClick={handleDrop}>
//                     <img src={reassign} alt="Reassign" />
//                   </button>{" "}
//                   <br />
//                   <button onClick={() => handleDrop1(item.leadId)}>
//                     <img src={active} alt="Active" />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="11">No data available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <Leadmodel
//           isModalOpen={isModalOpen}
//           handleModalClose={handleModalClose}
//         />
//       )}

//       {deletemodel && (
//         <DeleteModule
//           deletemodel={deletemodel}
//           userid={selectedLeadId}
//           confirmDelete={() => handleDelete(selectedLeadId)}
//           closeModal={() => setDeletemodel(false)}
//         />
//       )}

//       {editModel && (
//         <Editmodel
//           editModel={editModel}
//           userid={selectedLeadId}
//           handleModalClose={() => setEditModel(false)}
//         />
//       )}

//       {dropdownOpen && (
//         <DropdownModule
//           isOpen={dropdownOpen}
//           onClose={() => setDropdownOpen(false)}
//           userid={selectedLeadId}
//         />
//       )}
//       {dropdownsOpen && (
//         <Dropdown1Module
//           isOpen={dropdownsOpen}
//           onClose={() => setDropdownsOpen(false)}
//           userid={selectedLeadId}
//           selectedLeadId={selectedLeadId} // Ensure `selectedLeadId` is passed if needed
//         />
//       )}

//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={totalItems}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// }

// export default Lead;
