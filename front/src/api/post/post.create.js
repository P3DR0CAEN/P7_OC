import axios from "@/lib/axios";

export default function create(data) {
    console.log(data); // fail tests Unit
    const data2 = {
        content: "test de post 1",
        image: undefined,
    };
    console.log(data2);
    return axios().post("post/create", data, {
        headers: {
            "Content-Type": `multipart/form-data`,
        },
    });
}
