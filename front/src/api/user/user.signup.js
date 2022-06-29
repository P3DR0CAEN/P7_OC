import axios from "axios";

export default async function register(data) {
    return await axios.post("user/signup", data);
}
