import axios from "@/lib/axios";

export default function update(data) {
    return axios().post("post/comment/update/" + data.commentId, data);
}
