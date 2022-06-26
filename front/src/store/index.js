import { defineStore } from "pinia";
import router from "../router";
import axios from "axios";

export const useStoreUser = defineStore("User", {
    // arrow function recommended for full type inference
    state: () => {
        return {
            data: undefined,
        };
    },
    actions: {
        refresh() {
            axios
                .get("user/account")
                .then((response) => {
                    this.data = {
                        id: response.data.id,
                        firstname: response.data.firstname,
                        lastname: response.data.lastname,
                        email: response.data.email,
                        image: response.data.image,
                    };
                })
                .catch((error) => {
                    router.push("/auth");
                });
        },
    },
});
