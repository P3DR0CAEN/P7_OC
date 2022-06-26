import axios from "axios";

export default function like(id) {
    return axios.post("post/like/" + id);
}
