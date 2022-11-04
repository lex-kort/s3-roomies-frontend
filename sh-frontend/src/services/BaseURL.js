import axios from "axios";

const url = 
    axios.create({
        baseURL : "http://localhost:8080/api"
    })

export default url;