<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div
      class="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 px-3 sm:px-16 mt-8"
    >
      <NavBar class="sm:col-span-1 hidden xl:block" />
      <div class="pb-10 col-span-3 lg:col-span-2">
        <h2 class="text-white text-2xl">{{ $t("profile.my_profile") }}</h2>
        <Form @submit="onSubmit">
          <div class="bg-[#11101A] mt-32 pb-14 rounded-lg">
            <div class="flex justify-center">
              <div class="mt-[-90px]">
                <label
                  for="dropzoneFile"
                  @click="editImage"
                  class="flex flex-col items-center"
                >
                  <div class="w-[188px] h-[188px] rounded-full">
                    <img
                      :src="userInformation.thumbnail"
                      class="w-full h-full rounded-full object-cover"
                      alt=""
                      id="output"
                    />
                  </div>
                  <span class="text-white text-xl mt-2">
                    {{ $t("profile.upload_photo") }}</span
                  >
                </label>
                <Field
                  @input="loadFile"
                  type="file"
                  class="hidden"
                  id="dropzoneFile"
                  name="thumbnail"
                />
              </div>
            </div>
            <div class="ml-20 mt-10">
              <div class="">
                <div class="mt-10">
                  <div class="flex">
                    <div class="w-[450px] pb-12 border-b border-[#CED4DA]">
                      <div>
                        <label class="text-white text-xl">{{
                          $t("profile.username")
                        }}</label>
                        <Field
                          disabled
                          type="text"
                          name="user"
                          v-model="userInformation.username"
                          class="w-full h-12 mt-2 pl-3 rounded text-black bg-[#CED4DA]"
                        />
                      </div>
                      <div v-if="editUsername">
                        <div class="flex items-center mt-5">
                          <div class="w-[450px] relative">
                            <Field
                              type="text"
                              rules="required|min:3|lowerCase_and_numbers"
                              name="username"
                              class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                            />
                            <ErrorMessage
                              class="text-red-500 border-rose-600"
                              name="username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      @click="editUser"
                      class="text-white ml-8 cursor-pointer text-xl mt-10"
                      >{{ $t("profile.edit") }}</span
                    >
                  </div>
                </div>
              </div>

              <div>
                <div class="flex flex-col mt-12">
                  <div class="flex items-center">
                    <div class="w-[450px] relative">
                      <label class="text-white text-xl">{{
                        $t("profile.email")
                      }}</label>
                      <Field
                        disabled
                        type="email"
                        name="email"
                        v-model="userInformation.email"
                        class="w-[450px] h-12 mt-2 rounded bg-[#132826] opacity-50 border border-[#198754] text-white pl-3"
                      />
                      <ValidIcon class="absolute right-5 top-14" />
                    </div>
                    <span class="text-white ml-8 mt-9 text-xl">{{
                      $t("profile.primary_email")
                    }}</span>
                  </div>
                  <div v-for="email in userInformation.emails" :key="email.id">
                    <div
                      v-if="!email.email_verified_at"
                      class="flex items-center mt-8"
                    >
                      <div class="w-[450px] relative">
                        <label class="text-white text-xl">{{
                          $t("profile.email")
                        }}</label>
                        <Field
                          disabled
                          type="email"
                          :name="email.email"
                          v-model="email.email"
                          class="w-[450px] h-12 mt-2 bg-[#3D2B1C] border border-[#EC9524] rounded pl-3"
                        />
                        <Warning
                          @click="showWarningMessage"
                          class="absolute right-5 top-14"
                        />
                        <span
                          v-if="warningMessage"
                          class="bg-white flex items-center text-base absolute w-[65%] top-[-50px] right-[-145px] px-4 py-4"
                        >
                          <Info class="mr-3" />
                          {{ $t("profile.verify_message") }}</span
                        >
                      </div>
                      <div class="relative mt-8">
                        <span class="text-white ml-8 mt-9 text-xl">{{
                          $t("profile.not_verified")
                        }}</span>
                        <Line class="absolute left-[70%] top-2" />
                        <span
                          @click="deleteEmail(email.id)"
                          class="text-white ml-8 mt-9 text-xl"
                          >{{ $t("profile.remove") }}</span
                        >
                      </div>
                    </div>
                    <div v-else class="flex items-center mt-8">
                      <div class="w-[450px] relative">
                        <label class="text-white text-xl">{{
                          $t("profile.email")
                        }}</label>
                        <Field
                          disabled
                          type="email"
                          :name="email.email"
                          v-model="email.email"
                          class="w-[450px] h-12 mt-2 rounded pl-3"
                        />
                      </div>
                      <div class="relative mt-8">
                        <span
                          @click="makeEmailPrimary(email.id)"
                          class="text-white ml-8 mt-9 text-xl"
                          >{{ $t("profile.make_primary") }}</span
                        >

                        <Line class="absolute left-[70%] top-2" />
                        <span
                          @click="deleteEmail(email.id)"
                          class="text-white ml-8 mt-9 text-xl"
                          >{{ $t("profile.remove") }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <base-button
                  type="button"
                  @click="showEmailPopup"
                  class="flex items-center ml-0 !bg-[#11101A] mt-10 border text-xs sm:text-base font-normal whitespace-nowrap px-2 sm:!px-4 sm:!py-2"
                >
                  <AddIcon class="mr-2" />{{
                    $t("profile.add_new_email")
                  }}</base-button
                >
              </div>

              <div class="mt-10">
                <div class="flex items-center">
                  <div class="w-[450px] pt-10 border-t border-[#CED4DA]">
                    <label class="text-white text-xl">{{
                      $t("profile.password")
                    }}</label>
                    <Field
                      disabled
                      type="password"
                      name="pass"
                      value="asdasdsadsad"
                      class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
                    />
                  </div>
                  <span
                    @click="editPassword"
                    class="text-white ml-8 cursor-pointer text-xl mt-20"
                    >{{ $t("profile.edit") }}</span
                  >
                </div>
                <div v-if="editPass">
                  <div
                    class="w-[450px] mt-5 rounded flex flex-col border border-[#CED4DA] px-6 py-6"
                  >
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
                    <div class="w-[450px] relative">
                      <label class="text-white text-xl">{{
                        $t("profile.new_password")
                      }}</label>
                      <Field
                        :type="changePasswordType"
                        name="password"
                        rules="min:8|max:15|required"
                        class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
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
                      <ErrorMessage
                        class="text-red-500 border-rose-600"
                        name="password"
                      />
                    </div>
                  </div>
                  <div class="flex items-center mt-5">
                    <div class="w-[450px] relative">
                      <label class="text-white text-xl">{{
                        $t("profile.confirm_password")
                      }}</label>
                      <Field
                        :type="confirmPasswordType"
                        rules="min:8|max:15|required|confirmed:@password"
                        name="password_confirmation"
                        class="w-full h-12 mt-2 pl-3 rounded bg-[#CED4DA]"
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
                      <ErrorMessage
                        class="text-red-500 border-rose-600"
                        name="password_confirmation"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="editCrudential"
            class="mt-10 flex justify-end items-center"
          >
            <span
              @click="cancell"
              class="text-white cursor-pointer text-xl mr-5"
              >{{ $t("profile.cancell") }}</span
            >
            <base-button>{{ $t("profile.save_changes") }}</base-button>
          </div>
        </Form>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import NavBar from "@/components/ui/NavBar.vue";
import AddIcon from "@/components/svg/AddMovieIcon.vue";
import Warning from "@/components/svg/WarningIcon.vue";
import Line from "@/components/svg/LineIcon.vue";
import Info from "@/components/svg/InfoCircle.vue";
import HidePassword from "@/components/svg/HidePassword.vue";
import ShowPassword from "@/components/svg/ShowPassword.vue";
import ValidIcon from "@/components/svg/CheckCircle.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import router from "@/router";
import axiosInstance from "@/config/axios/store";
import { computed } from "vue";
import { useUserInfo } from "@/stores/useUserInfo";
import i18n from "@/i18n/index.js";

const locale = computed(() => {
  return i18n.global.locale;
});

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);
const editCrudential = ref(false);
const editUsername = ref(false);
const editThumbnail = ref(false);

