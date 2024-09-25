 export interface RootState {
    auth: {
      resetkey: string | null;
      delete: boolean;
      filter: {
        userName?: string;
        phoneNumber?: string;
        email?: string;
      };
      showDeleteModal:string
    };
  }
  


  export interface DataItem {
    userName: string | number | readonly string[] | undefined;
    userId: number;          // Adjust if userId is a different type
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    createdAt: Date;
    updatedAt: Date;

  
    phoneNumber: string; // Add this
   
    country: string; // Add this if needed
    password: string; // Add this if needed
    pincode: string; // Add this if needed
}