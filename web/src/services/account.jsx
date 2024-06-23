import api from './api.jsx';
const baseUrl = `/accounts`;


const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

const update = async (id, data, token, imageFile) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('image', imageFile);
        return await api.put(`${baseUrl}/${id}`, formData, config);
    } catch (error) {
        throw error.response.data;
    }
}


export default {  getById, update };
