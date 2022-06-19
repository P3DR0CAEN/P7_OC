import axios from "axios";

function getFromUser(id) {
    axios
        .get("post/get/" + id)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default getFromUser;
