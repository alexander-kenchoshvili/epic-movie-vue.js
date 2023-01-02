<template>
  <div class="bg-[#11101A] rounded-xl px-6 pt-6 pb-10 mb-10">
    <div class="flex items-center">
      <div class="w-14 h-14 rounded-full">
        <img
          class="w-full h-full rounded-full object-cover"
          :src="quote.user.thumbnail"
          alt="author"
        />
      </div>
      <span class="text-white text-base sm:text-xl font-normal ml-4">{{
        quote.user.username
      }}</span>
    </div>
    <div class="mt-4">
      <h2 class="text-white text-xs sm:text-xl font-normal">
        {{ quote.quote[locale] }}
        <span class="text-[#DDCCAA]">
          - {{ quote.movie.director[locale] }}</span
        >
      </h2>
    </div>
    <div class="rounded-[10px] mt-7">
      <img
        class="w-full min-h-[500px] object-cover"
        :src="backUrl + quote.thumbnail"
        alt=""
      />
    </div>
    <div class="mt-6 flex border-[#efefef] border-b pb-6">
      <div class="flex items-center">
        <span class="text-white">{{ props.quote.comments.length }}</span>
        <Message class="ml-3" />
      </div>
      <div class="flex items-center ml-6">
        <span class="text-white">{{ props.quote.likes.length }}</span>
        <Like
          :like="props.quote.likes"
          @click="likeHandler"
          class="ml-3 cursor-pointer"
          :active="activeLike"
        />
      </div>
    </div>
    <Comment
      v-for="comment in quote.comments"
      :key="comment.id"
      :comments="comment"
    />
    <div class="mt-6">
      <div class="flex items-center w-full">
        <img
          class="w-14 h-14 rounded-full"
          :src="userInformation.thumbnail"
          alt="avatar"
        />
        <Form @submit="onSubmit" class="w-full">
          <Field
            name="comment"
            v-model="commentValue"
            cols="30"
            rows="1"
            :placeholder="$t('layout.write_comment')"
            class="rounded-[10px] bg-[#24222F] pl-3 py-2 text-sm sm:text-base outline-none ml-3 resize-none w-full text-white"
          />
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Message from "@/components/svg/MessageIcon.vue";
import Like from "@/components/svg/LikeIcon.vue";
import Comment from "@/components/ui/quoteUI/CommentComponent.vue";
import axiosInstance from "@/config/axios/store";
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import { useUserInfo } from "@/stores/useUserInfo";
import { useNotification } from "@/stores/useNotification.js";
import i18n from "@/i18n/index.js";
import { computed } from "vue";

const locale = computed(() => {
  return i18n.global.locale;
});

const notificationStore = useNotification();

const userdata = useUserInfo();

const userInformation = computed(() => userdata.user);

const backUrl = import.meta.env.VITE_BACK_ROOT_URL;

const props = defineProps({
  quote: {
    type: Object,
  },
});
const commentValue = ref("");

const activeLike = ref(false);

const like = () => {
  if (props.quote.likes) {
    props.quote.likes.forEach((like) => {
      if (
        like.user_id === userInformation.value.id &&
        like.quote_id === props.quote.id
      ) {
        activeLike.value = true;
      }
    });
  }
  return activeLike.value;
};

setTimeout(() => {
  like();
}, 200);

const onSubmit = async (values) => {
  try {
    await axiosInstance.post(`/comment/${props.quote.id}`, {
      body: values.comment,
      to: props.quote.user.id,
      from: userInformation.value.id,
      type: "comment",
    });
    commentValue.value = "";
    notificationStore.notifications();
  } catch (error) {
    console.log(error);
  }
};
const likeHandler = async () => {
  try {
    const response = await axiosInstance.post(`/like/${props.quote.id}`, {
      to: props.quote.user.id,
      from: userInformation.value.id,
      type: "like",
    });
    notificationStore.notifications();

    if (response.data === "delete") {
      activeLike.value = false;
    } else {
      activeLike.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
