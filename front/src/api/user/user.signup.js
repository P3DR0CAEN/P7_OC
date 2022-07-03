import axios from "@/lib/axios";

export default async function register(data) {
    return await axios().post("user/signup", data);
}
