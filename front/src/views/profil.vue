<script setup>
import { ref, reactive } from "vue";
import router from "../router";
import axios from "axios";
import { onMounted } from "vue";

const user = ref({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    image: undefined,
});

function getUserInfos() {
    axios
        .get("user/account")
        .then((response) => {
            user.value.firstName = response.data.firstName;
            user.value.lastName = response.data.lastName;
            user.value.email = response.data.email;
            user.value.image = response.data.image;
        })
        .catch((error) => {
            router.push("/auth");
        });
}

onMounted(() => {
    getUserInfos();
});
</script>

<template>
    <div class="content">
        <div class="profil__banner">
            <div class="profil__picture">
                <img
                    :src="'http://localhost:4000/images/users/' + user.image"
                    alt=""
                />
            </div>
            <div class="profil__name">
                {{ user.firstName }} {{ user.lastName }}
            </div>
        </div>
        <div class="post_list">
            <div class="post">
                <div class="post__left">
                    <div class="user_icon">
                        <i class="las la-user-circle"></i>
                    </div>
                </div>
                <div class="post__content">
                    <div class="post__content__user_name">Nom Prénom</div>
                    <div class="post__content__text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div class="post__content__actions">
                        <div class="post__content__actions__like">
                            <i class="las la-thumbs-up"></i>
                        </div>
                        <div class="post__content__actions__comment">
                            <i class="las la-comment-alt"></i>
                        </div>
                        <div class="post__content__actions__share">
                            <i class="las la-share"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post">
                <div class="post__left">
                    <div class="user_icon">
                        <i class="las la-user-circle"></i>
                    </div>
                </div>
                <div class="post__content">
                    <div class="post__content__user_name">Nom Prénom</div>
                    <div class="post__content__text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div class="post__content__actions">
                        <div class="post__content__actions__like">
                            <i class="las la-thumbs-up"></i>
                        </div>
                        <div class="post__content__actions__comment">
                            <i class="las la-comment-alt"></i>
                        </div>
                        <div class="post__content__actions__share">
                            <i class="las la-share"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post">
                <div class="post__left">
                    <div class="user_icon">
                        <i class="las la-user-circle"></i>
                    </div>
                </div>
                <div class="post__content">
                    <div class="post__content__user_name">Nom Prénom</div>
                    <div class="post__content__text">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div class="post__content__actions">
                        <div class="post__content__actions__like">
                            <i class="las la-thumbs-up"></i>
                        </div>
                        <div class="post__content__actions__comment">
                            <i class="las la-comment-alt"></i>
                        </div>
                        <div class="post__content__actions__share">
                            <i class="las la-share"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
