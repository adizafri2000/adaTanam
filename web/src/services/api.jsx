import axios from 'axios';
import UserContext from '../contexts/UserContext.jsx';

const host = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: host,
});

// Add a request interceptor
api.interceptors.request.use(
    config => {
        if (config.headers && config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${config.headers.Authorization}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        console.log('api.jsx error: ', error)
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { refreshToken } = UserContext;
            const newToken = await refreshToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;