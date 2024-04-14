import axios from 'axios'
const host = import.meta.env.API_URL
const baseUrl = `${host}/accounts/login`
//const baseUrl = '/accounts/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }
