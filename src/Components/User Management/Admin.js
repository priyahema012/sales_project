
import React, { useEffect, useState } from "react";
import { Adminsss } from "../../axios/Services";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Admin.module.css";
import AdminModule from "../Model/AddModule";
import { Button, Popover } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import Filter from "./Filter";
import { handledeleteds } from "../../redux/reducers/AuthReducer";
import DeleteModule from "../Model/DeleteModule";
import { message, Typography, Input } from "antd"; 

const text = <span>Filter</span>;
const content = (
  <div>
    <Filter />
  </div>
);

const Admin = () => {
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userid, setUserid] = useState("");
  const [deletemodel, setDeletemodel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.auth.filter);
  console.log(search, "searchwa");

  const del = useSelector((state) => state.auth.delete);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleAdmin = (currentPage = 1, size = 5) => {
 
    const formData = new FormData();
    formData.append("token", selector.token);
    formData.append("type", "2");

    console.log("search", search);

    if (search.userName) {
      formData.append("username", search.userName);
    }
    if (search.phoneNumber) {
      formData.append("phoneNumber", search.phoneNumber);
    }
   
    if (search.email) {
      formData.append("email", search.email);
    }

    Adminsss(currentPage, size, formData)
      .then((response) => {
        const users = response.data.data.items;
        setTotalItems(response.data.data.total_count);
        setData(users);
        setFilteredData(users);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selector.token) {
      handleAdmin(currentPage);
    }
  }, [selector.token, search, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = (values) => {
    setUserid(values);
    dispatch(handledeleteds(true));
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.header}>
          <Popover title={text} content={content}>
            <Button icon={<FilterOutlined />} className={classes.filterButton}>
              Filter
            </Button>
          </Popover>

          <Button
            type="button"
            onClick={() => setShowModal(true)}
            className={classes.addUserButton}
          >
            Add User
          </Button>
        </div>

        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>No.</th> {/* Column for the row number */}
                <th>User ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className={classes.tableRow}>
                    <td>{(currentPage - 1) * 5 + index + 1}</td> {/* Row number calculation */}
                    <td>{item.userName}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => handleDeleteUser(item.userId)}
                        className={classes.deleteButton}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={classes.noData}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            current={currentPage}
            pageSize={5}
            total={totalItems}
            onChange={handlePageChange}
            className={classes.pagination}
          />

          {showModal && (
            <AdminModule
              showModal={showModal}
              handleAddClose={() => setShowModal(false)}
              onAddUser={(newUser) => setData((prev) => [...prev, newUser])}
            />
          )}

          {del && (
            <DeleteModule
              deletemodel={del}
              userid={userid}
              listapicall={handleAdmin}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;































// import React, { useEffect, useState } from "react";
// import { Adminsss } from "../../axios/Services";
// import { useSelector, useDispatch } from "react-redux";
// import classes from "./Admin.module.css";
// import AdminModule from "../Model/AdminModule";
// import { Button, Popover } from "antd";
// import { FilterOutlined } from "@ant-design/icons";
// import { Pagination } from "antd";
// import Filter from "./Filter";
// import { handledeleteds } from "../../redux/reducers/AuthReducer";
// import DeleteModule from "../Model/DeleteModule";

// const text = <span>Filter</span>;
// const content = (
//   <div>
//     <Filter />
//   </div>
// );

// const Admin = () => {
//   const selector = useSelector((state) => state.auth);
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [userid, setUserid] = useState("");
//   const [deletemodel, setDeletemodel] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const dispatch = useDispatch();
//   const search = useSelector((state) => state.auth.filter);
//   console.log(search, "searchwa");

//   const del = useSelector((state) => state.auth.delete);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);

//   const handleAdmin = (currentPage = 1, size = 5) => {
//     // Set default page to 1
//     const formData = new FormData();
//     formData.append("token", selector.token);
//     formData.append("type", "2");

//     console.log("search", search);

//     if (search.userName) {
//       formData.append("username", search.userName);
//     }
//     if (search.phoneNumber) {
//       formData.append("phoneNumber", search.phoneNumber);
//     }
//     if (search.dealer_id) {
//       formData.append("dealerId", search.dealer_id);
//     }
//     if (search.email) {
//       formData.append("email", search.email);
//     }

  

//       Adminsss(currentPage, size, formData)
//       .then((response) => {
//         const users = response.data.data.items;
//         setTotalItems(response.data.data.total_count);
//         setData(users);
//         setFilteredData(users);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
  


//     }
   
//   useEffect(() => {
//     if (selector.token) {
//       handleAdmin(currentPage);
//     }
//   }, [selector.token, search, currentPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDeleteUser = (values) => {
//     setUserid(values);
//     dispatch(handledeleteds(true));
//   };

//   return (
//     <>
//      <div className={classes.container}>
//   <div className={classes.header}>
//     <Popover title={text} content={content}>
//       <Button icon={<FilterOutlined />} className={classes.filterButton}>
//         Filter
//       </Button>
//     </Popover>

//     <Button
//       type="button"
//       onClick={() => setShowModal(true)}
//       className={classes.addUserButton}
//     >
//       Add User
//     </Button>
//   </div>

//   <div className={classes.tableContainer}>
//     <table className={classes.table}>
//       <thead>
//         <tr>
//           <th>User ID</th>
//           <th>Name</th>
//           <th>Phone Number</th>
//           <th>Email</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.isArray(filteredData) && filteredData.length > 0 ? (
//           filteredData.map((item, index) => (
//             <tr key={index} className={classes.tableRow}>
//               <td>{item.userName}</td>
//               <td>{item.name}</td>
//               <td>{item.phoneNumber}</td>
//               <td>{item.email}</td>
//               <td>
//                 <Button
//                   type="button"
//                   onClick={() => handleDeleteUser(item.userId)}
//                   className={classes.deleteButton}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan="5" className={classes.noData}>
//               No data available
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>

//     <Pagination
//       current={currentPage}
//       pageSize={5}
//       total={totalItems}
//       onChange={handlePageChange}
//       className={classes.pagination}
//     />

//     {showModal && (
//       <AdminModule
//         showModal={showModal}
//         handleAddClose={() => setShowModal(false)}
//         onAddUser={(newUser) => setData((prev) => [...prev, newUser])}
//       />
//     )}

//     {del && (
//       <DeleteModule
//         deletemodel={del}
//         userid={userid}
//         listapicall={handleAdmin}
//       />
//     )}
//   </div>
// </div>

//     </>
//   );
// };

// export default Admin;