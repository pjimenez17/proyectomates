<template>
    <v-container fluid>
        <v-row>

            <v-col class="benvingut" cols="6">
                <v-card>
                    <v-card-title>
                        <h2>{{ `¡Bienvenido, ${this.username}!` }}</h2>
                    </v-card-title>
                    <v-card-text>
                        <p></p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col class="opcions" cols="12" md="6">
                <v-card>
                    <v-card-title class="text-h5">Menú</v-card-title>
                    <v-card-text>
                        <v-list dense>
                            <router-link to="/play" class="router-link">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-play</v-icon>
                                    </v-list-item-icon>
                                    Jugar
                                </v-list-item>
                            </router-link>
                            <router-link to="/profile" class="router-link">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-account</v-icon>
                                    </v-list-item-icon>
                                    Perfil
                                </v-list-item>
                            </router-link>
                            <router-link to="/ranking" class="router-link">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-trophy</v-icon>
                                    </v-list-item-icon>
                                    Ranking
                                </v-list-item>
                            </router-link>
                            <router-link @click="logout" to="/" class="router-link">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-exit-to-app</v-icon>
                                    </v-list-item-icon>
                                    Salir
                                </v-list-item>
                            </router-link>
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
            const loginInfo = store.getLoginInfo();
            this.username = loginInfo.username;
            console.log(this.username);
        }
    },
    methods: {
        logout() {
            const store = useAppStore();
            store.setLoginInfo({
                loggedIn: false,
                username: ""
            })
            this.$router.push('/');
        },
    },
};
</script>

<style scoped>
.router-link {
    color: inherit;
    text-decoration: none;
}

.router-link:hover {
    color: rgb(27, 38, 194);
}
</style>
  