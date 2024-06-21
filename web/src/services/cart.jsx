import api from './api.jsx';
const baseUrl = `/carts`;

const getAll = async () => {
    try {
        return await api.get(`${baseUrl}`);
    } catch (error) {
        throw error.response.data;
    }
};

const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

const getByAccount = async (consumerId) => {
    try {
        return await api.get(`${baseUrl}?accountId=${consumerId}`);
    } catch (error) {
        throw error.response.data;
    }
};

export default { getAll, getById, getByAccount };
