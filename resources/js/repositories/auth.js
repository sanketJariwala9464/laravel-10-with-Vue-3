import { api } from "../api";

export default {
    login: (data) => api.$post('/login', data),
    logout: () => api.$post('/logout'),
}