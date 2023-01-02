<template>
  <div class="mt-6">
    <div class="flex items-center">
      <img
        class="w-14 h-14 rounded-full"
        :src="comments.user.thumbnail"
        alt="avatar"
      />
      <span class="text-white font-normal text-base sm:text-xl ml-6">{{
        comments.user.username
      }}</span>
    </div>
    <div class="pl-0 sm:pl-[75px]">
      <p
        class="text-white break-all text-base sm:text-xl mt-2 font-normal border-b border-[#EFEFEF] pb-6"
      >
        {{ comments.body }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comments: {
    type: Object,
    required: false,
  },
});
</script>
