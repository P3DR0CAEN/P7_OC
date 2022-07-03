import axios from "@/lib/axios";

export default async function getAll() {
    return await axios().get("post/get");
}
