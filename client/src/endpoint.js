import axios from "axios";

const EndPoint = axios.create({
    baseURL: "http://localhost:8000",
});

export default EndPoint;
