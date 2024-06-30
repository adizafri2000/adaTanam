import api from './api.jsx';
const baseUrl = `/carts`;
const cartItemUrl = `/cart-items`;

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

const createCart = async (token, data) => {
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

const updateCart = async (token, cartId, data) => {
    try {
        return await api.put(`${baseUrl}/${cartId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

const getCartItems = async (cartId) => {
    try {
        return await api.get(`${cartItemUrl}/${cartId}`);
    } catch (error) {
        throw error.response.data;
    }
}

const addCartItem = async (token, data) => {
    try {
        return await api.post(`${cartItemUrl}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

const updateCartItem = async (token, cartId, produceId, data) => {
    try {
        return await api.put(`${cartItemUrl}?cartId=${cartItemId}&produceId=${produceId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

export default { getAll, getById, getByAccount, createCart, updateCartItem, addCartItem, getCartItems,updateCart };
