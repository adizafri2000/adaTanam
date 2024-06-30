import api from './api.jsx';
const baseUrl = `/accounts`;


const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Update account details
 * @param id
 * @param data
 * @param token
 * @param imageFile
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const update = async (id, data, token, imageFile) => {
    try {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        formData.append('account', blob);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const config = {
            method: 'put',
            url: `${baseUrl}/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        };

        console.log('config setup: ', config);
        console.log('form data: ', formData);
        return await api(config);
    } catch (error) {
        console.log('error updating account: ', error);
        throw error.response.data;
    }
};

/**
 * Get all carts for the account
 * @param accountId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAccountCarts = async (accountId) => {
    try {
        return await api.get(`${baseUrl}/${accountId}/carts`);
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Get the active cart for the account
 * @param accountId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAccountActiveCart = async (accountId) => {
    try {
        return await api.get(`${baseUrl}/${accountId}/carts/active`);
    } catch (error) {
        throw error.response.data;
    }
}

export default {  getById, update, getAccountCarts, getAccountActiveCart };
