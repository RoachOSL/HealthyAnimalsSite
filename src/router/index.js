import {createRouter, createWebHistory} from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import ContactView from "../views/ContactView.vue"
import Success from "../views/Success.vue"



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/",
            name: "home",
            component: HomeView

        },
        {
            path:"/about",
            name:"about",
            component: AboutView
        },
        {
            path:"/contact",
            name:"contact",
            component: ContactView
        },
        {
            path:"/success",
            name:"success",
            component: Success
        }
    ]
})

export default router