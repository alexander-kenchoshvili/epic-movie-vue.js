import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/components/pages/LandingPage.vue";
import Register from "@/components/popups/authPopups/RegisterPopup.vue";
import Login from "@/components/popups/authPopups/LoginPopup.vue";
import EmailVerify from "@/components/popups/authPopups/SendEmailVerify.vue";
import ConfirmEmail from "@/components/popups/authPopups/ConfirmEmail.vue";
import ResetPassword from "@/components/popups/authPopups/ResetPassword.vue";
import PasswordCheck from "@/components/popups/authPopups/PasswordCheck.vue";
import NewPassword from "@/components/popups/authPopups/NewPassword.vue";
import PasswordSuccess from "@/components/popups/authPopups/PasswordSuccess.vue";

import NewsFeed from "@/components/pages/NewsFeed.vue";
import QuotePopup from "@/components/popups/quotePopups/AddQuoteFromFeed.vue";
import AddQuoteFromMovie from "@/components/popups/quotePopups/AddQuoteFromMovie.vue";
import EditQuote from "@/components/popups/quotePopups/EditQuote.vue";
import ViewQuote from "@/components/popups/quotePopups/ViewQuote.vue";
import MoviePopup from "@/components/popups/moviePopups/MoviePopup.vue";
import EditMovie from "@/components/popups/moviePopups/EditMovie.vue";
import MovieList from "@/components/pages/MovieList.vue";
import MovieDescription from "@/components/pages/MovieDescription.vue";

import Profile from "@/components/pages/ProfilePage.vue";
import EditEmailForPC from "@/components/popups/profilePopups/EditEmailForPC.vue";
import EditUser from "@/components/popups/profilePopups/EditUser.vue";
import EditEmailForMobile from "@/components/popups/profilePopups/EditEmailForMobile.vue";
import EditPassword from "@/components/popups/profilePopups/EditPassword.vue";
import SuccessPopup from "@/components/ui/profileUI/SuccessPopup.vue";
import AddNewEmailForMobile from "@/components/popups/profilePopups/AddNewEmailForMobile.vue";
import NewEmailPopup from "@/components/ui/profileUI/EmailSuccess.vue";
import CheckEmailMessage from "@/components/ui/profileUI/CheckForEmailVerify.vue";
import GoogleProfile from "@/components/pages/GoogleProfile.vue";

import NotFound from "../components/pages/NotFoundPage.vue";
import IsNotAccessible from "../components/pages/IsNotAccessible.vue";

import axios from "axios";
import { isAuthenticated } from "@/router/guards.js";
import { useAuthStore } from "@/stores/auth";
axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/:notfound(.*)", component: NotFound, name: "not-found" },
    {
      path: "/isNotAccessible",
      component: IsNotAccessible,
      name: "is-not-accessible",
    },
    {
      path: "/google-profile",
      component: GoogleProfile,
      name: "google-profile",
      beforeEnter: isAuthenticated,
    },
    {
      path: "/profile",
      component: Profile,
      name: "profile",
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "change-email",
          name: "change-email",
          component: EditEmailForPC,
        },
        {
          path: "success-popup",
          name: "success-popup",
          component: SuccessPopup,
        },
        {
          path: "check-email-verify",
          name: "check-email-verify",
          component: CheckEmailMessage,
        },
      ],
    },
    {
      path: "/add-new-email",
      component: AddNewEmailForMobile,
      name: "add-new-email",
      beforeEnter: isAuthenticated,
    },
    {
      path: "/edit-email",
      component: EditEmailForMobile,
      name: "edit-email",
      beforeEnter: isAuthenticated,

      children: [
        {
          path: "new-email-popup",
          component: NewEmailPopup,
          name: "new-email-popup",
        },
      ],
    },
    {
      path: "/edit-password",
      component: EditPassword,
      name: "edit-password",
      beforeEnter: isAuthenticated,
    },
    {
      path: "/edit-user",
      name: "edit-user",
      component: EditUser,
      beforeEnter: isAuthenticated,
    },

    {
      path: "/",
      component: LandingPage,
      name: "home",

      children: [
        {
          path: "register",
          component: Register,
          name: "register",
        },
        {
          path: "login",
          component: Login,
          name: "login",
        },
        {
          path: "email-verify",
          component: EmailVerify,
          name: "email-verify",
        },
        {
          path: "confirm-email",
          component: ConfirmEmail,
          name: "confirm-email",
        },
        {
          path: "reset-password",
          component: ResetPassword,
          name: "reset-password",
        },
        {
          path: "password-check",
          component: PasswordCheck,
          name: "password-check",
        },
        {
          path: "new-password",
          component: NewPassword,
          name: "new-password",
        },
        {
          path: "confirm-password",
          component: PasswordSuccess,
          name: "confirm-password",
        },
      ],
    },
    {
      path: "/news-feed",
      name: "news-feed",
      component: NewsFeed,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "quote-popup",
          name: "quote-popup",
          component: QuotePopup,
        },
      ],
    },
    {
      path: "/movie-list",
      name: "movie-list",
      component: MovieList,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "movie-popup",
          name: "movie-popup",
          component: MoviePopup,
        },
      ],
    },
    {
      path: "/movie-description/:movieId",
      name: "movie-description",
      component: MovieDescription,
      beforeEnter: isAuthenticated,
      children: [
        {
          path: "edit-movie/:movieId",
          name: "edit-movie",
          component: EditMovie,
        },
        {
          path: "view-quote/:quoteId",
          name: "view-quote",
          component: ViewQuote,
        },
        {
          path: "edit-quote/:quoteId",
          name: "edit-quote",
          component: EditQuote,
        },
        {
          path: "add-quote",
          name: "add-quote",
          component: AddQuoteFromMovie,
        },
      ],
    },
  ],
});

router.beforeEach(async (_, _2, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}me`);
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    }
  }
  return next();
});

export default router;
