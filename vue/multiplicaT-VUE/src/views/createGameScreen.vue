<template>
    <div class="custom-container">
        <v-container fluid fill-height>
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-card class="custom-card">
                        <v-card-title class="text-h5 text-center">Crear o Unirse a una Partida</v-card-title>
                        <v-card-text>
                            <v-row justify="center" v-if="selectedOption === 'create1v1'">
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="minMaxPoints1v1" label="Puntos para ganar" outlined type="number"
                                        @input="checkMaxPoints1v1"></v-text-field>
                                    <v-slider v-model="minMaxPoints1v1" :max="700" :min="100" step="1"
                                        label="Puntuación"></v-slider>
                                    <v-btn color="blue" size="large" type="submit" variant="elevated"
                                        @click="createGame1v1">Crear
                                        Juego</v-btn>
                                </v-col>
                            </v-row>

                            <v-row justify="center" v-if="selectedOption === 'createMultiplayer'">
                                <v-col cols="12" md="8">
                                    <v-col cols="12" md="8">
                                        <v-text-field v-model="minMaxPointsPvP" label="Puntos para ganar" outlined
                                            type="number" @input="checkMaxPointsPvP"></v-text-field>
                                        <v-text-field v-model="minMaxUsersPvP" label="Usuarios" outlined type="number"
                                            @input="checkMaxUsers"></v-text-field>
                                        <v-slider v-model="minMaxPointsPvP" :max="700" :min="100" step="1"
                                            label="Puntuación"></v-slider>
                                        <v-slider v-model="minMaxUsersPvP" :max="50" :min="3" step="1"
                                            label="Usuarios"></v-slider>
                                        <v-btn color="blue" size="large" type="submit" variant="elevated"
                                            @click="createGamePvP">Crear Juego</v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>

                            <v-row justify="center" v-if="selectedOption === 'joinGame'">
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="gameId" label="Contraseña de la Partida" outlined
                                        type="number"></v-text-field>
                                    <v-btn color="blue" size="large" type="submit" variant="elevated"
                                        @click="joinGame">Unirse</v-btn>

                                </v-col>
                            </v-row>

                            <!-- Botones -->
                            <v-row justify="center">
                                <v-col cols="12" md="8">
                                    <v-btn block @click="selectOption('create1v1')">Crear Partida 1v1</v-btn>
                                </v-col>
                            </v-row>

                            <v-row justify="center">
                                <v-col cols="12" md="8">
                                    <v-btn block @click="selectOption('createMultiplayer')">Crear Partida
                                        Multiplayer</v-btn>
                                </v-col>
                            </v-row>

                            <v-row justify="center">
                                <v-col cols="12" md="8">
                                    <v-btn block @click="selectOption('joinGame')">Unirse a Partida</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>
  
<script>
import { createGame, updateGameID, getGameData } from "../services/communicationsmanager.js"
import { useAppStore } from '@/store/app';

export default {
    data() {
        return {
            selectedOption: '',
            gameId: '',
            minMaxPoints1v1: 100,
            minMaxPointsPvP: 100,
            minMaxUsersPvP: 3,
            password: '',
            store: null,

        };
    },

    methods: {
        selectOption(option) {
            this.selectedOption = option;
        },
        async createGame1v1() {
            const store = useAppStore();


            try {
                console.log(this.minMaxPoints1v1)
                const result = await createGame(this.minMaxPoints1v1, 2);
                await updateGameID(result);
                console.log("idfwa :" + result);
                const gameData = await getGameData(result);
                console.log(gameData[0].game_password);
                if (gameData && gameData[0].game_password) {

                    store.setGameInfo({
                        game_id: result,
                        password: gameData[0].game_password
                    })
                    console.log(result);
                    this.$router.push("/play");
                } else {
                    console.error("No se pudo obtener la contraseña del juego.");
                    // Puedes manejar esta situación de alguna manera, por ejemplo, mostrando un mensaje al usuario.
                }


            } catch (error) {
                console.log(error);
            }
        },
        async createGamePvP() {
            const store = useAppStore();

            try {
                const result = await createGame(this.minMaxPointsPvP, this.minMaxUsersPvP);
                await updateGameID(result);
                console.log("idfwa :" + result);
                const gameData = await getGameData(result);
                console.log(gameData[0].game_password);
                if (gameData && gameData[0].game_password) {

                    store.setGameInfo({
                        game_id: result,
                        password: gameData[0].game_password
                    })
                    console.log(result);
                    this.$router.push("/play");
                } else {
                    console.error("No se pudo obtener la contraseña del juego.");
                    // Puedes manejar esta situación de alguna manera, por ejemplo, mostrando un mensaje al usuario.
                }
            } catch (error) {
                console.log(error);
            }
        },
        joinGame() {
            if (this.gameId.trim() === "") {
                window.alert("La contraseña de la partida no puede estar vacía.");
                return;
            }

            // Continúa con la lógica de unirse al juego
            this.$router.push("/play");
        },

        checkMaxPoints1v1() {
            if (this.minMaxPoints1v1 > 700) {
                this.minMaxPoints1v1 = 700;
            } else if (this.minMaxPoints1v1 < 100) {
                this.minMaxPoints1v1 = 100
            }
        },
        checkMaxPointsPvP() {
            if (this.minMaxPointsPvP > 700) {
                this.minMaxPointsPvP = 700;
            } else if (this.minMaxPointsPvP < 100) {
                this.minMaxPointsPvP = 100
            }
        },
        checkMaxUsers() {
            if (this.minMaxUsersPvP > 50) {
                this.minMaxUsersPvP = 50;
            } else if (this.minMaxUsersPvP < 3) {
                this.minMaxUsersPvP = 3
            }
        },
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
}

.custom-container {
    background-color: #c1e4f5;
    min-height: 100vh;
    /* Altura mínima del contenedor igual a la altura de la ventana */
    /* Fondo azul claro para el contenedor */
}

.custom-card {
    border: 2px solid #000;
    margin-top: 30px;
    /* Espacio hacia arriba */
    max-width: 600px;
    margin-left: 175px;
    /* Ancho máximo de la tarjeta */
    margin-bottom: 20px;
    /* Espacio hacia abajo */
}
</style>