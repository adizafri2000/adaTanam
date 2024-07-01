import api from './api.jsx';
const baseURL = `/search`;


const search = async (searchQuery) => {
    try {
        return await api.get(`${baseURL}?query=${searchQuery}`);
    } catch (error) {
        console.log('Error fetching search results:', error);
        throw error.response.data;
    }
}

export default {search}