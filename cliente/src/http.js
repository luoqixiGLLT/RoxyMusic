import axios from "axios";

const baseURL = 'http://localhost:3242/'

const http = {
    get: async (url, params) => {
        return await axios.get(baseURL + url, {params})
    },
    post: async (url, data) => {
        return await axios.post(baseURL + url, data)
    },
    put: async (url, data) => {
        return await axios.put(baseURL + url, data)
    },
    delete: async (url, params) => {
        return await axios.delete(baseURL + url, {params})
    }
}

export default http