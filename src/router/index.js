import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import LoggedContent from "../views/loggedContent.vue";
import Login from "../views/Login.vue";
import addAnimal from "../views/addAnimal.vue";
import makeAppointment from "../views/makeAppointment.vue";
import showPets from "../views/showPets.vue";
import showAppointment from "../views/showAppointment.vue";
import findVet from "../views/findVet.vue"



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
        path: "/showPets",
        name: "shPet",
        component: showPets,
    },
    {
        path: "/showAppointment",
        name: "shAppo",
        component: showAppointment,
    },
    {
      path: "/findVet",
      name: "fVet",
      component: findVet,
    },
  ],
});


// Add Permissions-Policy header to every route
router.beforeEach((to, from, next) => {
  document.querySelector('meta[name="Permissions-Policy"]').setAttribute("content", "interest-cohort=(self)")
  next()
})

export default router;
