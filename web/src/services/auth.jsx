import api from './api.jsx'
const baseURL = '/auth'

const login = async credentials => {
    try {
        return await api.post(`${baseURL}/login`, credentials);
    } catch (error) {
        console.log('error on login API: ', error)
        throw error.response.data;
    }
}

const signup = async data => {
    try {
        return await api.post(`${baseURL}/signup`, data);
    } catch (error) {
        console.error('Error signing up:', error);
        throw error.response.data;
    }
}

const confirmAccount = async token => {
    try {
        return await api.get(`${baseURL}/confirm-account?token=${token}`);
    } catch (error) {
        console.error('Error confirming account:', error);
        throw error.response.data;
    }
}

const resendConfirmationEmail = async data => {
    try {
        return await api.post(`${baseURL}/resend-confirmation`, data);
    } catch (error) {
        console.error('Error resending confirmation email:', error);
        throw error.response.data;
    }
}

const forgotPassword = async data => {
    try {
        return await api.post(`${baseURL}/forgot-password`, data);
    } catch (error) {
        console.error('Error sending forgot password email:', error);
        throw error.response.data;
    }
}

const resetPassword = async (token, data) => {
    try {
        return await api.post(`${baseURL}/reset-password`, data, {
            headers: {
                Authorization: `${token}`
            }
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error.response.data;
    }
}

const auth = { login, signup, confirmAccount, resendConfirmationEmail, forgotPassword, resetPassword }
export default auth