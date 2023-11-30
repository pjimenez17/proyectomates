<template>
  <v-container fluid class="login-container">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <!-- <v-card-title class="text-h5 text-center">Iniciar sesión</v-card-title> -->
          <div class="imagen">
            <img style="margin-top: 40px;" class="img_peq" src="../assets/name_app.png">
          </div>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field clearable  v-model="username" prepend-inner-icon="mdi-email" label="Correo" required></v-text-field>
              <v-text-field clearable  v-model="password" :type="showPassword ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline" label="Contraseña" required
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="SeePasword()">
              </v-text-field>

              <v-btn class="click" type="submit" variant="elevated">Iniciar sesion</v-btn>
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
      showPassword: false,
      mail: '',
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
              mail: this.username,
              username: response.name     
            });

            console.log("Correo electrónico: " + store.getMail());
            console.log("Nombre de usuario: "+ store.getUsername());
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
    SeePasword() {
      // Cambia el estado de showPassword al hacer clic en el botón
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: rgb(2, 4, 80);
  /* background-image: url("@/assets/fondo.jpg"); */
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

.imagen {
  display: flex;
  justify-content: center;
  /* Centra horizontalmente */
  align-items: center;
  /* Centra verticalmente */
  height: 16vh;
  /* Ajusta la altura según sea necesario */
}

.img_peq {
  width: 200px;
  /* Ajusta el ancho según sea necesario */
  height: auto;
  /* Se ajustará automáticamente para mantener la proporción original */
}
.click {
  margin: 2rem auto;
  display: flex;
  background-color:#3894fc;
  color: white;
  cursor: pointer;
  border: none;
  font-size: 1.2rem;
  padding: 10px 15px;
  border-radius: .25rem
}

.click {
  transition: background .8s ease-out;
  background: #3894fc radial-gradient(circle, transparent 1%, #3894fc 1%) center/15000%;
}

.click:active {
  background-color: #c1b4ff;
  background-size: 100%;
  transition: background 0s;
}
  

/* button {
  padding: 1.3em 3em;
  width: 100%;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #fff;
  background-color: #3894fc;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

button:hover {
  background-color: #23c483;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

button:active {
  transform: translateY(-1px);
} */
</style>
  