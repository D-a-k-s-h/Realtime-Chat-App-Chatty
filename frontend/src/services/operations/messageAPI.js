import toast from "react-hot-toast";
import { messagesEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_MESSAGES_API,
    GET_ALL_USERS_API,
    GET_USER_DETAILS_API,
    SEND_MESSAGES_API
} = messagesEndPoints;

export function getMessages(receiverId,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            //In GET requests bodyData remains null therefore we send data in url only
            const response = await apiConnector(
                "POST",
                `${GET_MESSAGES_API}`,
                {receiverId},
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("RESPONSE WHILE FETCHING MESSAGES -> ",response);
            result = response?.data?.data
            //toast.success("Messages Fetched Successfully")

        } catch(error){
            console.log("ERROR WHILE FETCHING MESSAGES -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getAllUsers(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try{
            const response = await apiConnector(
                "POST",
                GET_ALL_USERS_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            )

            console.log("GET_ALL_USERS_API -> ",GET_ALL_USERS_API);

            if(!response.data.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE FETCHING USERS -> ",response);
            result = response?.data?.data;
            //toast.success("Users Fetched Successfully");

        } catch(error){
            console.log("ERROR WHILE FETCHING USERS -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getUserDetails(userId,token){
    return async() => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "GET",
                `${GET_USER_DETAILS_API}?userId=${userId}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            result = response?.data?.data;
            console.log("FETCH USERS DETAILS RESPONSE -> ",response);
            //toast.success("Users details fetched successfully");

        } catch(error){
            console.log("ERROR WHILE FETCHING USERS DETAILS -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function sendMessages(receiverId,formData,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                `${SEND_MESSAGES_API}?id=${receiverId}`,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log("RESPONSE WHILE SENDING MESSAGE -> ",response);
            toast.success("Message sent");
             
        } catch(error){
            console.log("ERROR WHILE SENDING MESSAGE -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}