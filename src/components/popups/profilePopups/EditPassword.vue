<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div>
      <div class="px-7 mt-6">
        <Arrow @click="showProfile" />
      </div>
      <Form @submit="onSubmit">
        <div v-show="submitPassword === false">
          <div class="bg-[#24222F] px-8 py-8">
            <div class="mt-5 bg-[#11101A] rounded flex flex-col px-6 py-6">
              <h2 class="text-white text-xl">
                {{ $t("profile.password_warn") }}
              </h2>
              <span class="text-white text-base"
                >8 {{ $t("profile.password_character_number") }}</span
              >
              <span class="text-white text-base"
                >15 {{ $t("profile.lowercase_character") }}</span
              >
            </div>
            <div class="flex items-center mt-5">
              <div class="w-full relative">
                <label class="text-white text-xl">{{
                  $t("profile.new_password")
                }}</label>
                <Field
                  :type="changePasswordType"
                  rules="required"
                  name="password"
                  class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                />
                <ErrorMessage
                  class="text-red-500 border-rose-600"
                  name="password"
                />
                <HidePassword
                  v-if="changePasswordType === 'password'"
                  @click="switchChangePassword"
                  class="absolute cursor-pointer top-14 right-4"
                />
                <ShowPassword
                  v-else
                  @click="switchChangePassword"
                  class="absolute cursor-pointer w-[15px] top-14 right-4"
                />
              </div>
            </div>
            <div class="flex items-center mt-5">
              <div class="w-full relative">
                <label class="text-white text-xl">{{
                  $t("profile.confirm_password")
                }}</label>
                <Field
                  :type="confirmPasswordType"
                  rules="required|confirmed:@password"
                  name="password_confirmation"
                  class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                />
                <ErrorMessage
                  class="text-red-500 border-rose-600"
                  name="password_confirmation"
                />
                <HidePassword
                  v-if="confirmPasswordType === 'password'"
                  @click="switchConfirmPassword"
                  class="absolute cursor-pointer top-14 right-4"
                />
                <ShowPassword
                  v-else
                  @click="switchConfirmPassword"
                  class="absolute cursor-pointer w-4 top-14 right-4"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between px-8 mt-24 items-center">
            <span @click="showProfile" class="text-white text-base">{{
              $t("profile.cancell")
            }}</span>
            <base-button>{{ $t("profile.add") }}</base-button>
          </div>
        </div>
        <div v-show="submitPassword">
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
              <base-button type="button" @click="updatePassword">{{
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
import HidePassword from "@/components/svg/HidePassword.vue";
import ShowPassword from "@/components/svg/ShowPassword.vue";

import { Form, Field, ErrorMessage } from "vee-validate";
import router from "@/router";
import { ref } from "vue";
import axiosInstance from "@/config/axios/store";

const submitPassword = ref(false);
const changePasswordType = ref("password");
const confirmPasswordType = ref("password");
const data = ref({});

const switchChangePassword = () =>
  (changePasswordType.value =
    changePasswordType.value === "password" ? "text" : "password");
const switchConfirmPassword = () =>
  (confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password");

const onSubmit = async (values) => {
  submitPassword.value = true;
  data.value = values;
};

const showProfile = () => {
  router.push({ name: "profile" });
};
const updatePassword = async () => {
  router.push({ name: "success-popup" });
  try {
    await axiosInstance.post(`updatecruds`, {
      password: data.value.password,
      password_confirmation: data.value.password_confirmation,
    });
  } catch (error) {
    submitPassword.value = false;
    console.log(error);
  }
};
</script>
