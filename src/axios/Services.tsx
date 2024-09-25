import instance from "./Axios";
import axios from "./Axios";

export const login = (loginid:FormData) => {
  return instance.post("/login", loginid);
};

export const Adminsss = (page:number, size:number, data:FormData) => {
  return axios.post(`/user/list_users?page=${page}&size=${size}`, data);
};

export const product = (productid:FormData) => {
  return axios.post("/dashboard/all_data_count", productid);
};



export const admin = (adminid:FormData, page:number, size:number) => {
  return axios.post(`/user/list_users?page=${page}&size=${size}`, adminid);
};

export const add = (data:FormData) => {
  return axios.post("/user/create_user", data);
};

export const deleteCard = (data:FormData) => {
  return axios.post("/user/delete_user", data);
};

export const updateCard = (data:FormData) => {
  return axios.post("/user/update_user", data);
};

export const ViewCard = (data :FormData) => {
  return axios.post("/user/view_user", data);
};

export const update = (data :FormData) => {
  return axios.post("/user/update_user", data);
};



export const forgotPassword = (data :FormData) => {
  return axios.post("/forgotPassword", data);
};

export const verifyOtp = (data :FormData) => {
  return axios.post("/verify_otp", data);
};

export const resetPassword = (data :FormData) => {
  return axios.post("/reset_password", data);
};

export const AddCreate = (data :FormData) => {
  return axios.post("/lead/create_lead", data);
};

export const EditCreate = (data :FormData) => {
  return axios.post("/lead/lead_update", data);
};

export const DeleteCreate = (data :FormData) => {
  return axios.post("/lead/delete_lead", data);
};

export const LeadList = (page:number, size: number,data :FormData) => {
  return axios.post(`/lead/list_lead?page=${page}&size=${size}`,data);
};

export const CreateLeadList = (data:FormData) => {
  return axios.post("/lead/create_lead", data);
};

export const leaddelete = (data:FormData) => {
  return axios.post("/lead/delete_lead", data);
};

export const leadupdate = (data:FormData) => {
  return axios.post("/lead/lead_update", data);
};

export const viewlead = (data:FormData) => {
  return axios.post("/lead/view_lead", data);
};

export const updatelead = (data:FormData) => {
  return axios.post("/lead/lead_update", data);
};

export const leadid = (data:FormData) => {
  return axios.post("/lead/hot_lead", data);
};

export const changeid = (data:FormData) => {
  return axios.post("/lead/changeLeadStatus", data);
};

export const dropdown = (data:FormData) => {
  return axios.post("/dropdown/dropdownRequirements", data);
};

export const resend = (data:FormData) => {
  return axios.post("/resend_otp", data);
};

export const dropdown1 = (data:FormData) => {
  return axios.post("/dropdown/userDropdown", data);
};

export const dropdown2 = (data:FormData) => {
  return axios.post("/dropdown/employeeDropDown", data);
};

export const reassign = (data:FormData) => {
  return axios.post("/lead/lead_reassign", data);
};

export const UpdateStatus = (data:FormData) => {
  return axios.post("/dropdown/dropdownLead", data);
};

export const enquriy = (data:FormData) => {
  return axios.post("/dropdown/dropdownEnquiry", data);
};

export const compettior = (data:FormData) => {
  return axios.post("/dropdown/dropdownCompetitor", data);
};

export const employeedropdown = (data:FormData) => {
  return axios.post("/dropdown/employeeDropDown", data);
};

export const userDropdown = (data:FormData) => {
  return axios.post("/dropdown/userDropdown", data);
};

export const changeLeadStatus = (data:FormData) => {
  return axios.post("/lead/changeLeadStatus", data);
};

export const MasterList = (page:number, size:number, data:FormData) => {
  return axios.post(`/masters/list_category?page=${page}&size=${size}`, data);
};

export const createMasters = (formData :FormData, value:string) => {
  return instance.post(`/masters/create_${value}`, formData);
};

export const updateMasters = (formData :FormData, value:string) => {
  return instance.post(`/masters/update_${value}`, formData);
};
export const AddList = (data :FormData) => {
  return axios.post("/masters/create_category", data);
};

export const UpdateList = (data :FormData) => {
  return axios.post("/masters/update_category", data);
};

export const deleteMasters = (data :FormData) => {
  return axios.post("/masters/delete_customer_category", data);
};

export const listEnquiry = (page:number,size:number,data :FormData) => {
  return instance.post(`/masters/list_enquiry_type?page=${page}&size=${size}`,data)
}

export const createuser = (formData:FormData) => {
  return axios.post(`/masters/create_category/users`, formData);
};

export const listRequirements = (page:number,size:number,data:FormData) => {
  return instance.post(`/masters/list_requirements?page=${page}&size=${size}`,data)
}


export const chart = (data:FormData) => {
  return instance.post(`/dashboard/dealer_wise_report`,data)
}


export const leaddrop = (data:FormData) => {
  return instance.post(`/dropdown/dropdownRequirements`,data)
}

export const dealerdropdown = (data:FormData) => {
  return instance.post(`/dropdown/userDropdown`, data)
}


export const product1 = (data:FormData) => {
  return instance.post("/dashboard/all_data_count", data)
}

