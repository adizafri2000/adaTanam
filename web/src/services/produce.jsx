import api from './api.jsx';
const baseURL = `/produce`;

const getAll = async () => {
    try {
        return await api.get(`${baseURL}`);
    } catch (error) {
        console.log('Error fetching produce:', error);
        throw error.response.data;
    }
};

const getById = async (id) => {
    try {
        return await api.get(`${baseURL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

const getByStore = async (storeId) => {
    try {
        return await api.get(`${baseURL}?storeId=${storeId}`);
    } catch (error) {
        throw error.response.data;
    }
};

const create = async (token, data, imageFile) => {

    try {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('produce', blob, 'produce.json');
        formData.append('image', imageFile);
        const config = {
            method: 'post',
            url: `${baseURL}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            data : formData
        };
        console.log('config: ', config);
        return await api(config);
    } catch (error) {
        console.error('Error creating produce:', error);
        throw error.response.data;
    }
}

const getTopProduce = async () => {
    try {
        return await api.get(`${baseURL}?topRated=true`);
    } catch (error) {
        console.error('Error fetching top produce:', error);
        throw error.response.data;
    }
};

const getLatestProduce = async () => {
    try {
        return await api.get(`${baseURL}?latestUpdated=true`);
    } catch (error) {
        console.error('Error fetching latest produce:', error);
        throw error.response.data;
    }
};

const getLatestCreatedProduce = async () => {
    try {
        return await api.get(`${baseURL}?latestCreated=true`);
    } catch (error) {
        console.error('Error fetching latest produce:', error);
        throw error.response.data;
    }
};

export default { getAll, getById, getByStore, create,getTopProduce,getLatestProduce, getLatestCreatedProduce };