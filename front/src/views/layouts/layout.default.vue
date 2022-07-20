<script setup>
import CHeader from "@/views/components/header.vue";
import CFooter from "@/views/components/footer.vue";
import { RouterLink } from "vue-router";
import router from "../../router";
import { useStoreUser } from "../../store";

defineProps({
    mainClass: String,
});

const authUser = useStoreUser();

authUser.refresh();

function logout() {
    localStorage.removeItem("AuthToken");
    router.push("/auth");
    return;
}
</script>

<template>
    <div v-if="authUser.data === undefined">chargement de la page</div>
    <div v-else-if="authUser.data == null"></div>
    <div v-else>
        <c-header></c-header>
        <main :class="mainClass">
            <div class="leftSidebar">
                <div class="leftSidebar__content">
                    <div class="user_icon">
                        <img :src="authUser.data.image" alt="" />
                    </div>
                    <div class="name">
                        <span>
                            {{ authUser.data.firstname }}
                            {{ authUser.data.lastname }}
                        </span>
                        <hr />
                        {{ authUser.data.email }}
                    </div>
                    <div class="menu">
                        <RouterLink class="c-button" :to="{ name: 'home' }">
                            <div class="left">Accueil</div>
                            <div class="right">
                                <i class="las la-home"></i>
                            </div>
                        </RouterLink>
                        <a
                            :href="'/profil/' + authUser.data.id"
                            class="c-button"
                        >
                            <div class="left">Profil</div>
                            <div class="right">
                                <i class="las la-user"></i>
                            </div>
                        </a>
                        <RouterLink class="c-button" :to="{ name: 'settings' }">
                            <div class="left">Paramètres</div>
                            <div class="right">
                                <i class="las la-cog"></i>
                            </div>
                        </RouterLink>
                        <div @click="logout" class="c-button">
                            <div class="left">Déconnexion</div>
                            <div class="right">
                                <i class="las la-power-off"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <slot />
            </div>
            <div class="rightSidebar"></div>
        </main>
        <div class="mobile-menu">
            <RouterLink class="c-mobile-button" :to="{ name: 'home' }">
                <div class="icon">
                    <i class="las la-home"></i>
                </div>
                <div class="text">Accueil</div>
            </RouterLink>
            <RouterLink class="c-mobile-button" :to="{ name: 'profil' }">
                <div class="icon">
                    <i class="las la-user"></i>
                </div>
                <div class="text">Profil</div>
            </RouterLink>
            <RouterLink class="c-mobile-button" :to="{ name: 'settings' }">
                <div class="icon">
                    <i class="las la-cog"></i>
                </div>
                <div class="text">Paramètres</div>
            </RouterLink>
            <div @click="logout" class="c-mobile-button">
                <div class="icon">
                    <i class="las la-power-off"></i>
                </div>
                <div class="text">Déconnexion</div>
            </div>
        </div>
        <c-footer />
    </div>
</template>
