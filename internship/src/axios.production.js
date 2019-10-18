import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://localhost/php-projects/api/'
    baseURL: 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
})
export default instance;