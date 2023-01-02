<template>
  <Popup>
    <div class="w-[360px]">
      <h2
        class="text-white text-2xl sm:text-3xl font-['regular'] font-bold flex justify-center"
      >
        {{ $t("auth.authorize") }}
      </h2>
      <span
        class="text-[#6C757D] font-['regular'] font-bold flex justify-center text-base pt-3"
        >{{ $t("auth.enter_details") }}.</span
      >
      <div class="mt-6">
        <Form @submit="onSubmit">
          <base-input
            name="username"
            rules="required|min:3"
            :label="$t('auth.email')"
            type="text"
            :placeholder="$t('auth.register_email_placeholder')"
          ></base-input>
          <div class="mt-4 relative">
            <label
              class="text-white text-[16px] font-['regular'] font-bold"
              for=""
              >{{ $t("auth.password") }}</label
            >
            <Field
              name="password"
              rules="required|min:8|max:15|lowerCase_and_numbers"
              v-slot="{ field, meta }"
            >
              <input
                v-bind="field"
                class="w-full mt-2 font-['regular'] font-bold rounded bg-[#CED4DA] border border-[#CED4DA] text-base text-[#6C757D] outline-none py-2 pl-3"
                :type="passwordFieldType"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-[#E31221] border-2'
                    : '',
                  meta.valid && meta.touched ? 'border-[#198754] border-2' : '',
                ]"
                v-model="password"
                :placeholder="$t('auth.password')"
              />
              <ValidIcon
                v-if="meta.valid && meta.touched"
                class="absolute top-11 right-8"
              />
              <InvalidIcon
                v-if="!meta.valid && meta.touched"
                class="absolute top-11 right-8"
              />
            </Field>
            <ErrorMessage
              class="text-red-500 border-rose-600"
              name="password"
            />
            <HidePassword
              v-if="passwordFieldType === 'password'"
              @click="switchVisibility"
              class="absolute top-12 cursor-pointer right-4"
            />
            <ShowPassword
              v-else
              @click="switchVisibility"
              class="absolute cursor-pointer w-4 top-10 right-4"
            />
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="flex items-center min-w-fit">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                v-model="rememberMe"
                true-value="yes"
                false-value="no"
              />
              <label
                class="text-white text-base font-['regular'] ml-2 font-bold"
                for=""
              >
                {{ $t("auth.remember_me") }}</label
              >
            </div>
            <span
              @click="showResetPassword"
              class="text-[#0D6EFD] text-base whitespace-nowrap cursor-pointer font-['regular'] font-bold"
              >{{ $t("auth.forget_password") }}</span
            >
          </div>

          <base-button class="mt-6 w-full font-['regular'] font-bold ml-0">{{
            $t("auth.login")
          }}</base-button>
        </Form>
        <form :action="googleUrl">
          <base-button
            class="mt-4 w-full ml-0 font-['regular'] font-bold !bg-transparent border border-white flex items-center justify-center"
          >
            <GoogleIcon class="mr-2" />
            {{ $t("auth.google_sign_in") }}</base-button
          >
        </form>
      </div>
      <h2 class="text-[#6C757D] mt-8 font-bold font-[regular] text-base">
        {{ $t("auth.dont_have_account") }}?
        <span
          @click="showRegister"
          class="text-[#0D6EFD] cursor-pointer font-bold font-[regular] text-base"
        >
          {{ $t("auth.sign_up") }}</span
        >
      </h2>
    </div>
  </Popup>
</template>

<script setup>
import Popup from "@/components/ui/BasePopup.vue";
import axiosInstance from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
import GoogleIcon from "@/components/svg/GoogleIcon.vue";
import HidePassword from "@/components/svg/HidePassword.vue";
import ShowPassword from "@/components/svg/ShowPassword.vue";
import ValidIcon from "@/components/svg/ValidIcon.vue";
import InvalidIcon from "@/components/svg/InvalidIcon.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import router from "@/router";

const password = ref("");
const passwordFieldType = ref("password");
const rememberMe = ref(null);
const authStore = useAuthStore();

const switchVisibility = () =>
  (passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password");

const showRegister = () => {
  router.push({ name: "register" });
};
const showResetPassword = () => {
  router.push({ name: "reset-password" });
};

const googleUrl = import.meta.env.VITE_API_GOOGLE_URL;
const onSubmit = async (values, actions) => {
  try {
    await axiosInstance.post(`/login`, {
      username: values.username,
      password: values.password,
      remember: rememberMe.value,
    });
    authStore.authenticated = true;
    router.push({ name: "news-feed" });
  } catch (error) {
    actions.setFieldError("username", error.response.data.errors.username);
    actions.setFieldError("password", error.response.data.errors.password);
  }
};
</script>
