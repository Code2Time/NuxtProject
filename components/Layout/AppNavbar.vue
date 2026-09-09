<template>
    <div>
        <v-app-bar app flat color="rgba(15, 23, 42, 0.85)" height="70" class="px-2 px-sm-4 glass-header no-glow">
            <div class="d-flex align-center justify-space-between w-100" style="direction: rtl;">
                <div class="d-flex align-center cursor-pointer no-glow" @click="$router.push('/products')">
                    <v-icon color="#3B82F6" class="ml-2 no-glow">mdi-shield-check</v-icon>
                    <span class="font-weight-bold white--text text-h6 no-glow">پنل مدیریت</span>
                </div>

                <div class="d-none d-md-flex align-center">
                    <NavLinks :is-logged-in="isLoggedIn" />
                </div>

                <div class="d-flex align-center">
                    <div class="d-none d-md-flex align-center">
                        <AuthButtons :is-logged-in="isLoggedIn" @logout="handleLogout" />
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
                <NavLinks :is-logged-in="isLoggedIn" />

                <v-divider class="my-4 rgba-white-divider"></v-divider>

                <div class="px-4">
                    <AuthButtons :is-logged-in="isLoggedIn" :block="true" @logout="handleLogout" />
                </div>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import AuthButtons from '~/components/Navbar/AuthButtons.vue'
import NavLinks from '~/components/Navbar/NavLinks.vue'

export default {
    name: 'AppNavbar',
    components: {
        AuthButtons,
        NavLinks
    },

    data() {
        return {
            drawer: false
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.state.isLoggedIn;
        }
    },

    methods: {
        handleLogout() {
            if (process.client) {
                localStorage.removeItem('isLoggedIn');
                this.$store.commit('SET_LOGIN_STATUS', false);
                this.drawer = false;
                this.$toast.info('از حساب کاربری خارج شدید');                
                this.$router.push('/products');
            }
        }
    }
}
</script>

<style scoped>
.w-100 {
    width: 100% !important;
}
</style>