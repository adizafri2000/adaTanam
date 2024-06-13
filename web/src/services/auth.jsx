import axios from 'axios'

const host = import.meta.env.VITE_API_URL

// Create an axios instance with default settings
const instance = axios.create({
    baseURL: `${host}/auth`,
});

const login = async credentials => {
    try {
        return await instance.post('/login', credentials);
    } catch (error) {
        throw error.response.data.message;
    }
}

const signup = async data => {
    try {
        return await instance.post('/signup', data);
    } catch (error) {
        console.error('Error signing up:', error);
        throw error.response.data.message;
    }
}

const auth = { login, signup }
export default auth