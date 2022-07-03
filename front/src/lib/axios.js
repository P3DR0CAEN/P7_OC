import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000/api/";

// if (localStorage.getItem("AuthToken")) {
//     axios.defaults.headers.common["Authorization"] =
//         localStorage.getItem("AuthToken");
// }

export default function () {
    const authToken = localStorage.getItem("AuthToken");
    return axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
            Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
    });
}
