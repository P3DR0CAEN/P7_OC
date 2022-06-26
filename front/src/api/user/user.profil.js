import axios from "axios";

export default function getFromUser(id) {
    return axios.get("user/profil/" + id);
}
