// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Button, Modal } from 'antd';

// function Deletemodel({handledelete,msg,userid,onclose}) {
//     const modal=useSelector((state)=>state.auth.modal);

//   return (
//     <div>
//          <Modal

// title="Delete"
// open={modal}
// onCancel={onclose}
// footer={[
//   <Button key="back" onClick={onclose}>
//  Cancel
//   </Button>,
//   <Button key="submit" type="primary"  onClick={handledelete}>
//     confirm
//   </Button>,

// ]}
// >
//      <p>{msg}:  { userid}</p>

// </Modal>
//     </div>
//   )
// }

// export default Deletemodel










import React from 'react';
import { useDispatch } from 'react-redux';
import { handledeleteds } from '../../redux/reducers/AuthReducer';
import { message, Typography, Input } from "antd"; 
import { LeadList, leaddelete } from "../../axios/Services";

function DeleteModule({ deletemodel, userid, confirmDelete, closeModal }) {
  const dispatch = useDispatch();

  return (
    <div>
      {deletemodel && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal} // Close modal
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this userId: {userid}?</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete} // Confirm delete
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal} // Close modal without deleting
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteModule;
