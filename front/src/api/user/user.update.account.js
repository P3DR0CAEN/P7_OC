import axios from "axios";
import { useStoreUser } from "../../store";

const user = useStoreUser();

function update(data) {
    axios
        .put("user/account", data, {
            headers: {
                "Content-Type": `multipart/form-data`,
            },
        })
        .then((response) => {
            console.log(response.data.message);
            user.updateUserInfos();
        })
        .catch((error) => {
            console.log(error);
        });
}

export default update;
