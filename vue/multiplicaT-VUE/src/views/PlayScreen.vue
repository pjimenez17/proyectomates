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
            <div v-if="!showQuestions">
              <h2>Contador: {{ countdown }}</h2>
            </div>
            <div v-if="showQuestions">
              <h2>Pregunta {{ currentQuestionIndex + 1 }} de {{ this.questions.length }}:</h2>
              <div v-for="(pregunta, index) in this.questions">
                <div v-if="currentQuestionIndex == index">
                  <h4>{{ pregunta.enunciado }}</h4>
                  <v-btn v-for="option in pregunta.opciones" :key="option" @click="selectOption(pregunta, option)">
                    {{ option }}
                  </v-btn>
                  <p>Dificultad: {{ pregunta.dificultad }}</p>
                  <p>Puntuación: {{ pregunta.puntuacion }}</p>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAppStore } from '@/store/app';
import { updateGameStatus, getQuestions, log } from "@/services/communicationsmanager.js";

export default {

  data() {
    return {
      password: "",
      countdown: 0,
      showQuestions: false, 
      currentQuestionIndex: 0,
      questions: [] 
    };
  },

  mounted() {
    const store = useAppStore();
    const password = store.getGamePassword();

    if (password) {
      this.password = password
    }
  },
  computed: {
    questions() {
      const store = useAppStore();
      return store.getQuestions();
    },
  },
  methods: {
    async startGame() {
      try {
        // Obtén el game_id y realiza la solicitud para cambiar el estado a "in_game"
        const store = useAppStore();
        const game_id = store.getGameId();
        const result = await updateGameStatus('in_game', game_id);

        // Haz algo con el resultado si es necesario
        console.log(result);

        // Inicia el contador y muestra el div de preguntas después del contador
        this.startCountdown();
      } catch (error) {
        console.error("Error al iniciar la partida:", error);
        // Puedes manejar el error mostrando un mensaje al usuario o realizando otras acciones necesarias
      }
    },
    async startCountdown() {
      this.countdown = 3; // Configura la duración del contador en segundos

      // Cuenta regresiva
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          // El contador llegó a cero, detén la cuenta regresiva y muestra el div de preguntas
          clearInterval(countdownInterval);
          this.showQuestions = true;
          this.loadQuestions();
        }
      }, 1000);
    },
    async loadQuestions() {
      try {
        const response = await getQuestions();
        // this.questions = response.questions;  // Update the questions array

        // console.log("Preguntas cargadas:", this.questions);
        var questionsLocal = [];
        response.questions.forEach(element => {
            element.preguntes.forEach(e2 => {
              questionsLocal.push(e2);
              
            });
        });

        this.questions = questionsLocal;
        console.log(this.questions);
        // Set the initial question
        // this.currentQuestion = this.questions[this.currentQuestionIndex];
      } catch (error) {
        console.error("Error al cargar preguntas:", error);
      }
    },
    selectOption(pregunta, option) {
      
      if(option === pregunta.respuesta_correcta){
        const store = useAppStore();
        console.log(store.gameInfo.pointsQuestions);
        const puntos = store.points;
        console.log(puntos);
        // store.setPoints(777)
        // console.log(useAppStore().gameInfo.points);
      }
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      } else {
        // No more questions, end the game or show result
      }
    }
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
  
