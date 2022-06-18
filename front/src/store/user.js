import { defineStore } from "pinia";
import { Router } from "vue-router";

export const useStoreUser = defineStore("StoreUser", {
    // arrow function recommended for full type inference
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            image: undefined,
        };
    },
    actions: {
        updateUserInfos() {
            axios
                .get("user/account")
                .then((response) => {
                    this.firstName = response.data.firstName;
                    this.lastName = response.data.lastName;
                    this.email = response.data.email;
                    this.image = response.data.image;
                })
                .catch((error) => {
                    router.push("/auth");
                });
        },
    },
});
