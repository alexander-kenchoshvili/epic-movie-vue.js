import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axiosInstance from "@/config/axios/store.js";

export const useMovies = defineStore("allMovie", () => {
  const allMovies = ref([]);
  const searchMovie = ref("");
  const movies = async () => {
    try {
      const response = await axiosInstance.get(`/movie`);
      allMovies.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  onMounted(() => {
    movies();
  });
  return { movies, allMovies, searchMovie };
});

export const useSingleMovie = defineStore("singleMovie", () => {
  const singleMovie = ref({});
  const quotes = ref({});
  const movie = async (id) => {
    try {
      const response = await axiosInstance.get(`/singlemovie/${id}`);
      singleMovie.value = response.data[0];
      quotes.value = response.data.quotes;
    } catch (error) {
      console.log(error);
    }
  };

  return { movie, singleMovie, quotes };
});
