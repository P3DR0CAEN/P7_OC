import axios from "@/lib/axios";

export default function create(data) {
    return axios().post("post/create", data, {
        headers: {
            "Content-Type": `multipart/form-data`,
        },
    });
}
