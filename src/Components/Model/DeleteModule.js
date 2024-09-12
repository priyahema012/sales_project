import React from 'react';
// import { deleteCard } from '../../axios/Services';
import { useDispatch, useSelector } from 'react-redux';
import classes from "../User Management/Admin.module.css";
import { handledeleteds } from '../../redux/reducers/AuthReducer';
import { message, Typography, Input } from "antd"; 
import { deleteCard } from "../../axios/Services";

function DeleteModule({ deletemodel, userid, listapicall }) {
  const selector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const confirmDelete = () => {
    let formData = new FormData();
    formData.append('token', selector.token);
    formData.append('userId', userid);

    deleteCard(formData)
      .then(() => {
        console.log('Deletion successful');
        dispatch(handledeleteds(false));
        listapicall();
        message.success("Deleted Successfully");
      })
      .catch((err) => {
        console.log('API Error:', err);
      });
  };

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
                  onClick={() => dispatch(handledeleteds(false))}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this userId : {userid}?</p>
                <button
                  type="button"
                  className={`btn btn-danger ${classes.buttonSpacing}`} 
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => dispatch(handledeleteds(false))}
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
