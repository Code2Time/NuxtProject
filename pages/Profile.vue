<template>
    <v-container class="py-8">
        <v-row align="center" class="mb-6" no-gutters>
            <v-icon color="#3B82F6" x-large class="ml-3">mdi-account-cog</v-icon>
            <h1 class="text-h4 font-weight-bold grey--text text--darken-3">پروفایل کاربری</h1>
        </v-row>

        <v-card max-width="650" class="mx-auto rounded-xl elevation-3 overflow-hidden border-card">
            <v-sheet class="dark-gradient-banner pa-6 text-center white--text" dark>
                <v-avatar size="90" color="white" class="elevation-4 mb-3">
                    <v-icon size="60" color="#1E293B">mdi-account</v-icon>
                </v-avatar>
                <h2 class="text-h5 font-weight-bold">{{ user ? user.fullName : 'کاربر سیستم' }}</h2>
                <span class="blue--text text--lighten-4 text-caption d-block mt-1">
                    {{ user ? user.phone : '۰۹۱۱۱۱۱۱۱۱۱' }}
                </span>
            </v-sheet>

            <v-card-text class="pa-6">
                <v-list flat class="pa-0">
                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                نام و نام خانوادگی:
                            </v-list-item-title>
                        </v-list-item-content>
                        
                        <v-list-item-action>
                          <span class="font-weight-bold grey--text text--darken-3">
                              {{ user ? user.fullName : 'نامشخص' }}
                          </span>
                        </v-list-item-action>
                  </v-list-item>

                  <v-divider />

                  <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                شماره تماس:
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <span class="font-weight-bold grey--text text--darken-3">
                                {{ user ? user.phone : 'ثبت نشده' }}
                            </span>
                        </v-list-item-action>
                  </v-list-item>

                  <v-divider />

                  <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                سطح دسترسی:
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-chip color="#3B82F6" small class="white--text font-weight-bold">
                                {{ user ? user.role : 'کاربر عادی' }}
                            </v-chip>
                      </v-list-item-action>
                  </v-list-item>

                  <v-divider />

                    <v-list-item class="px-0">
                        <v-list-item-content>
                            <v-list-item-title class="grey--text text--darken-1 font-weight-medium">
                                وضعیت حساب:
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-chip color="#10B981" small class="white--text font-weight-bold">فعال</v-chip>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-card-text>

            <v-card-actions class="pa-6 pt-0">
                <BaseButton
                    color="error"
                    :block="true"
                    c-class="rounded-lg font-weight-bold"
                    @click="handleLogout"
                >
                    <v-icon left>mdi-logout</v-icon>
                    خروج از حساب کاربری
                </BaseButton>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'ProfilePage',

    components: {
        BaseButton
    },

    computed: {
        user() {
          return this.$store.getters['auth/currentUser']
        }
    },

    mounted() {
        this.checkAuthStatus()
    },

    methods: {
        checkAuthStatus() {
            const isLoggedIn = this.$store.getters['auth/isAuthenticated']
            if (!isLoggedIn) {
                if (this.$toast) {
                    this.$toast.error('برای مشاهده پروفایل ابتدا باید وارد شوید')
                }
                this.$router.push('/login?redirect=/profile')
            }
        },

        async handleLogout() {
            await this.$store.dispatch('auth/logout')
            if (this.$toast) {
                this.$toast.info('از حساب کاربری خارج شدید')
            }
            this.$router.push('/login')
          }
    }
}
</script>