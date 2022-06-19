import axios from "axios";

function getAll() {
    axios
        .get("post/get")
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default getAll;
