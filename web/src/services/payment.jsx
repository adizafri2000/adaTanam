import api from './api.jsx';
const baseUrl = `/payments`;


const getAll = async () => {
    try {
        return await api.get(`${baseUrl}`);
    } catch (error) {
        throw error.response.data;
    }
}

const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
}

const create = async (token, data) => {
    try {
        return await api.post(`${baseUrl}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

const update = async (token, id, data) => {
    try {
        return await api.put(`${baseUrl}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

export default { getAll, getById, create, update };