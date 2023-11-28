<template>
    <v-container fluid>
        <v-row>
            <v-col class="text-center" cols="6">
                <v-card>
                    <v-card-title>
                        <h2>Bienvenido</h2>
                    </v-card-title>
                    <v-card-text>
                        <p></p>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Columna derecha para el menú -->
            <v-col class="text-center" cols="6">
                <v-card>
                    <v-card-title>
                        <h2>Menú</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item link to="/play">
                                <v-list-item-icon>
                                    <v-icon>mdi-play</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Jugar</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item link to="/profile">
                                <v-list-item-icon>
                                    <v-icon>mdi-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Perfil</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item link to="/ranking">
                                <v-list-item-icon>
                                    <v-icon>mdi-trophy</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Ranking</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item @click="logout">
                                <v-list-item-icon>
                                    <v-icon>mdi-exit-to-app</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>Salir</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
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
            username: '',
        };
    },
    mounted() {
        const store = useAppStore();

        if (!store.isLoggedIn()) {
            window.alert("No has iniciado sesión");
            this.$router.push("/");
        } else {
            this.username = store.getUsername();
        }
    },
    methods: {
        logout() {
            const store = useAppStore();
            store.setLoginInfo({ loggedIn: false, username: '' });
            this.$router.push('/');
        },
    },
};
</script>

  