import axios from 'axios';

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
        // Handle token refresh logic here if necessary
        return Promise.reject(error);
    }
);

export default api;