import axios from "axios";
import router from "../../router";

function login(data) {
    axios
        .post("user/login", data)
        .then((response) => {
            const authToken = response.data.token;
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + authToken;
            localStorage.setItem("AuthToken", "Bearer " + authToken);
            router.push({ name: "home" });
            return;
        })
        .catch((error) => {
            if (typeof error.response !== "undefined") {
                document.getElementById("respError").innerHTML =
                    error.response.data.error;
            } else {
                document.getElementById("respError").innerHTML =
                    "Une erreur est survenue !";
            }
        });
}

export default login;
