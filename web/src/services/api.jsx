import axios from 'axios';

const host = import.meta.env.VITE_API_URL
let refreshToken = null;

const api = axios.create({
    baseURL: host,
});

api.interceptors.response.use(
    response => response,
    async error => {
        console.log('api interceptor encountered error: ', error);
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.method !== 'get' &&
            // !expiredTokenMessages.some(message => error.response.data.message.includes(message))
            error.response.data.message === 'Expired token'
        ) {
            console.log('api error message: ', error.response.data.message)
            console.log('refreshing token');
            originalRequest._retry = true;
            const newToken = await refreshToken();
            console.log('new token: ', newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        }
        else{
            console.log('not an error that requires token refresh')
        }
        return Promise.reject(error);
    }
);

export const setRefreshToken = (tokenRefreshFunction) => {
    refreshToken = tokenRefreshFunction;
};

export default api;