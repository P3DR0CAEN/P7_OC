<script setup>
import { ref, reactive } from "vue";
import { useStoreUser } from "../store";
import apiPostCreate from "../api/post/post.create";

const user = useStoreUser();

const NewPost = reactive({
    content: undefined,
});

function CreatePost() {
    var uploadPostImage = document.querySelector("#post_image");

    const data = {
        content: NewPost.content,
        UploadDestination: "post",
        image: uploadPostImage.files[0],
    };

    apiPostCreate(data);
}
</script>

<template>
    <div class="content">
        <div class="new_post">
            <div class="new_post__left">
                <div class="user_icon">
                    <img
                        :src="
                            'http://localhost:4000/images/users/' + user.image
                        "
                        alt=""
                    />
                </div>
            </div>
            <div class="new_post__content">
                <textarea
                    cols="30"
                    rows="5"
                    v-model="NewPost.content"
                ></textarea>
                <input
                    type="file"
                    hidden
                    name="post_image"
                    id="post_image"
                    style="flex: inherit"
                />
                <div class="new_post__actions">
                    <div class="icons">
                        <label for="post_image"
                            ><i class="las la-image"></i
                        ></label>
                        <i class="las la-smile"></i>
                    </div>
                    <button class="button" @click="CreatePost()">Poster</button>
                </div>
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
