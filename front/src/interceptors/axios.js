import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/";

if (localStorage.getItem("AuthToken")) {
    axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("AuthToken");
}
