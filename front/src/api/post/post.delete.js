import axios from "axios";

export default function create(id) {
    return axios.post("post/delete/" + id);
}
