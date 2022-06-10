import { createRouter, createWebHistory } from "vue-router";
import auth from "@/views/auth.vue";
import profile from "@/views/profile.vue";

const routes = [
    {
        name: "auth",
        path: "/",
        meta: {
            layout: "blank",
            class: "Page_Auth",
        },
        component: auth,
    },
    {
        name: "profile",
        path: "/profile",
        meta: {
            class: "Page_Profile",
        },
        component: profile,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
