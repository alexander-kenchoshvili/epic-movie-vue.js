<template>
  <div
    @click="closePopup"
    class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-50"
  ></div>
  <div
    class="bg-[#11101A] absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-11%] z-20 rounded-[10px]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import router from "@/router";

const closePopup = () => {
  router.push({ name: "movie-list" });
};
</script>
