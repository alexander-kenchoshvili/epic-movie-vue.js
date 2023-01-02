<template>
  <div class="bg-feed min-h-screen">
    <div
      class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <div class="flex flex-col items-center justify-center">
        <Gendalf />
        <h2 class="text-5xl mt-3 text-white">You shall not pass!</h2>
        <p class="text-white mt-3 mb-3 text-2xl">
          Sorry, but you don’t have permission to access this page
        </p>
        <base-button @click="showHomePage">Return home</base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Gendalf from "@/components/svg/GendalfIcon.vue";
import router from "@/router";

const showHomePage = () => {
  router.push({ name: "home" });
};
</script>
