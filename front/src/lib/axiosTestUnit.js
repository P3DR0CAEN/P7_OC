import axios from "axios";

export default function (authToken) {
    return axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
}
