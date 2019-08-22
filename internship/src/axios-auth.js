import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost/projects/api/'
})

export default instance;