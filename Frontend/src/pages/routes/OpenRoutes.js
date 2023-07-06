import { Navigate } from "react-router-dom";



export const OpenRoutes=({children})=>{
    const getTokenFromLocalStorage=localStorage.getItem("user")
return getTokenFromLocalStorage?.token===undefined? children :(<Navigate to='/app'  replace={true}/>)



}
