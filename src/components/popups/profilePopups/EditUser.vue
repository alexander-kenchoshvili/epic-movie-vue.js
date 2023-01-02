<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div>
      <div class="px-7 mt-6">
        <Arrow @click="showProfile" />
      </div>
      <Form @submit="onSubmit">
        <div v-show="submitUser === false">
          <div
            class="bg-[#24222F] flex flex-col px-8 pt-8 pb-12 mt-6 rounded-md"
          >
            <label class="text-white text-base">
              {{ $t("profile.enter_new_username") }}</label
            >
            <Field
              name="username"
              rules="required|min:3"
              type="text"
              class="mt-2 px-2 py-3 rounded outline-none"
            />
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="username"
            />
          </div>
          <div class="flex justify-between px-8 mt-24 items-center">
            <span @click="showProfile" class="text-white text-base">{{
              $t("profile.cancell")
            }}</span>
            <base-button>{{ $t("profile.add") }}</base-button>
          </div>
        </div>
        <div v-show="submitUser">
          <div class="bg-popup mt-16">
            <h2 class="text-white text-center py-11 text-base">
              {{ $t("profile.are_you_sure") }}
            </h2>
            <div
              class="flex justify-between px-8 pt-5 pb-4 border-t border-[#CED4DA] items-center"
            >
              <span @click="showProfile" class="text-white text-base">{{
                $t("profile.cancell")
              }}</span>
              <base-button type="button" @click="updateUser">{{
                $t("profile.confirm")
              }}</base-button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import Arrow from "@/components/svg/WhiteArrow.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import router from "@/router";
import { ref } from "vue";
import axiosInstance from "@/config/axios/store";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";
import i18n from "@/i18n/index.js";

const locale = computed(() => {
  return i18n.global.locale;
});

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const submitUser = ref(false);
const data = ref({});
const myActions = ref(undefined);
const onSubmit = async (values, actions) => {
  submitUser.value = true;
  data.value = values;
  myActions.value = actions;
};

const showProfile = () => {
  if (userInformation.value.email_verified_at === null) {
    router.push({ name: "google-profile" });
  } else {
    router.push({ name: "profile" });
  }
};
const updateUser = async () => {
  try {
    await axiosInstance.post(`updatecruds`, {
      username: data.value.username,
    });
    userdata.userinfo();
    router.push({ name: "success-popup" });
  } catch (error) {
    submitUser.value = false;
    if (locale.value === "ka") {
      myActions.value.setFieldError("username", "სახელი უკვე არსებობს");
    } else {
      myActions.value.setFieldError(
        "username",
        error.response.data.errors.username
      );
    }
    console.log(error);
  }
};
</script>
