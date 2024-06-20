import api from './api.jsx';
const baseUrl = `/stores`;

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

const getByFarmer = async (farmerId) => {
    try {
        return await api.get(`${baseUrl}?farmerId=${farmerId}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

export default { getAll, getById, getByFarmer };
