import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/config/axios/store.js";

export const useQuotes = defineStore("allQuote", () => {
  const allQuotes = ref([]);
  const definePage = ref(1);
  const search = ref("");
  const savedQuotes = ref([]);

  const quotes = async () => {
    try {
      const response = await axiosInstance.get(
        `/quotes?page=` + definePage.value++
      );
      allQuotes.value = allQuotes.value.concat(response.data.data);
      savedQuotes.value = savedQuotes.value.concat(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuoteLength = async (search) => {
    try {
      const response = await axiosInstance.post(`/getQuotes`, {
        quoteLength: allQuotes.value.length,
        search: search,
      });
      allQuotes.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { quotes, allQuotes, search, definePage, getQuoteLength };
});
