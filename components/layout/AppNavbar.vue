<template>
    <div>
        <v-app-bar app flat color="rgba(15, 23, 42, 0.85)" height="70" class="px-2 px-sm-4 glass-header no-glow">
            <div class="d-flex align-center justify-space-between w-100" style="direction: rtl;">
                <div class="d-flex align-center cursor-pointer no-glow" @click="$router.push('/products')">
                    <v-icon color="#3B82F6" class="ml-2 no-glow">mdi-shield-check</v-icon>
                    <span class="font-weight-bold white--text text-h6 no-glow">پنل مدیریت</span>
                </div>

                <NavLinks :is_logged_in="isLoggedIn" />

                <div class="d-flex align-center">
                    <div class="d-none d-md-flex align-center">
                        <AuthButtons :is_logged_in="isLoggedIn" @logout="handleLogout" />
                    </div>

                    <v-btn
                        icon
                        color="white"
                        class="d-md-none mr-2 no-glow"
                        :ripple="false"
                        @click.stop="drawer = !drawer"
                    >
                        <v-icon>mdi-menu</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            fixed
            right
            temporary
            color="rgba(15, 23, 42, 0.95)"
            class="glass-drawer no-glow"
        >
            <v-list class="pt-4" style="direction: rtl;">
                <NavLinks :is_logged_in="isLoggedIn" :is_mobile="true" />

                <v-divider class="my-4 rgba-white-divider"></v-divider>

                <div class="px-4">
                    <AuthButtons :is_logged_in="isLoggedIn" :block="true" @logout="handleLogout" />
                </div>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import AuthButtons from '~/components/navbar/AuthButtons.vue'
import NavLinks from '~/components/navbar/NavLinks.vue'

export default {
    name: 'AppNavbar',
    components: {
        AuthButtons,
        NavLinks
    },

    data() {
        return {
            isLoggedIn: false,
            drawer: false
        }
    },

    watch: {
        $route: {
            handler() {
                this.checkLoginStatus();
                this.drawer = false;
            },
            immediate: true
        }
    },

    mounted() {
        this.checkLoginStatus();
        this.$root.$on('user-auth-changed', this.checkLoginStatus);
    },

    beforeDestroy() {
        this.$root.$off('user-auth-changed', this.checkLoginStatus);
    },

    methods: {
        checkLoginStatus() {
            if (process.client) {
                this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            }
        },

        handleLogout() {
            if (process.client) {
                localStorage.removeItem('isLoggedIn');
                this.isLoggedIn = false;
                this.drawer = false;
                this.$root.$emit('user-auth-changed');
                
                if (this.$toast) {  
                    this.$toast.info('از حساب کاربری خارج شدید');
                }
                
                this.$router.push('/products');
            }
        }
    }
}
</script>

<style scoped>
.glass-header {
    background-color: rgba(15, 23, 42, 0.85) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.glass-drawer {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.w-100 {
    width: 100% !important;
}

.cursor-pointer {
    cursor: pointer;
}

.rgba-white-divider {
    border-color: rgba(255, 255, 255, 0.1) !important;
}

.no-glow,
.no-glow *,
.no-glow::before,
.no-glow::after {
    text-shadow: none !important;
    box-shadow: none !important;
    filter: none !important;
    drop-shadow: none !important;
}

.v-btn::before {
    background-color: transparent !important;
}
</style>