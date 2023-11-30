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
      startGame() {
        console.log("Partida iniciada");
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