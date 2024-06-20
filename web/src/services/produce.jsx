import api from './api.jsx';
const baseUrl = `/produce`;

const getAll = async () => {
    try {
        return await api.get(`${baseUrl}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const getByStore = async (storeId) => {
    try {
        return await api.get(`${baseUrl}?storeId=${storeId}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

export default { getAll, getById, getByStore };
