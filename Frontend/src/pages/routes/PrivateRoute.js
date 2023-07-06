import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


export const PrivateRoutes=({children})=>{
    const getTokenFromLocalStorage=localStorage.getItem("user")
    const handleNavigate = () => {
      
        toast.error("You are being redirected to the login page");
      }
return JSON.parse(getTokenFromLocalStorage)?.token!==undefined? children :(<Navigate to='/login'  replace={true} onBeforeNavigate={handleNavigate}/>)



}
// const getTokenFromLocalStorage=localStorage.getItem("user")

// console.log(JSON.parse(getTokenFromLocalStorage));