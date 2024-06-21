import api from './api.jsx';
// import { useContext } from 'react';
// import UserContext from '../contexts/UserContext.jsx';

const baseURL = `/produce`;

// const useApi = () => {
//     const { refreshToken } = useContext(UserContext);
//     return api(refreshToken);
// };

const getAll = async () => {
    // const apiInstance = api();

    try {
        return await api.get(`${baseURL}`);
    } catch (error) {
        console.log('Error fetching produce:', error);
        throw error.response.data;
    }
};

const getById = async (id) => {
    // const apiInstance = api();

    try {
        return await api.get(`${baseURL}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

const getByStore = async (storeId) => {
    // const apiInstance = api();

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

        return await api(config);
    } catch (error) {
        console.error('Error creating produce:', error);
        throw error.response.data;
    }
}

export default { getAll, getById, getByStore, create };