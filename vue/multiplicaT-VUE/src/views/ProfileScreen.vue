<template>
    <v-container fluid class="login-container" :class="{ 'edit-disabled': EditMode }">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title>
                        <span>Perfil de Usuario</span>
                    </v-card-title>
                    <br />
                    <v-card-text v-for="users in user">
                        <v-row v-if="!EditMode">
                            <v-col  >
                                <p>NAME</p>
                                <v-text-field v-model="this.EditName" :readonly="!EditMode" v-if="users.name"
                                    prepend-inner-icon="mdi-account" class="text-field"></v-text-field>

                                <p>MAIL</p>
                                <v-text-field v-model="this.EditMail" :readonly="!EditMode" v-if="users.mail"
                                    prepend-inner-icon="mdi-email" class="text-field"></v-text-field>

                                <p>ROLE</p>
                                <v-text-field :readonly="!EditMode || EditMode" v-if="users.role && !EditMode"
                                    prepend-inner-icon="mdi-shield" class="text-field">{{
                                        users.role }}</v-text-field>

                                <p>POINTS</p>
                                <v-text-field :readonly="!EditMode || EditMode"
                                    v-if="users.hasOwnProperty('points') && !EditMode" prepend-inner-icon="mdi-trophy"
                                    class="text-field">{{ users.points }}</v-text-field>

                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col  >
                                <p>NAME</p>
                                <v-text-field v-model="this.EditName"
                                    prepend-inner-icon="mdi-account" class="text-field"></v-text-field>

                                <p>MAIL</p>
                                <v-text-field v-model="this.EditMail"
                                    prepend-inner-icon="mdi-email" class="text-field"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-switch v-model="EditMode" :color="EditMode ? 'green' : 'grey'"
                            :label="EditMode ? 'Edición Activada' : 'Edicion Desactivada'">
                        </v-switch>

                    </v-card-text>
                    <v-card-actions v-if="EditMode">
                        <v-btn color="primary" @click="saveProfile()">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>

import { getuserbymail } from "../services/communicationsmanager.js"
import { useAppStore } from '@/store/app';


export default {
    data() {
        return {
            user: [],
            mail: "",
            EditMode: false,
            EditMail: "",
            EditName: ""
        };
    },
    methods: {

        saveProfile() {
            // Implementar la lógica para guardar el perfil del usuario
            console.log('Name guardado:', this.EditName);
            console.log('Mail guardado:', this.EditMail);
            console.log(this.EditMode);

        },
        SeePasword() {
            // Cambia el estado de showPassword al hacer clic en el botón
            this.showPassword = !this.showPassword;
        },
        volver() {
            getuserbymail(this.mail).then((response) => {
                this.user = response;
                console.log(this.user);
            })
        },
    },
    created() {
        console.log("CREADO");
        const store = useAppStore();
        const usermail = store.getMail();
        this.mail = usermail;
        console.log("MAIL PERFIL: ", this.mail);
        console.log(this.EditMode);
    },
    mounted() {
        getuserbymail(this.mail).then((response) => {
            this.user = response;
            console.log(this.user);
            this.EditMail = this.user[0].mail;
            this.EditName = this.user[0].name;
        });
        console.log(this.EditMode);

    }
};
</script>
  
<style scoped>
.login-container {
    background-image: url("@/assets/");
    background-size: cover;
    background-position: center center;
    height: 100vh;
    /* Ajusta la altura según sea necesario */
    display: flex;
    justify-content: center;
    align-items: center;
}

.headline {
    font-size: 24px;
    font-weight: bold;
}

.text-field {
    pointer-events: none;
}

.edit-disabled .text-field {
    pointer-events: auto;
    /* Habilitar pointer events cuando EditMode es false */
}

span {

    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-message {
    text-align: center;
    margin-top: 5px;
    font-weight: bold;
}
</style>
  
