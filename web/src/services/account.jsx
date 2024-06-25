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
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('account', blob, 'account.json');
        formData.append('image', imageFile);
        const config = {
            method: 'put',
            url: `${baseUrl}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        };
        return await api(config);
    } catch (error) {
        console.log('error updating acount: ', error)
        throw error.response.data;
    }
}


export default {  getById, update };
