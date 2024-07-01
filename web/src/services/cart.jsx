import api from './api.jsx';
const baseUrl = `/carts`;
const cartItemUrl = `/cartitems`;

/**
 * Get all carts
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAll = async () => {
    try {
        return await api.get(`${baseUrl}`);
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Get single cart by id
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getById = async (id) => {
    try {
        return await api.get(`${baseUrl}/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

/**
 * Create a new cart for an account
 * @param token
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
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

/**
 * Update cart of account based on cart id
 * @param token
 * @param cartId
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
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

/**
 * Get all items in a cart
 * @param cartId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getCartItems = async (cartId) => {
    try {
        return await api.get(`${cartItemUrl}?cartId=${cartId}`);
    } catch (error) {
        throw error.response.data;
    }
}

/**
 * Add a new item to a cart
 * @param token
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
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

/**
 * Get single item in cart based on the cart id and produce id
 * @param cartId
 * @param produceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getCartItem = async (cartId, produceId) => {
    try {
        return await api.get(`${cartItemUrl}?cartId=${cartId}&produceId=${produceId}`);
    } catch (error) {
        throw error.response.data;
    }
}

/**
 * Update a single cart item
 * @param token
 * @param cartId
 * @param produceId
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const updateCartItem = async (token, cartId, produceId, data) => {
    try {
        console.log('data debug updateCartItem: ', data)
        return await api.put(`${cartItemUrl}?cartId=${cartId}&produceId=${produceId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.log(error)
        throw error.response.data;
    }
}

/**
 * Delete item in cart
 * @param token
 * @param cartId
 * @param produceId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const deleteCartItem = async (token, cartId, produceId) => {
    try {
        return await api.delete(`${cartItemUrl}?cartId=${cartId}&produceId=${produceId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw error.response.data;
    }
}

export default { getAll, getById, createCart, updateCartItem, addCartItem, getCartItems,updateCart, deleteCartItem, getCartItem };
