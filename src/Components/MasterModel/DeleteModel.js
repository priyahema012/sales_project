// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import classes from "../User Management/Admin.module.css";
// import { handledeleteds } from '../../redux/reducers/AuthReducer';
// import { message } from "antd";
// import { DeleteList } from "../../axios/Services";

// function DeleteModel({ deletemodel, userid, listapicall, handleClose }) {
//   const selector = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const confirmDelete = () => {
//     let formData = new FormData();
//     formData.append('token', selector.token);
//     formData.append('dataId', userid);

//     console.log('FormData:', formData);

//     DeleteList(formData)
//       .then(() => {
//         console.log('Deletion successful');
//         dispatch(handledeleteds(false)); 
//         handleClose(); 
//         listapicall(); 
//         message.success("Deleted Successfully");
//       })
//       .catch((err) => {
//         console.error('API Error:', err);
//         message.error(`Error deleting item: ${err.message}`);
//       });
//   };

//   return (
//     <div>
//       {deletemodel && (
//         <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Deletion</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={handleClose}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete this userId: {userid}?</p>
//                 <button
//                   type="button"
//                   className={`btn btn-danger ${classes.buttonSpacing}`} 
//                   onClick={confirmDelete}
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleClose}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeleteModel;
