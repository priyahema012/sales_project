import React, { useEffect, useState } from "react";
import {
  LeadList,
  leaddelete,
  viewlead,
  updatelead,
} from "../../axios/Services";
import { useSelector } from "react-redux";
import Editmodel from "./Editmodel";

function Lead() {
  const selector = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const [editModel, setEditModel] = useState(false); // Edit modal state
  const handleEditUser = (leadId) => {
    setEditModel(true);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Due Type</th>
            <th>Lead ID</th>
            <th>Lead Name</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Lead Status ID</th>
            <th>Lead Status Name</th>
            <th>Created By</th>
            <th>Created By ID</th>
            <th>Active Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.due_type}</td>
                <td>{item.leadId}</td>
                <td>{item.leadName}</td>
                <td>{item.mobile}</td>
                <td>{item.address}</td>
                <td>{item.leadStatusId}</td>
                <td>{item.leadStatusName}</td>
                <td>{item.created_by}</td>
                <td>{item.created_by_id}</td>
                <td>{item.activeStatus}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEditUser(item.leadId)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {editModel && (
        <Editmodel
          editModel={editModel}
          leadId={selectedLeadId} // Pass selected leadId for editing
          leadData={selectedLeadData} // Pass selected lead data to prefill the form
          closeModal={() => setEditModel(false)} // Pass close modal function
        />
      )}
    </div>
  );
}

export default Lead;
