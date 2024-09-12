import instance from "./Axios";
import axios from "./Axios";

export const login = (loginid) => {
  return instance.post("/login", loginid);
};

export const Adminsss=(page,size,data)=>{
  return axios.post(`/user/list_users?page=${page}&size=${size}`,data)
};


export const product = (productid) => {
  return axios.post("/dashboard/all_data_count", productid);
};

export const admin = (adminid) => {
  return axios.post("/user/list_users", adminid);
};

export const add = (data) => {
  return axios.post("/user/create_user", data);
};

export const deleteCard = (data) => {
  return axios.post("/user/delete_user", data);
};

export const updateCard = (data) => {
  return axios.post("/user/update_user", data);
};

export const ViewCard = (data) => {
  return axios.post("/user/view_user", data);
};

export const update = (data) => {
  return axios.post("/user/update_user", data);
};

export const forgotPassword = (data) => {
  return axios.post("/forgotPassword", data);
};

export const verifyOtp = (data) => {
  return axios.post("/verify_otp", data);
};

export const resetPassword = (data) => {
  return axios.post("/reset_password", data);
};


export const AddCreate = (data) => {
  return axios.post("/lead/create_lead", data);
};

export const EditCreate = (data) => {
  return axios.post("/lead/lead_update", data);
};

export const DeleteCreate = (data) => {
  return axios.post("/lead/delete_lead", data);
};


export const LeadList  = (data) => {
  return axios.post("/lead/list_lead", data);
};

export const CreateLeadList  = (data) => {
  return axios.post("/lead/create_lead", data);
};


export const leaddelete=(data)=>{
  return axios.post('/lead/delete_lead',data)
}


export const leadupdate=(data)=>{
  return axios.post('/lead/lead_update',data)
}


export const viewlead=(data)=>{
  return axios.post('/lead/view_lead',data)
}


export const updatelead=(data)=>{
  return axios.post('/lead/lead_update',data)
}

export const leadid=(data)=>{
  return axios.post('/lead/hot_lead',data)
}

export const changeid=(data)=>{
  return axios.post('/lead/changeLeadStatus',data)
}


export const dropdown=(data)=>{
  return axios.post('/dropdown/dropdownRequirements',data)
}


export const resend=(data)=>{
  return axios.post('/resend_otp',data)
}


export const dropdown1=(data)=>{
  return axios.post('/dropdown/userDropdown',data)
}

export const dropdown2=(data)=>{
  return axios.post('/dropdown/employeeDropDown',data)
}

export const reassign=(data)=>{
  return axios.post('/lead/lead_reassign',data)
}


export const UpdateStatus=(data)=>{
  return axios.post('/dropdown/dropdownLead',data)
}


export const enquriy=(data)=>{
  return axios.post('/dropdown/dropdownEnquiry',data);
}

export const compettior=(data)=>{
  return axios.post('/dropdown/dropdownCompetitor',data);
}


export const employeedropdown=(data)=>{
  return axios.post('/dropdown/employeeDropDown',data);
}


export const userDropdown=(data)=>{
  return axios.post('/dropdown/userDropdown',data);
}

export const changeLeadStatus=(data)=>{
  return axios.post('/lead/changeLeadStatus',data);
}
















