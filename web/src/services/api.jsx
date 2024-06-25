import axios from 'axios';

const host = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
            error.response.data.message === 'Expired token'
        ) {
            console.log('api error message: ', error.response.data.message)
            console.log('refreshing token');
            originalRequest._retry = true;

            const storedUser = localStorage.getItem('user');
            let parsedUser = null;
            let newTokens = null;
            if(!storedUser) {
                window.redirect(`${host}/login`)
                return
            }
            else {
                parsedUser = JSON.parse(storedUser);
                // setUser(parsedUser);
                console.log('parsed user from local storage at api interceptor: ', parsedUser)
                const tokens = {
                    accessToken: parsedUser.accessToken,
                    refreshToken: parsedUser.refreshToken
                }

                const response = await axios.post(`${host}/auth/refresh`, tokens);
                console.log('response from refresh token mechanism: ', response);
                newTokens = response.data;
            }

            console.log('new tokens: ', newTokens);
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            const updatedUser = {...parsedUser, accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken};
            console.log('updating user tokens from api interceptor: ', updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return api(originalRequest);
        }
        else{
            console.log('not an error that requires token refresh')
        }
        return Promise.reject(error);
    }
);


export default api;