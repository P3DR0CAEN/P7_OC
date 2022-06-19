import axios from "axios";

export default function create(data) {
    axios
        .post("post/create", data, {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        })
        .then((response) => {
            return;
        })
        .catch((error) => {
            console.log(error);
        });
}
