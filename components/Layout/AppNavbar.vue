<template>
    <div>
        <client-only>
            <v-navigation-drawer v-model="drawer" right app temporary class="pa-4">
                <div class="d-flex align-center justify-space-between mb-4">
                    <div class="d-flex align-center">
                        <v-icon color="#3B82F6" class="ml-2" size="28">mdi-shield-check</v-icon>
                        <span class="text-h6 font-weight-bold">فروش محصول و خدمات</span>
                    </div>
                    <v-btn icon @click="drawer = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>

                <v-divider class="mb-4"></v-divider>

                <v-list nav dense>
                    <v-list-item to="/news" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-bullhorn-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">اخبار و اطلاعات</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/products" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-store-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">فروشگاه محصولات</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/favorites" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-heart-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">علاقه‌مندی‌ها</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/cart" exact active-class="blue lighten-5 blue--text text--darken-2">
                        <v-list-item-icon><v-icon>mdi-cart-outline</v-icon></v-list-item-icon>
                        <v-list-item-title class="font-weight-bold">سبد خرید</v-list-item-title>
                    </v-list-item>

                    <template v-if="isAuthenticated">
                        <v-divider class="my-2"></v-divider>
                        <v-list-item to="/profile" exact active-class="blue lighten-5 blue--text text--darken-2">
                            <v-list-item-icon><v-icon>mdi-account-cog-outline</v-icon></v-list-item-icon>
                            <v-list-item-title class="font-weight-bold">پروفایل کاربری</v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-navigation-drawer>
        </client-only>

        <v-app-bar app color="#1E293B" dark height="70" flat class="px-md-4">
            <v-container class="pa-0 d-flex align-center max-width-xl">
                <v-btn icon class="d-md-none ml-2" @click="drawer = !drawer">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>

                <NuxtLink to="/" class="d-flex align-center text-decoration-none white--text">
                    <v-icon color="#3B82F6" class="ml-2" size="28">mdi-shield-check</v-icon>
                    <span class="text-h6 font-weight-bold">پنل فروش محصول و خدمات</span>
                </NuxtLink>

                <v-spacer />

                <div class="d-none d-md-flex align-center nav-links">
                    <BaseButton
                        text
                        to="/news"
                        active-class="active-link"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                    >
                        <v-icon right size="18" class="ml-1">mdi-bullhorn-outline</v-icon>
                        اخبار و اطلاعات
                    </BaseButton>

                    <BaseButton
                        text
                        to="/products"
                        active-class="active-link"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                    >
                        <v-icon right size="18" class="ml-1">mdi-store-outline</v-icon>
                        فروشگاه محصولات
                    </BaseButton>

                    <BaseButton
                        text
                        to="/favorites"
                        active-class="active-link"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                    >
                        <v-icon right size="18" class="ml-1">mdi-heart-outline</v-icon>
                        علاقه‌مندی‌ها
                    </BaseButton>

                    <BaseButton
                        text
                        to="/cart"
                        active-class="active-link"
                        :block="false"
                        :x-large="false"
                        :rounded="false"
                        c-class="mx-1 rounded-lg"
                    >
                        <v-icon right size="18" class="ml-1">mdi-cart-outline</v-icon>
                        سبد خرید
                    </BaseButton>
                </div>

                <v-spacer />

                <client-only>
                    <div class="d-flex align-center">
                        <template v-if="isAuthenticated">
                            <BaseButton
                                text
                                to="/profile"
                                color="grey lighten-1"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="mx-1 rounded-lg caption d-none d-md-flex"
                            >
                                <v-icon right size="18" class="ml-1">mdi-account-cog-outline</v-icon>
                                پروفایل کاربری
                            </BaseButton>

                            <BaseButton
                                text
                                color="red lighten-2"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="mx-1 rounded-lg caption"
                                @click="handleLogout"
                            >
                                <v-icon right size="18" class="ml-1">mdi-logout</v-icon>
                                خروج
                            </BaseButton>
                        </template>

                        <template v-else>
                            <BaseButton
                                color="#3B82F6"
                                to="/login"
                                :block="false"
                                :x-large="false"
                                :rounded="false"
                                c-class="rounded-lg font-weight-bold px-4 elevation-1 white--text"
                            >
                                <v-icon right size="18" class="ml-1">mdi-login</v-icon>
                                ورود به حساب
                            </BaseButton>
                        </template>
                    </div>
                </client-only>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'AppNavbar',
    components: { BaseButton },
    data() {
        return {
            drawer: false
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },
    methods: {
        handleLogout() {
            this.$store.dispatch('auth/logout')
            if (this.$route.path !== '/') {
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped>
.max-width-xl {
    max-width: 1300px !important;
}

.nav-links ::v-deep .v-btn {
    letter-spacing: normal !important;
    font-size: 0.9rem !important;
    color: #cbd5e1 !important;
    transition: all 0.2s ease;
}

.nav-links ::v-deep .v-btn:hover {
    color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
}

.active-link {
    color: #ffffff !important;
    background-color: rgba(59, 130, 246, 0.2) !important;
    border: 1px solid rgba(59, 130, 246, 0.4) !important;
}
</style>