<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="custom-card">
            <v-card-title class="text-h5 text-center">Partida Creada</v-card-title>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="12" md="8">
                  <v-alert type="success" outlined>
                    Contraseña de la Partida: {{ password }}
                  </v-alert>
                  <v-btn color="primary" @click="startGame">Iniciar Partida</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>   
  
  <script>
import { useAppStore } from '@/store/app';
import { updateGameStatus } from "@/services/communicationsmanager.js"

  export default {
    data() {
      return {
        password: "",
      };
    },
    mounted(){
        const store = useAppStore();

        const password = store.getGamePassword();
        if(password){
            this.password = password
        }
        console.log(password);
    },
    methods: {
      async startGame() {
      try {
        // Obtén el game_id y realiza la solicitud para cambiar el estado a "iniciado"
        const store = useAppStore();
        const game_id = store.getGameId();
        const result = await updateGameStatus('in_game', game_id);

        // Haz algo con el resultado si es necesario
        console.log(result);

        // Continúa con la lógica de redirección u otras acciones después de iniciar la partida
        console.log("Partida iniciada");
      } catch (error) {
        console.error("Error al iniciar la partida:", error);
        // Puedes manejar el error mostrando un mensaje al usuario o realizando otras acciones necesarias
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .custom-card {
    border: 2px solid #000;
    margin-top: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  </style>