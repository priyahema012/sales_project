import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../User Management/Admin.module.css";
import { handledeleteds } from "../../redux/reducers/AuthReducer";
import { message, Modal, Button } from "antd";
import { deleteCard } from "../../axios/Services";
import { storeDataProps } from "../../Types/reducer";

interface DeleteProps {
  userid: string;
  listapicall: () => void;
}

function DeleteModule({ userid, listapicall }: DeleteProps) {
  const selector = useSelector((state: storeDataProps) => state.auth);
  const dispatch = useDispatch();

  const confirmDelete = () => {
    let formData = new FormData();
    formData.append("token", selector.token);
    formData.append("userId", userid);

    deleteCard(formData)
      .then((response) => {
        console.log("Deletion successful");
        dispatch(handledeleteds(false));
        listapicall();
        message.success(response.data.msg);
      })
      .catch((err) => {
        console.log("API Error:", err);
        message.error("Error deleting user. Please try again.");
      });
  };

  const handleCancel = () => {
    dispatch(handledeleteds(false));
  };

  return (
    <Modal
      title="Confirm Deletion"
      visible={true}
      onOk={confirmDelete}
      onCancel={handleCancel}
      okText="Confirm"
      cancelText="Cancel"
      // okButtonProps={{ type: "danger" }}
    >
      <p>Are you sure you want to delete this userId: {userid}?</p>
    </Modal>
  );
}

export default DeleteModule;
