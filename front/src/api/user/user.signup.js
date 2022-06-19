import axios from "axios";
import apiLogin from "./user.login";

function register(data) {
    axios
        .post("user/signup", data)
        .then((response) => {
            apiLogin(data);
            return;
        })
        .catch((error) => {
            document.getElementById("respError").innerHTML =
                error.response.data.error;
        });
}

export default register;
