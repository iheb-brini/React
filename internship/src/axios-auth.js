import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost/php-projects/api/'
})

export default instance;