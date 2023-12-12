import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        common: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
    }
})

export default Axios