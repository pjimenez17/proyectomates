<template>
  <v-container fluid class="login-container">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="text-h5 text-center">Iniciar sesión</v-card-title>
          <div class="imagen">
            <img class="img_peq" src="../assets/name_app.png">
          </div>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" prepend-inner-icon="mdi-email" label="Correo" required></v-text-field>
              <v-text-field v-model="password" prepend-inner-icon="mdi-lock-outline" label="Contraseña" type="password"
                required></v-text-field>
              <v-btn color="blue" block  size="large" type="submit" variant="elevated" >Iniciar sesion</v-btn>
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
          } else {
            window.alert("Credenciales incorrectas 😡")
          }
        } catch (error) {
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

<style>
.login-container {
  background-image: url("@/assets/fondo.jpg");
  background-size: cover;
  background-position: center center;
  height: 100vh;
  /* Ajusta la altura según sea necesario */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Ajusta el estilo del formulario según sea necesario */
.v-form {
  max-width: auto;
  /* Ancho máximo del formulario */
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  /* Color de fondo del formulario */
  border-radius: 10px;
}

.imagen{
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 16vh; /* Ajusta la altura según sea necesario */
}

.img_peq{
  width: 200px; /* Ajusta el ancho según sea necesario */
  height: auto; /* Se ajustará automáticamente para mantener la proporción original */
}
</style>
  