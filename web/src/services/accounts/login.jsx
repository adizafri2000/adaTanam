import axios from 'axios'

const host = import.meta.env.VITE_API_URL
const baseUrl = `${host}auth/login`

const login = async credentials => {
    return await axios.post(baseUrl, credentials)
}

export default { login }
