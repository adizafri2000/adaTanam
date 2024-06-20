import api from './api.jsx';
const baseURL = `/produce`;

const getAll = async () => {
    try {
        return await api.get(`${baseURL}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const getById = async (id) => {
    try {
        return await api.get(`${baseURL}/${id}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const getByStore = async (storeId) => {
    try {
        return await api.get(`${baseURL}?storeId=${storeId}`);
    } catch (error) {
        throw error.response.data.message;
    }
};

const create = async (token, data) => {
    // try {
    //     return await api.post(`${baseURL}`, data, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });
    // } catch (error) {
    //     throw error.response.data.message;
    // }
    try {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('produce', blob, 'produce.json');

        const config = {
            method: 'post',
            url: `${baseURL}`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data : formData
        };

        return await api(config);
    } catch (error) {
        console.error('Error creating produce:', error);
        throw error.response.data.message;
    }
}

export default { getAll, getById, getByStore };
