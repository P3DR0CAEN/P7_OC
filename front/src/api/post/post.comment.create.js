import axios from "@/lib/axios";

export default function create(data) {
    return axios().post("post/comment/create", data);
}
