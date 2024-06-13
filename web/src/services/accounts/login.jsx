import axios from 'axios'
const host = import.meta.env.VITE_API_URL
const baseUrl = `${host}/accounts/login`

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response
}

export default { login }
