import axios from "@/lib/axios";

export default function remove(id) {
    return axios().post("post/delete/" + id);
}
