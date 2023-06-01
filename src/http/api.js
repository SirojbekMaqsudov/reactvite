import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('_auth')}`
    return config
})

export default api