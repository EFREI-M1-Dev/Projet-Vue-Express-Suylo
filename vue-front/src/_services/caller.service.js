import axios from 'axios'

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
    headers: {
        common: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
})

export default Axios