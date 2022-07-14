import axios from "@/lib/axios";

export default function update(id, data) {
    return axios().post("post/comment/update/" + id, data);
}
