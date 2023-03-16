import { useAuthStore } from "../store/auth";
const store = useAuthStore();

export const addToken = (config) => {
    const token = store.getAuthDetails.token;
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
}
