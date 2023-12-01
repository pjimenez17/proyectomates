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
                            <v-col>
                                <img :src="EditImag ? EditImag : defaultAvatar"/>

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
                            <v-col>
                                <img :src="EditImag ? EditImag : defaultAvatar" />

                                <p>IMAGEN</p>
                                <v-text-field  v-model="EditImag" class="text-field"></v-text-field>

                                <p>NAME</p>
                                <v-text-field v-model="this.EditName" prepend-inner-icon="mdi-account"
                                    class="text-field"></v-text-field>

                                <p>MAIL</p>
                                <v-text-field v-model="this.EditMail" prepend-inner-icon="mdi-email"
                                    class="text-field"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-switch v-model="EditMode" :color="EditMode ? 'green' : 'grey'"
                            :label="EditMode ? 'Edición Activada' : 'Edicion Desactivada'" @click="cancelEdit()">
                        </v-switch>

                    </v-card-text>
                    <v-card-actions v-if="EditMode">
                        <v-btn color="primary" @click="saveProfile() && changeImage()">Guardar</v-btn>
                        <v-btn color="red" @click="cancelEdit()">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
                <!-- Aviso de notificación -->
                <v-snackbar v-model="notificationSnackbar" :color="notificationSnackbarColor" :timeout="800">
                    {{ notification }}
                </v-snackbar>
            </v-col>
        </v-row>

    </v-container>
</template>
  
<script>

import { getuserbymail, updateUser } from "../services/communicationsmanager.js"
import { useAppStore } from '@/store/app';
import defaultAvatar from '../assets/avatar.png';



export default {
    data() {
        return {
            user: [],
            mail: "",
            EditMode: false,
            EditMail: "",
            EditName: "",
            EditImag: "",
            originalEditName: "", // Variable para almacenar el valor original de EditName
            originalEditMail: "",
            notification: "",
            notificationSnackbar: false,
            notificationSnackbarColor: "success", // Puedes personalizar el color según el tipo de mensaje
            defaultAvatar: defaultAvatar,
        };
    },
    methods: {

        saveProfile() {
            updateUser(this.EditName, this.EditMail, this.EditImag, this.mail).then((response) => {
                this.notification = response.message;

                console.log("Response: ", response);
                console.log(this.EditImag);

                const store = useAppStore();
                store.setMail(this.EditMail);
                store.SetUsername(this.EditName)
                this.EditMode = false;

                // Establece el color del Snackbar en función de si hay un error en la respuesta
                this.notificationSnackbar = true;
                this.notificationSnackbarColor = response.message.toLowerCase().includes("Failed") ? "error" : "success";

            });
        },
        SeePasword() {
            // Cambia el estado de showPassword al hacer clic en el botón
            this.showPassword = !this.showPassword;
        },
        cancelEdit() {
            // Restaura los campos de texto a sus valores originales
            this.EditName = this.user[0].name;
            this.EditMail = this.user[0].mail;
            this.EditMode = false; // Sale del modo de edición sin guardar
        },
        redirectToOfficialPage() {
            // Utiliza Vue Router para redirigir a la página oficial
            this.$router.push({ path: "/welcome" }); // Ajusta la ruta según tu configuración
        },
        changeImage() {
            // Muestra un cuadro de diálogo para que el usuario ingrese la nueva URL de la imagen
            this.$dialog.prompt({
                title: "Cambiar imagen",
                text: "Ingresa la nueva URL de la imagen:",
                modelValue: this.editImage,
                inputAttrs: {
                    placeholder: "URL de la imagen",
                },
            })
                .then((newImageUrl) => {
                    // Asigna la nueva URL de la imagen al modelo
                    this.editImage = newImageUrl;
                })
                .catch(() => {
                    // El usuario canceló el cambio de imagen
                });
        },

    },

    created() {
        console.log("CREADO");
        const store = useAppStore();
        const usermail = store.getMail();
        this.mail = usermail;
        console.log("MAIL PERFIL: ", this.mail);
    },

    mounted() {
        getuserbymail(this.mail).then((response) => {
            this.user = response;
            console.log(this.user);
            this.EditMail = this.user[0].mail;
            this.EditName = this.user[0].name;
            this.EditImag = this.user[0].profile_pic

            console.log("IMAGEN ",this.EditImag);
        });
    }
};
</script>
  
<style scoped>
.login-container {
    background-image: url("@/assets/");
    background-size: cover;
    background-position: center center;
    height: 90vh;
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

img {
    background-size: cover;
    max-height: 100px;
    /* Ajusta la altura máxima a tu preferencia */
    margin-right: 0px;
    /* Ajusta el margen derecho a tu preferencia */
}
</style>
  
