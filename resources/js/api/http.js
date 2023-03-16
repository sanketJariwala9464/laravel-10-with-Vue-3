import axios from "axios";
import { useAuthStore } from "../store/auth";
import { addToken } from "./plugins";

const store = useAuthStore();

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use(addToken);
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            store.logout();
        }       
    }
)
