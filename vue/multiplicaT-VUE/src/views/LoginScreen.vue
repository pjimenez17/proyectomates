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
import { log } from '@/services/communicationsmanager';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const store = useAppStore();

      if (this.username.trim() !== "" && this.password.trim() !== "") {

        try {
          const response = await log(this.username, this.password)

          if (response.authorization) {
            store.setLoginInfo({
              loggedIn: true,
              username: response.name
            });

            console.log(this.username);
            // Redirige a la página de bienvenida
            this.$router.push("/welcome");
          }else{
            window.alert("Credenciales incorrectas 😡")
          }
        } catch(error) {
          console.error("Error en la solicitud de inicio de sesión:", error);
          window.alert("Error en la solicitud de inicio de sesión. Por favor, inténtalo de nuevo.");
         }
      } else {
        window.alert("Por favor inicia sesión 😡")
      }
    },
  },
};
</script>
  