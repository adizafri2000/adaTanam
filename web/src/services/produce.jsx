import axios from 'axios'
const host = import.meta.env.VITE_API_URL
const baseUrl = `${host}/produce`

const getAll = async () => {
    console.log(`accessing ${baseUrl}`);
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll }
