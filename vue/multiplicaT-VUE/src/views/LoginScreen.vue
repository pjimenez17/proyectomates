<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="text-h5 text-center">Iniciar sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="Usuario" required></v-text-field>
              <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
              <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
import { useAppStore } from '@/store/app';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const store = useAppStore();

      if (this.username.trim() !== "" && this.password.trim() !== "") {

        store.setLoginInfo({
          loggedIn: true,
          username: this.username,
        })
        this.$router.push("/welcome");
      }else{
        window.alert("Por favor inicia sesión 😡")
      }
    },
  },
};
</script>
  