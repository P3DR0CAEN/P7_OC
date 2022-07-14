import axios from "@/lib/axios";

export default function update(id, data) {
    return axios().put("post/update/" + id, data, {
        headers: {
            "Content-Type": `multipart/form-data`,
        },
    });
}
