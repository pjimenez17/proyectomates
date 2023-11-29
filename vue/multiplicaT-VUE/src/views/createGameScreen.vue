<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">Crear o Unirse a una Partida</v-card-title>
                    <v-card-text>
                        <v-row justify="center" v-if="selectedOption === 'create1v1'">
                            <v-col cols="12" md="8">
                                <v-text-field v-model="minMaxPoints1v1" label="Puntos para ganar" outlined></v-text-field>
                                <v-slider v-model="minMaxPoints1v1" :max="700" :min="100" step="1"
                                    label="Puntuación"></v-slider>
                                <v-btn color="blue" size="large" type="submit" variant="elevated" @click="createGame" >Crear Juego</v-btn>
                            </v-col>
                        </v-row>

                        <v-row justify="center" v-if="selectedOption === 'createMultiplayer'">
                            <v-col cols="12" md="8">
                                <v-col cols="12" md="8">
                                    <v-text-field v-model="minMaxPointsPvP" label="Puntos para ganar"
                                        outlined></v-text-field>
                                    <v-text-field v-model="minMaxUsersPvP" label="Usuarios" outlined></v-text-field>
                                    <v-slider v-model="minMaxPointsPvP" :max="700" :min="100" step="1"
                                        label="Puntuación"></v-slider>
                                    <v-slider v-model="minMaxUsersPvP" :max="50" :min="3" step="1"
                                        label="Usuarios"></v-slider>
                                        <v-btn color="blue" size="large" type="submit" variant="elevated" @click="createGame" >Crear Juego</v-btn>
                                </v-col>
                            </v-col>
                        </v-row>

                        <v-row justify="center" v-if="selectedOption === 'joinGame'">
                            <v-col cols="12" md="8">
                                <v-text-field v-model="gameId" label="Contraseña de la Partida" outlined></v-text-field>
                                <v-btn color="blue" size="large" type="submit" variant="elevated" >Unirse</v-btn>

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
                                <v-btn block @click="selectOption('createMultiplayer')">Crear Partida Multiplayer</v-btn>
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
        createGame(){
            this.$router.push("/play")
        }
            
    },
};
</script>
  