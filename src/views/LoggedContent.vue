<script >
import { RouterView, RouterLink } from 'vue-router';
import { auth } from "../main";

export default {
    name: 'LoggedContent',
    data() {
        return {
            userEmail: null
        }
    },
    mounted() {
        const user = auth.currentUser;
        if (user) {
            this.email = user.email;
        }
    },
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-12">
                <h2>Welcome!!</h2>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-3">
                <div class="sidebar">
                    <ul>
                        <li>
                            <RouterLink class="sidebar-link" to="/findVet">Find vet</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="sidebar-link" to="/addAnimal">Add animal</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="sidebar-link" to="/showAnimals">Show animals</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="sidebar-link" to="/makeAppointment">Make an appointment</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="sidebar-link" to="/showAppointment">Show appointments</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-9 col-md-9">
                <RouterView />
            </div>
        </div>
    </div>
</template>