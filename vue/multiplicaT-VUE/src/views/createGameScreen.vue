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
                                        @click="createGame">Crear
                                        Juego</v-btn>
                                </v-col>
                            </v-row>

                            <v-row justify="center" v-if="selectedOption === 'createMultiplayer'">
                                <v-col cols="12" md="8">
                                    <v-col cols="12" md="8">
                                        <v-text-field v-model="minMaxPointsPvP" label="Puntos para ganar" outlined
                                            type="number" @input="checkMaxPointsPvP"></v-text-field>
                                        <v-text-field v-model="minMaxUsersPvP" label="Usuarios" outlined
                                            type="number" @input="checkMaxUsers"></v-text-field>
                                        <v-slider v-model="minMaxPointsPvP" :max="700" :min="100" step="1"
                                            label="Puntuación"></v-slider>
                                        <v-slider v-model="minMaxUsersPvP" :max="50" :min="3" step="1"
                                            label="Usuarios"></v-slider>
                                        <v-btn color="blue" size="large" type="submit" variant="elevated"
                                            @click="createGame">Crear Juego</v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>

                            <v-row justify="center" v-if="selectedOption === 'joinGame'">
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="gameId" label="Contraseña de la Partida" outlined
                                        type="number"></v-text-field>
                                    <v-btn color="blue" size="large" type="submit" variant="elevated">Unirse</v-btn>

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
export default {
    data() {
        return {
            selectedOption: '',
            gameId: '',
            minMaxPoints1v1: 100,
            minMaxPointsPvP: 100,
            minMaxUsersPvP: 3
        };
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
        },
        createGame() {
            this.$router.push("/play")
        },
        checkMaxPoints1v1() {
            if (this.minMaxPoints1v1 > 700) {
                this.minMaxPoints1v1 = 700;
            }
        },
        checkMaxPointsPvP() {
            if (this.minMaxPointsPvP > 700) {
                this.minMaxPointsPvP = 700;
            }
        },
        checkMaxUsers() {
            if (this.minMaxUsersPvP > 50) {
                this.minMaxUsersPvP = 50;
            }
    },
}}
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