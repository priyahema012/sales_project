export type FormValues = {
    changepassword: string;
    confirmpassword: string;
};

export type selectorProps = {
    auth: {
        resetkey: string;
        token: string;
    };
};

export interface ResetPasswordFormValues {
    changepassword: string;
    confirmpassword: string;
  }
  
  export interface AuthState {
    resetkey: string | null;
  }
  
  export interface Stored {
    ResetKey  : string;
  }
 