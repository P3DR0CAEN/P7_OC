import axios from "@/lib/axios";

export default function share(id) {
    return axios().post("post/share/" + id);
}
