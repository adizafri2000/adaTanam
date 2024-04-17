import axios from 'axios'
const host = import.meta.env.VITE_API_URL
const baseUrl = `${host}/accounts/signup`

const signup = async data => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

export default { signup }
