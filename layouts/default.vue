<template>
    <v-app class="transparent-app">
        <div class="animated-bg d-flex flex-column min-vh-100">
            <client-only>
                <Background />
            </client-only>

            <AppNavbar />

            <v-main class="flex-grow-1">
                <v-container fluid class="px-4 px-md-8 py-6">
                    <Nuxt />
                </v-container>
            </v-main>

            <AppFooter />
        </div>
    </v-app>
</template>

<script>
import Background from '~/components/layout/Background.vue'
import AppNavbar from '~/components/layout/AppNavbar.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

export default {
    name: 'DefaultLayout',
    components: {
        Background,
        AppNavbar,
        AppFooter
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
    min-height: 100vh !important;
}

.flex-grow-1 {
    flex-grow: 1 !important;
}
</style>