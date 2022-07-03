import axios from "@/lib/axios";

export default async function account() {
    return axios().get("user/account");
}
