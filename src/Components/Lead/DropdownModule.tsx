import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { dropdown1, dropdown2, reassign } from "../../axios/Services";
import { message } from "antd";
import { useToken } from "../../Utility/hooks";
import { storeDataProps } from "../../Types/reducer";

interface DropdownModuleProps {
  isOpen: boolean;
  onClose: () => void;
  userid: string | null; 
}

const DropdownModule: React.FC<DropdownModuleProps> = ({ isOpen, onClose, userid }) => {
  const token = useToken();
  const dispatch = useDispatch();
  const { Option } = Select;
  const [data, setData] = useState<{ userId: string; userName: string }[]>([]);
  const [valve, setValve] = useState<{ userId: string; userName: string }[]>([]);
  const [dealerId, setDealerId] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const selector = useSelector((state: storeDataProps) => state.auth);

  useEffect(() => {
    if (isOpen) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("isDealer", "1");


     
      dropdown1(formData)
        .then((res) => {
          console.log("Dealers data:", res);
          setData(res.data.data);
        })
        .catch((error) => console.error("Error loading dealer data:", error));
    }
  }, [isOpen, token]);

  useEffect(() => {
    if (dealerId && isOpen) {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("dealerId", dealerId);

      dropdown2(formData)
        .then((res) => {
          console.log("Employees data:", res);
          setValve(res.data.data);
        })
        .catch((error) => console.error("Error loading employee data:", error));
    }
  }, [dealerId, isOpen, token]);

  const onDealerChange = (value: string) => {
    setDealerId(value);
    console.log("Selected dealer ID:", value);
  };

  const onEmployeeChange = (value: string) => {
    setEmployeeId(value);
    console.log("Selected Employee ID", value);
  };

  const handleOk = () => {
    console.log("Submitting leadId:", userid);
    const formData = new FormData();
    formData.append("token", token || ""); // Handle potential null token
    formData.append("dealerId", dealerId || ""); // Handle potential null dealerId
    formData.append("employeeId", employeeId || ""); // Handle potential null employeeId
    formData.append("leadId", userid || ""); // Handle potential null userid
   
    reassign(formData)
      .then((res) => {
        console.log("API Response:", res);
        console.log("reassign")
        onClose();
      })
      .catch((error) => {
        console.error(
          "Error loading data:",
          error.response ? error.response.data : error.message
        );
     
      });
  };

  const onChange = (value: string) => {
    console.log(`Selected employee: ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("Search:", value);
  };
  console.log("dealerId",dealerId)
  return (
    <div>
      {isOpen && (
        <div
          className="modal show"
          style={{ display: "block", zIndex: 1050 }}
          tabIndex={-1} // Change to number type
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Action</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                <Select
                  showSearch
                  placeholder="Select a dealer"
                  optionFilterProp="label"
                  onChange={onDealerChange}
                  value={dealerId}
                  onSearch={onSearch}
                >
                  {data.map((item) => (
                    <Option key={item.userId} value={item.userId}>
                      {item.userName}
                    </Option>
                  ))}
                </Select>
                <Select
                  showSearch
                  placeholder="Select an employee"
                  optionFilterProp="label"
                  onChange={onEmployeeChange}
                  onSearch={onSearch}
                  disabled={dealerId === null}
                >
                  {valve.map((item) => (
                    <Option key={item.userId} value={item.userId}>
                      {item.userName}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleOk}
                 
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownModule;





































// import React, { useState, useEffect } from "react";
// import { Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { dropdown1, dropdown2, reassign } from "../../axios/Services";
// import { message } from "antd";
// import { useToken } from "../../Utility/hooks";
// import { storeDataProps } from "../../Types/reducer";

// const DropdownModule = ({ isOpen, onClose, userid }) => {
//   const token = useToken();
//   const dispatch = useDispatch();
//   const { Option } = Select;
//   const [data, setData] = useState([]);
//   const [valve, setValve] = useState([]);
//   const [dealerId, setDealerId] = useState(null);
//   const [employeeId, setEmployeeId] = useState(null);
//   const selector = useSelector((state: storeDataProps ) => state.auth );

//   useEffect(() => {
//     if (isOpen) {
//       const formData = new FormData();
//       formData.append("token", token);
//       formData.append("isDealer", "1");

//       dropdown1(formData)
//         .then((res) => {
//           console.log("Dealers data:", res);
//           setData(res.data.data);
//         })
//         .catch((error) => console.error("Error loading dealer data:", error));
//     }
//   }, [isOpen, token]);

//   useEffect(() => {
//     if (dealerId && isOpen) {
//       const formData = new FormData();
//       formData.append("token", token);
//       formData.append("dealerId", dealerId);

//       dropdown2(formData)
//         .then((res) => {
//           console.log("Employees data:", res);
//           setValve(res.data.data);
//         })
//         .catch((error) => console.error("Error loading employee data:", error));
//     }
//   }, [dealerId, isOpen, token]);

//   const onDealerChange = (value) => {
//     setDealerId(value);
//     console.log("Selected dealer ID:", value);
//   };

//   const onEmployeeChange = (value) => {
//     setEmployeeId(value);
//     console.log("Selected Employee ID", employeeId);
//   };

//   const handleOk = () => {
//     console.log("Submitting leadId:", userid);
//     const formData = new FormData();
//     formData.append("token", selector.token);
//     formData.append("dealerId", dealerId);
//     formData.append("employeeId", employeeId);

//     formData.append("leadId", userid);

//     reassign(formData)
//       .then((res) => {
//         console.log("API Response:", res);
//         if (res && res.data) {
//           if (res.data) {
//             console.log("Data updated successfully");
//             onClose();
//             message.success("Lead reassigned successfully!");
//           } else {
//             console.log(
//               "Failed to update data:",
//               res.data.message || "No message provided"
//             );
//             message.error(res.data.message || "Failed to update data.");
//           }
//         } else {
//           console.log("No data returned from API");
//           message.error("No data returned from API.");
//         }
//       })
//       .catch((error) => {
//         console.error(
//           "Error loading data:",
//           error.response ? error.response.data : error.message
//         ); // Log detailed error
//         message.error(
//           error.response?.data?.message ||
//             error.message ||
//             "An unexpected error occurred."
//         );
//       });
//   };

//   const onChange = (value) => {
//     console.log(`Selected employee: ${value}`);
//   };

//   const onSearch = (value) => {
//     console.log("Search:", value);
//   };

//   return (
//     <div>
//       {isOpen && (
//         <div
//           className="modal show"
//           style={{ display: "block", zIndex: 1050 }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Select Action</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={onClose}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <Select
//                   showSearch
//                   placeholder="Select a dealer"
//                   optionFilterProp="label"
//                   onChange={onDealerChange}
//                   value={dealerId}
//                   onSearch={onSearch}
//                   name="dealerId"
//                 >
//                   {data?.map((item) => (
//                     <Option key={item.userId} value={item.userId}>
//                       {item.userName}
//                     </Option>
//                   ))}
//                 </Select>
//                 <Select
//                   showSearch
//                   placeholder="Select an employee"
//                   optionFilterProp="label"
//                   onChange={onEmployeeChange}
//                   onSearch={onSearch}
//                   name="employeeId"
//                 >
//                   {valve?.map((item) => (
//                     <Option key={item.userId} value={item.userId}>
//                       {item.userName}
//                     </Option>
//                   ))}
//                 </Select>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={onClose}
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={handleOk}
//                 >
//                   OK
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownModule;
