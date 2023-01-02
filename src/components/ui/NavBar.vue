<template>
  <div>
    <ul class="text-white">
      <li class="flex mb-10">
        <div class="w-16 h-16">
          <img
            class="w-full h-full object-cover rounded-full"
            :src="userInformation.thumbnail"
            alt="profile"
          />
        </div>
        <div class="flex flex-col justify-center ml-6">
          <span class="text-base sm:text-2xl whitespace-nowrap">{{
            userInformation.username
          }}</span>
          <router-link
            class="text-sm sm:text-base"
            :to="
              userInformation.email_verified_at === null
                ? { name: 'google-profile' }
                : { name: 'profile' }
            "
            >{{ $t("layout.edit_profile") }}
          </router-link>
        </div>
      </li>
      <li class="pl-2 mb-10">
        <router-link
          class="flex items-center whitespace-nowrap text-base sm:text-2xl"
          :to="{ name: 'news-feed' }"
        >
          <House class="mr-11" />
          {{ $t("layout.news_feed") }}</router-link
        >
      </li>
      <li class="pl-2 mb-10">
        <router-link
          class="flex whitespace-nowrap items-center text-base sm:text-2xl"
          :to="{ name: 'movie-list' }"
        >
          <Camera class="mr-11" />{{ $t("layout.movie_list") }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import House from "@/components/svg/HouseIcon.vue";
import Camera from "@/components/svg/CameraIcon.vue";
import { useUserInfo } from "@/stores/useUserInfo";
import { computed } from "vue";

const userdata = useUserInfo();
const userInformation = computed(() => userdata.user);
</script>
