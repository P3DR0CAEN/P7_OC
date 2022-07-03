import axios from "@/lib/axios";

export const GetUserProfil = (id) => {
    return axios().get("user/getProfil/" + id);
};

export const GetUserPosts = (id) => {
    return axios().get("user/getPosts/" + id);
};
