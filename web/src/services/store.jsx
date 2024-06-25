import api from './api.jsx';
const baseUrl = `/stores`;

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

const getByFarmer = async (farmerId) => {
    try {
        return await api.get(`${baseUrl}?farmerId=${farmerId}`);
    } catch (error) {
        // console.log(`call to ${baseUrl}?farmerId=${farmerId} error: `, error);
        throw error.response.data;
    }
};


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

export default { getAll, getById, getByFarmer, create };
