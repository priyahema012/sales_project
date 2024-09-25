import React from 'react';
import { Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMasters } from '../axios/Services';
import { handleShowDeleteModal } from '../redux/reducers/AuthReducer';
import { useToken } from '../Utility/hooks';
import { storeDataProps } from '../Types/reducer';

interface MastersDeleteModalProps {
  listapical: () => void; 
  value: number; // Ensure this is a number
}

interface RootState {
  auth: {
    showDeleteModal: boolean;
    userId: string;
  };
}

export default function MastersDeleteModal({ listapical, value }: MastersDeleteModalProps) {
  const selector = useSelector((state: storeDataProps) => state.auth);
  const token = useToken();
  const dispatch = useDispatch();

  const handleOk = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("dataId", value.toString()); // Convert to string for FormData
    
    deleteMasters(formData)
      .then((response) => {
        console.log(response.data);
        message.success(response.data.msg).then(() => {
          if (response.data.status) {
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
  );
}
