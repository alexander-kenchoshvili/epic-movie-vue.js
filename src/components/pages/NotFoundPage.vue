<template>
  <div class="bg-feed min-h-screen">
    <div
      class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <div class="flex flex-col items-center justify-center">
        <NotFound />
        <NotFoundCircle class="mt-3" />
        <h2 class="text-5xl mt-3 text-white">Whoops!</h2>
        <p class="text-white mt-3 mb-3 text-2xl">
          We can't see the page you are looking for
        </p>
        <base-button @click="showHomePage">Return home</base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NotFound from "@/components/svg/NotFound.vue";
import NotFoundCircle from "@/components/svg/NotFoundCircle.vue";
import router from "@/router";

const showHomePage = () => {
  router.push({ name: "home" });
};
</script>
