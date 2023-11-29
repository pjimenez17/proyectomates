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
                            <v-col>
                                <v-subheader>Información Personal</v-subheader>
                                <v-text-field label="Nombre" v-model="user.name"></v-text-field>
                                <v-text-field label="Correo Electrónico" v-model="user.email"></v-text-field>
                                <v-text-field label="Contraseña" v-model="user.password" type="password"></v-text-field>
                                <v-text-field label="Rol" v-model="user.age" type="number"></v-text-field>
                                <v-text-field label="Puntos" v-model="user.username"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="saveProfile">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                age: 25,
                username: 'johndoe',
                password: '********'
            }
        };
    },
    methods: {
        saveProfile() {
            // Implementar la lógica para guardar el perfil del usuario
            console.log('Perfil guardado:', this.user);
        }
    },
    created(){
        
    }
};
</script>
  
<style scoped>
.headline {
    font-size: 24px;
    font-weight: bold;
}
</style>
  