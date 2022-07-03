import axios from "@/lib/axios";

export default function like(id) {
    return axios().post("post/like/" + id);
}
