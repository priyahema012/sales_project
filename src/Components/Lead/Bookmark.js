import React, { useState } from "react";
import { useSelector } from "react-redux";
import { leadid } from "../../axios/Services";
import { useToken } from "../../Utility/hooks";
function Bookmark({ userid, closeModal }) {
  const token = useToken();
  const selector = useSelector((state) => state.auth);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);
  const toggleBookmarkStatus = () => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", userid);
    formData.append("isActive", bookmarkStatus ? 0 : 1);

    leadid(formData)
      .then(() => {
        setBookmarkStatus(!bookmarkStatus);
        console.log("Bookmark status updated successfully");
      })
      .catch(() => console.log("Error updating bookmark status"));
  };

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Toggle Bookmark Status</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal} // Close modal
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure you want to {bookmarkStatus ? "remove" : "add"} the
              bookmark for userId: {userid}?
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={toggleBookmarkStatus} // Toggle bookmark status
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal} // Close modal without action
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookmark;
