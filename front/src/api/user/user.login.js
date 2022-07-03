import axios from "@/lib/axios";

export default async function login(data) {
    return await axios().post("user/login", data);
}