const warningMessage = ref(false);
const editPass = ref(false);
const changePasswordType = ref("password");
const confirmPasswordType = ref("password");

const switchChangePassword = () =>
  (changePasswordType.value =
    changePasswordType.value === "password" ? "text" : "password");
const switchConfirmPassword = () =>
  (confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password");

const loadFile = function (event) {
  var output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};
const onSubmit = async (values, actions) => {
  try {
    await axiosInstance.post(`updatecruds`, values);

    editCrudential.value = false;
    userdata.userinfo();
  } catch (error) {
    console.log(error);
    if (locale.value === "ka") {
      actions.setFieldError("username", "სახელი უკვე არსებობს");
    } else {
      actions.setFieldError("username", error.response.data.errors.username);
    }
  }
};
const deleteEmail = async (id) => {
  try {
    await axiosInstance.post(`email/${id}`);

    userdata.userinfo();
  } catch (error) {
    console.log(error);
  }
};
const makeEmailPrimary = async (id) => {
  try {
    await axiosInstance.post(`primary/update`, {
      email_id: id,
    });

    userdata.userinfo();
  } catch (error) {
    console.log(error);
  }
};
const showWarningMessage = () => {
  warningMessage.value = !warningMessage.value;
};

const editUser = () => {
  editUsername.value = true;
  editCrudential.value = true;
};
const editPassword = () => {
  editCrudential.value = true;
  editPass.value = true;
};
const editImage = () => {
  editCrudential.value = true;
  editThumbnail.value = true;
};
const cancell = () => {
  editCrudential.value = false;
  editPass.value = false;
  editUsername.value = false;
};
const showEmailPopup = () => {
  router.push({ name: "change-email" });
};
</script>
