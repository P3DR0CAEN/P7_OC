import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home.vue";
import auth from "@/views/auth.vue";
import profil from "@/views/profil.vue";
import settings from "@/views/settings.vue";

const routes = [
    {
        name: "auth",
        path: "/auth",
        meta: {
            layout: "blank",
            class: "Page_Auth",
        },
        component: auth,
    },
    {
        name: "profil",
        path: "/profil/:id?",
        meta: {
            class: "Page_Profil",
        },
        component: profil,
    },
    {
        name: "settings",
        path: "/settings",
        meta: {
            class: "Page_Settings",
        },
        component: settings,
    },
    {
        name: "home",
        path: "/",
        meta: {
            class: "Page_Home",
        },
        component: home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
