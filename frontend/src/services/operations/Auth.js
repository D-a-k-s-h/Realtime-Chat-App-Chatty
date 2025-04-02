import toast from "react-hot-toast";
import { endpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setToken, setUser} from '../../slices/AuthSlice' 
import { connectSocket, disconnectSocket } from "../../utils/connectSocket";

const {
    SIGNUP_API,
    LOGIN_API
} = endpoints;

export function signUp(formData,navigate){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",SIGNUP_API,formData);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("SignUp Successfull");

            console.log("RESPONSE WHILE SIGNING UP -> ",response);

            navigate("/login");
        } catch(error){
            console.log("Error while signing up -> ",error);
            toast.error(`${error?.response?.data?.message}`);
        }
        toast.dismiss(toastId);
    }
}

export function login(formData,navigate){
    return async(dispatch,getState) => {
        const toastId = toast.loading("Loading...");
        try{
            console.log("formData -> ",formData.email);
            console.log("formData -> ",formData.password);
            const response = await apiConnector("POST",LOGIN_API,formData);

            console.log("LOGIN RESPONSE -> ",response);

            if(!response.data.success){
                throw new error(response.error.message);
            }

            const user = response?.data?.user;
            const token = response?.data?.token;

            dispatch(setUser(user));
            dispatch(setToken(token));

            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(token));

            toast.success("Login Successfull");
            dispatch((dispatch,getState) => connectSocket(dispatch,getState));
            navigate("/profile");

        } catch(error){
            console.log("ERROR WHILE LOGIN -> ",error);
            toast.error(`${error?.response?.data?.message}`)
        }
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return async(dispatch,getState) => {
        dispatch(setUser(null));
        dispatch(setToken(null));
        dispatch((dispatch,getState) => disconnectSocket(dispatch,getState));

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    }
}