<script setup>
import { RouterView, RouterLink } from 'vue-router';
import LoggedContent from "../src/views/LoggedContent.vue";

const loggedIn = true;

</script>

<script>
const user_second = "Oskar";

export const user = user_second;
</script>

<template>
  <main>
    <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-dark text-center">
      <a href="#" class="navbar-brand">
        <img class="d-inline-block align-top" src="/images/Logo.jpg" alt="logoAnimal" width="50" height="50" />
        Healthy Animals
      </a>
      <div class="container">
        <button type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" class="navbar-toggler"
          aria-controls="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="toggleMobileMenu">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!user">
              <RouterLink class="router-link" to="/login">Login</RouterLink>
            </li>
            <li class="nav-item" v-else>
              <span class="navbar-text" v-bind:data-username="user"></span>
            </li>
            <li class="nav-item">
              <RouterLink class="router-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="router-link" to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="router-link" to="/contact">Contact</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <hr class="border border-2" />

    <template v-if="loggedIn">
      <LoggedContent />
    </template>
    <template v-else>
      <RouterView />
    </template>

    <hr class="border border-2" />

    <footer class="container-fluid">
      <div class="row text-center">
        <div class="col-12">
          <p>&copy; Healthy Animal 2023. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  </main>
</template>

