import axios from "@/lib/axios";

export default function update(data) {
    return axios().put("post/update/" + data.postId, data, {
        headers: {
            "Content-Type": `multipart/form-data`,
        },
    });
}
