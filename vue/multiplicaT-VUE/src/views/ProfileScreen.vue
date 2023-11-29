<template>
    <v-container>
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
                                <v-text-field label="Nombre">{{ users.name }} </v-text-field>
                                <v-text-field label="Correo Electrónico">{{ users.mail }}</v-text-field>
                                <v-text-field label="Contraseña" type="password">{{ users.password }}</v-text-field>
                                <v-text-field label="Rol" :type="showPassword ? 'text' : 'password'"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="SeePasword()"
                                    type="number">{{ users.role }}</v-text-field>
                                <v-text-field label="Puntos">{{ users.points }}</v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary">Guardar</v-btn>
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
        this.mail = store.getUser();
        
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
  