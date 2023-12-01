<template>
  <v-app>
    <v-app-bar v-if="showAppBar" app color="black" >
      <v-app-bar-nav-icon icon="mdi-arrow-left" @click="goToHome" />
      <v-app-bar-title class="titulo">MathDash</v-app-bar-title>
      <img  class="imagen" src="./assets/Log.png">
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';


const router = useRouter();

const showAppBar = computed(() => {
  // Oculta el app-bar en la ruta de inicio de sesión (por ejemplo, '/login')
  return router.currentRoute.value.path !== '/';
});

const goToHome = () => {
  router.push('/welcome');
};
</script>

<style scoped>
.titulo{
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.imagen{
  background-size: cover;
  max-height: 150px; /* Ajusta la altura máxima a tu preferencia */
  margin-right: 0px; /* Ajusta el margen derecho a tu preferencia */
}
</style>
