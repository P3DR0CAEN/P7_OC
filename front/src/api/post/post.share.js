import axios from "axios";

export default function share(id) {
    return axios.post("post/share/" + id);
}
