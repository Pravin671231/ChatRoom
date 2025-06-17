import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const createUser = (email) => API.post("/users", { email });
export const getAllUsers = () => API.get("/users");
console.log(getAllUsers);

export const sendMessageToAPI = (data) => API.post("/messages", data);
export const getMessagesBetweenUsers = (user1, user2) =>
  API.get(`/messages/${user1}/${user2}`);
