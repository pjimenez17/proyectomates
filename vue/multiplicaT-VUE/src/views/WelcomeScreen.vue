<template></template>
    
<script>
import { useAppStore } from '@/store/app';

export default {

    mounted() {
        const store = useAppStore();

        if (!store.isLoggedIn()) {
            window.alert("No has iniciado sesión");
            this.$router.push("/");
        }
    }
}

</script>
    
<template></template>
    
<script>
import { useAppStore } from '@/store/app';

export default {

    mounted() {
        const store = useAppStore();

        if (!store.isLoggedIn()) {
            window.alert("No has iniciado sesión");
            this.$router.push("/");
        }
    }
}

</script>
    