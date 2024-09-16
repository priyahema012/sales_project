import React from 'react';
import { Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMasters, deleteRequirements } from '../axios/Services';
import { handleShowDeleteModal } from '../redux/reducers/AuthReducer';
import { useToken } from '../Utility/hooks';


export default function MastersDeleteModal({ listapical,value }) {
  const selector = useSelector((state) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();

  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("dataId", selector.userId);
    
    deleteMasters(formData,value)
      .then((response) => {
        console.log(response.data);
        message.success(response.data.msg).then(() => {
          if(response.data.status)
          {
            dispatch(handleShowDeleteModal(false));
            listapical(); 
          }
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    dispatch(handleShowDeleteModal(false));
  };

  return (
    <>
      <Modal
        title="Confirm Deletion"
        centered
        open={selector.showDeleteModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );
}
