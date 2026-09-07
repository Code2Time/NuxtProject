<template>
    <div>
        <v-app-bar app flat color="rgba(15, 23, 42, 0.85)" height="70" class="px-2 px-sm-4 glass-header no-glow">
            <div class="d-flex align-center justify-space-between w-100" style="direction: rtl;">
                <div class="d-flex align-center cursor-pointer no-glow" @click="$router.push('/products')">
                    <v-icon color="#3B82F6" class="ml-2 no-glow">mdi-shield-check</v-icon>
                    <span class="font-weight-bold white--text text-h6 no-glow">پنل مدیریت</span>
                </div>

                <NavLinks :is-logged-in="is_logged_in" />

                <div class="d-flex align-center">
                    <div class="d-none d-md-flex align-center">
                        <AuthButtons :is-logged-in="is_logged_in" @logout="handle_logout" />
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
                <NavLinks :is-logged-in="is_logged_in" :is-mobile="true" />
                <v-divider class="my-4 rgba-white-divider"></v-divider>
                <div class="px-4">
                    <AuthButtons :is-logged-in="is_logged_in" :block="true" @logout="handle_logout" />
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
            is_logged_in: false,
            drawer: false
        }
    },
    watch: {
        $route: {
            handler() {
                this.check_login_status();
                this.drawer = false;
            },
            immediate: true
        }
    },
    mounted() {
        this.check_login_status();
        this.$root.$on('user-auth-changed', this.check_login_status);
    },
    beforeDestroy() {
        this.$root.$off('user-auth-changed', this.check_login_status);
    },
    methods: {
        check_login_status() {
            if (process.client) {
                this.is_logged_in = localStorage.getItem('isLoggedIn') === 'true';
            }
        },
        handle_logout() {
            if (process.client) {
                localStorage.removeItem('isLoggedIn');
                this.is_logged_in = false;
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

.active-tab {
    color: #3B82F6 !important;
    background: rgba(59, 130, 246, 0.15) !important;
    border-bottom: 2px solid #3B82F6;
}

.active-tab-mobile {
    background: rgba(59, 130, 246, 0.2) !important;
    border-right: 4px solid #3B82F6;
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