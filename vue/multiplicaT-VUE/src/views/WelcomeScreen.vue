<template>
    <v-container fluid>
      <v-row>
        <!-- Columna de Bienvenida -->
        <v-col class="benvingut" cols="12" md="6">
          <v-card>
            <v-card-title class="text-h5 title">
              <h2>{{ `¡Bienvenido, ${this.username}!` }}</h2>
            </v-card-title>
            <v-card-text>
              <!-- Contenido opcional para la tarjeta de bienvenida -->
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Columna de Opciones -->
        <v-col class="opcions" cols="12" md="6">
          <v-card outlined class="menu-card">
            <v-card-title class="text-h5 title">Menú</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list dense>
                <router-link to="/create-game" class="router-link">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-play</v-icon>
                    </v-list-item-icon>
                    Jugar
                  </v-list-item>
                </router-link>
                <router-link to="/profile" class="router-link">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    Perfil
                  </v-list-item>
                </router-link>
                <router-link to="/ranking" class="router-link">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-trophy</v-icon>
                    </v-list-item-icon>
                    Ranking
                  </v-list-item>
                </router-link>
                <router-link @click="logout" to="/" class="router-link">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-exit-to-app</v-icon>
                    </v-list-item-icon>
                    Salir
                  </v-list-item>
                </router-link>
              </v-list>
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
        mail: '',
      };
    },
    mounted() {
      const store = useAppStore();
  
      if (!store.isLoggedIn()) {
        window.alert("No has iniciado sesión");
        this.$router.push("/");
      } else {
        const username = store.getUsername();
        const mail = store.getMail();
        if (username) {
          this.username = username;
          this.mail = mail;
        } else {
          console.error("Nombre de usuario no definido");
        }
      }
    },
    methods: {
      logout() {
        const store = useAppStore();
        store.setLoginInfo({
          loggedIn: false,
          username: "",
        });
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .benvingut,
  .opcions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .menu-card {
    width: 80%;
    border: 2px solid #333;
    border-radius: 10px;
  }
  
  .title {
    color: #42a5f5;
  }
  
  .router-link {
    color: inherit;
    text-decoration: none;
  }
  
  .router-link:hover {
    color: rgb(27, 38, 194);
  }
  </style>
  