<template>
  <div class="bg-feed min-h-screen">
    <Header></Header>
    <div>
      <div class="px-7 mt-6">
        <Arrow @click="showProfile" />
      </div>

      <div>
        <div class="bg-[#24222F] flex flex-col px-8 pt-8 pb-12 mt-6 rounded-md">
          <div>
            <div
              class="relative w-full flex flex-col pb-10 border-b border-[#CED4DA]"
            >
              <label class="text-white text-base sm:text-xl">{{
                $t("profile.primary_email")
              }}</label>
              <input
                type="email"
                disabled
                v-model="userInformation.email"
                name="email"
                class="h-12 rounded mt-8 bg-[#132826] opacity-50 border border-[#198754] text-xs text-white pl-3"
              />

              <ValidIcon class="absolute right-5 top-[72px]" />
            </div>
            <div class="mt-3">
              <h2 class="text-white text-base sm:text-xl">
                {{ $t("profile.change_primary_email") }}
              </h2>
            </div>
            <div v-for="email in userInformation.emails" :key="email.id">
              <div
                v-if="!email.email_verified_at"
                class="flex items-center mt-8"
              >
                <div class="flex flex-col w-full">
                  <input
                    disabled
                    type="email"
                    :name="email.email"
                    v-model="email.email"
                    class="text-white mt-5 bg-transparent text-base sm:text-xl"
                  />
                  <div
                    class="flex justify-between items-center mt-5 pb-5 border-b border-[#CED4DA]"
                  >
                    <div class="flex items-center">
                      <Warning />
                      <span class="#EC9524 ml-3 text-[#EC9524]">{{
                        $t("profile.not_verified")
                      }}</span>
                    </div>
                    <span @click="deleteEmail(email.id)" class="text-white">{{
                      $t("profile.remove")
                    }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="flex items-center mt-8">
                <div class="flex flex-col w-full">
                  <input
                    disabled
                    type="email"
                    :name="email.email"
                    v-model="email.email"
                    class="text-white mt-5 bg-transparent text-xl"
                  />
                  <div
                    class="flex justify-between items-center mt-5 pb-5 border-b border-[#CED4DA]"
                  >
                    <span
                      @click="makeEmailPrimary(email.id)"
                      class="px-4 py-2 bg-transparent border rounded text-white"
                      >{{ $t("profile.make_primary") }}</span
                    >
                    <span @click="deleteEmail(email.id)" class="text-white">{{
                      $t("profile.remove")
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <span class="text-white tex-sm sm:text-base">{{
              $t("profile.add_new_email")
            }}</span>
            <base-button
              @click="addNewEmail"
              class="flex items-center tex-sm sm:text-base ml-0 mt-2 !bg-transparent w-full justify-center border"
            >
              <AddIcon class="mr-2" />{{
                $t("profile.add_new_email")
              }}</base-button
            >
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@/components/ui/The-Header.vue";
import Arrow from "@/components/svg/WhiteArrow.vue";
import ValidIcon from "@/components/svg/CheckCircle.vue";
import AddIcon from "@/components/svg/AddMovieIcon.vue";
import Warning from "@/components/svg/WarningIcon.vue";
import axiosInstance from "@/config/axios/store";
import router from "@/router";
import { computed } from "vue";
import { useUserInfo } from "@/stores/useUserInfo";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);

const showProfile = () => {
  router.push({ name: "profile" });
};
const addNewEmail = () => {
  router.push({ name: "add-new-email" });
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
</script>
