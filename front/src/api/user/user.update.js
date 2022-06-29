import axios from "axios";

export default function update(data) {
    return axios.put("user/account", data, {
        headers: {
            "Content-Type": `multipart/form-data`,
        },
    });
}
