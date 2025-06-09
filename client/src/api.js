import axios from "axios"

const API=axios.create({
    baseURL:"http://localhost:5000/api",
    headers:{"Content-Type":"application/json"}
})

export const createUser=(email)=>API.post("/users",{email})
export const getAllUser=()=>API.get("/users")

export const sendMessageToAPI = (data) => API.post("/messages", data);
export const getMessagesBetweenUsers = (user1, user2) =>
  API.get(`/messages/${user1}/${user2}`);