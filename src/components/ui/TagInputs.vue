<template>
  <div class="mt-4">
    <Field rules="required" v-model="tags" name="genre">
      <div
        class="w-full flex flex-wrap gap-2 mt-2 mb-2 font-normal rounded bg-[#11101A] border border-[#CED4DA] text-base text-white outline-none py-2 pl-4 pr-16"
      >
        <div
          class="flex bg-[#6C757D] text-white px-2 py-2 items-center"
          v-for="(tag, index) in tags"
          :key="'tag' + index"
        >
          {{ tag }}
          <Delete @click="removeTag(index)" class="ml-2 cursor-pointer" />
        </div>

        <input
          @keydown.enter.prevent="addTag"
          @blur="addTag"
          v-model="tagValue"
          type="text"
          placeholder="type genre"
          class="bg-transparent outline-none text-xs sm:text-base"
        />
      </div>
    </Field>
    <ErrorMessage class="text-red-500 border-rose-600" name="genre" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import Delete from "@/components/svg/RemoveTag.vue";

const tagValue = ref("");
const tags = ref([]);

const addTag = () => {
  if (!tagValue.value == "") {
    tags.value.push(tagValue.value);
  }
  tagValue.value = "";
};
const removeTag = (index) => {
  tags.value.splice(index, 1);
};
</script>
