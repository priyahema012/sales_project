import { useSelector } from "react-redux";

export const useToken =()=>{
    return useSelector((state) => state.auth.token);
    
}