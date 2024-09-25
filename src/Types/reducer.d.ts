export type storeDataProps = {
    auth:authReducerProps
  }
  
  export type authReducerProps = {
    showDeleteModal: boolean | undefined
    requirementsList: any
    enquiryListData: any
    categoryList: any
      user_id: string,
    userType: string,
    token:string
  }

  
 
  export interface Category {
    customerCategoryId: string;
    customerCategoryName: string;
  }
  
  export interface Enquiry {
    enquireId: string;
    enquireTypeName: string;
  }
  
  export interface Requirement {
    RequirementsId: string;
    RequirementsName: string;
  }
  
  export type selector={
    categoryList:Category[],
  token: string,
  search: {},
  showAddModal: boolean,
  showDeleteModal: boolean,
  showUpdateModal: boolean,
  userId: string,
  username: string,
  reset_key: string,
  otp:string,
  enquiryListData:Enquiry[],
  requirementsList:Requirement[],

  }
  export type storedatas={
    auth:selector;
  }
  export type dealer = {
    userId:string,
    userName:string
  }
  export type dealerid = {
    dealerid : number
  }