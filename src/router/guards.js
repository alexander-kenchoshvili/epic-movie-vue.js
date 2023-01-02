import { useAuthStore } from "@/stores/auth";

export const isAuthenticated = () => {
  const authStore = useAuthStore();
  if (!authStore.authenticated) {
    return "/isNotAccessible";
  }
};

export const isAlreadyAuth = () => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    return "/news-feed";
  }
};
