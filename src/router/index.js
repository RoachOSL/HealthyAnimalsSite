import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoggedContent from "../views/loggedContent.vue";
import Login from "../views/Login.vue";
import addAnimal from "../views/addAnimal.vue";
import makeAppointment from "../views/makeAppointment.vue";
import showAnimals from "../views/showAnimals.vue";
import showAppointment from "../views/showAppointment.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },
    {
      path: "/loggedContent",
      name: "logCont",
      component: LoggedContent,
    },
    {
        path: "/login",
        name: "log",
        component: Login,
    },
    {
        path: "/addAnimal",
        name: "addAnim",
        component: addAnimal,
    },
    {
        path: "/makeAppointment",
        name: "amakeAppo",
        component: makeAppointment,
    },
    {
        path: "/showAnimals",
        name: "shAnimal",
        component: showAnimals,
    },
    {
        path: "/showAppointment",
        name: "shAppo",
        component: showAppointment,
    },
  ],
});

export default router;
