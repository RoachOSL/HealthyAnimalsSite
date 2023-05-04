<script >
import { user } from '../App.vue';
import { RouterView, RouterLink } from 'vue-router';

export default {
    name: 'LoggedContent',
    computed: {
        currentUser() {
            return user;
        }
    },
};

</script>


<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-12 col-md-12">
                <h2>Welcome {{ currentUser }} !!</h2>
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
                        <RouterLink class="sidebar-link" to="/showPets">Show pets</RouterLink>
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
            <RouterView/>
        </div>


        </div>
        

    </div>

 
    

</template>