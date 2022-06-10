<script setup>
const user = {
    prenom: undefined,
    nom: undefined,
    email: undefined,
    photo: undefined,
};
</script>

<template>
    <div class="card">
        <h1 class="card__title">Espace Perso</h1>
        <p class="card__subtitle">Voilà donc qui je suis...</p>
        <p>{{ user.prenom }} {{ user.nom }} {{ user.email }}</p>
        <img :src="user.photo" />
        <div class="form-row">
            <button @click="" class="button">Déconnexion</button>
        </div>
    </div>
</template>
