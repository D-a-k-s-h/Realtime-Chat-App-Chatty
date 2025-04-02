import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";
import { setUser } from "../../slices/AuthSlice";

const {   
    UPDATE_PICTURE
} = profileEndPoints

export function updateProfilePic(formData,token){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                UPDATE_PICTURE,
                formData,
                {
                    "Content-Type":"multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success){
                throw new error(response.data.message);
            }

            console.log("UPDATING PICTURE RESPONSE -> ",response);

            toast.success("Profile picture updated successfully");

            dispatch(setUser(response?.data?.data));
            localStorage.setItem("user",response?.data?.data);

        } catch(error){
            console.log("ERROR WHILE UPDATING PICTURE -> ",error);
            toast.error(`${error?.response?.data?.message}`);
        }
        toast.dismiss(toastId);
    }
}