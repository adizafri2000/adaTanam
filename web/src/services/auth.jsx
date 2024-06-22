import api from './api.jsx'
const baseURL = '/auth'

const login = async credentials => {
    try {
        return await api.post(`${baseURL}/login`, credentials);
    } catch (error) {
        console.log('error on login API: ', error)
        throw error.response.data;
    }
}

const signup = async data => {
    try {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('account', blob, 'account.json');

        const config = {
            method: 'post',
            url: `${baseURL}/signup`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data : formData
        };

        return await api(config);
    } catch (error) {
        console.error('Error signing up:', error);
        throw error.response.data;
    }
}

const auth = { login, signup }
export default auth