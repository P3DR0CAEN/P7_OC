import axios from "axios";

export default function getFromUser(id) {
    console.log("id : " + id);
    return axios.get("user/profil/" + id);
}
