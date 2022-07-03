import axios from "@/lib/axios";

export default function (id) {
    return axios().post("post/comment/delete/" + id);
}
