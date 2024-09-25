
import React from "react";
import { useDispatch } from "react-redux";
import { useToken } from "../../Utility/hooks";

interface DeleteModuleProps {
  deletemodel: boolean;
  userid: string;
  confirmDelete: () => void;
  closeModal: () => void;
}

const DeleteModule = (props: DeleteModuleProps) => {
  const { deletemodel, userid, confirmDelete, closeModal } = props;
  const token = useToken();
  const dispatch = useDispatch();

  return (
    <div>
      {deletemodel && (
        <div className="modal show" style={{ display: "block" }} tabIndex={-1}>
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
};

export default DeleteModule;
