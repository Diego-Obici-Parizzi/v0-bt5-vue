import axios from "axios";
//import VueAxios from 'vue-axios'

const baseURL = "http://localhost:3000";

const instance = axios.create({
    baseURL,
    });

    export default instance;