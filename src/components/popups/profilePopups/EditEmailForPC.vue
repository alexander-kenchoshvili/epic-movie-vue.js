<template>
  <div>
    <NewEmail>
      <div class="w-[615px]">
        <div class="px-8 py-6 border-b border-[#CED4DA]">
          <h2 class="text-white text-2xl">{{ $t("profile.add_new_email") }}</h2>
        </div>
        <Form @submit="onSubmit">
          <div class="px-8 flex flex-col mt-16">
            <label class="text-white text-base">{{
              $t("profile.new_email")
            }}</label>
            <Field
              class="mt-2 px-4 py-2 rounded"
              type="email"
              name="email"
              rules="required|email"
              :placeholder="$t('profile.enter_new_email')"
            />
            <ErrorMessage class="text-red-500 border-rose-600" name="email" />
          </div>
          <div class="mt-14 flex justify-end items-center pr-8 pb-10">
            <span
              @click="showProfile"
              class="text-white cursor-pointer text-xl mr-5"
              >{{ $t("profile.cancell") }}</span
            >
            <base-button>{{ $t("profile.add") }}</base-button>
          </div>
        </Form>
      </div>
    </NewEmail>
  </div>
</template>

<script setup>
import NewEmail from "@/components/ui/profileUI/ChangeEmailPopup.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInstance from "@/config/axios/store";
import router from "@/router";
import i18n from "@/i18n/index.js";
import { computed } from "vue";
const locale = computed(() => {
  return i18n.global.locale;
});

const onSubmit = async (values, actions) => {
  try {
    await axiosInstance.post(`/email/store`, {
      email: values.email,
    });
    router.push({ name: "check-email-verify" });
  } catch (error) {
    console.log(error);
    if (locale.value === "ka") {
      actions.setFieldError("email", "იმეილი უკვე არსებობს");
    } else {
      actions.setFieldError("email", error.response.data.errors.email);
    }
  }
};
const showProfile = () => {
  router.push({ name: "profile" });
};
</script>
