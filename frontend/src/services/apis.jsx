const BASE_URL = 'https://realtime-chat-app-chatty-li7x.onrender.com/api/v1';

export const endpoints = {
    SIGNUP_API : BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login'
}

export const profileEndPoints = {
    UPDATE_PICTURE: BASE_URL + '/auth/update-profile-pic'
}

export const messagesEndPoints = {
    GET_MESSAGES_API: BASE_URL + '/messages/:id',
    GET_ALL_USERS_API: BASE_URL + '/messages/allusers',
    GET_USER_DETAILS_API: BASE_URL + '/messages/getuserdetails',
    SEND_MESSAGES_API: BASE_URL + '/messages/send/:id'
}