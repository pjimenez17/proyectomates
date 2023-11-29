<template>
    <v-container>
        <v-switch label="Switch">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <span class="headline">Perfil de Usuario</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col v-for="users in user">
                                <v-subheader>Información Personal</v-subheader>

                                <p>NAME</p>
                                <v-text-field prepend-inner-icon="mdi-account">{{ users.name }} </v-text-field>
                                <p>MAIL</p>
                                <v-text-field prepend-inner-icon="mdi-email" >{{ users.mail }}</v-text-field>
                                <p>ROLE</p>
                                <v-text-field prepend-inner-icon="mdi-shield" >{{ users.role }}</v-text-field>
                                <p>POINTS</p>
                                <v-text-field prepend-inner-icon="mdi-trophy">{{ users.points }}</v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-switch>
    </v-container>
</template>
  
<script>

import { getuserbymail } from "../services/communicationsmanager.js"
import { useAppStore } from '@/store/app';

export default {
    data() {
        return {
            user: [],
            mail: ""
        };
    },
    methods: {
        /*
        saveProfile() {
            // Implementar la lógica para guardar el perfil del usuario
            console.log('Perfil guardado:', this.user);
        },*/
        SeePasword() {
            // Cambia el estado de showPassword al hacer clic en el botón
            this.showPassword = !this.showPassword;
        },
    },
    created() {
        console.log("CREADO");
        const store = useAppStore();
        const usermail= store.getMail();
        this.mail = usermail;
        console.log("MAIL PERFIL: ",this.mail);
    },
    mounted(){
        getuserbymail(this.mail).then((response) => {
            this.user = response;
            console.log(this.user);
        });
    }
};
</script>
  
<style scoped>
.headline {
    font-size: 24px;
    font-weight: bold;
}


</style>
  