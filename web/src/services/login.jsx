import axios from 'axios'
const host = import.meta.env.VITE_VM_IP
// const baseUrl = `http://${host}/api/accounts/login`
const baseUrl = '/api/accounts/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }