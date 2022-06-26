import axios from "axios";

export default async function getAll() {
    return await axios.get("post/get");
}
