<template>
  <button
    class="py-2 px-4 sm:px-6 bg-[#E31221] rounded sm:text-base ml-4 text-white"
    :class="mode"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["mode"],
};
</script>
