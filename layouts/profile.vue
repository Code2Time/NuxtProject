<template>
    <AppBackground>
        <v-app class="transparent-app">
            <div class="animated-bg d-flex flex-column min-vh-100">
                <v-main class="flex-grow-1 main-content">
                    <v-container fluid class="px-4 px-md-8 py-6">
                        <Nuxt />
                    </v-container>
                </v-main>
            </div>
        </v-app>
    </AppBackground>
</template>

<script>
import AppBackground from '~/components/Layout/AppBackground.vue'

export default {
    name: 'ProfileLayout',

    components: {
        AppBackground
    }
}
</script>

<style scoped>
.transparent-app {
    background: transparent !important;
}

.animated-bg {
    position: relative;
    width: 100%;
}

.min-vh-100 {
    min-height: 100vh;
}

.main-content {
    padding-top: 24px !important;
}
</style>