<template>
    <v-card class="glass-card pa-6 pa-md-8 rounded-xl" flat>
        <div class="d-flex align-center mb-6">
            <v-avatar size="56" class="ml-4 color-avatar">
                <v-icon size="32" color="white">mdi-account-check</v-icon>
            </v-avatar>
            <div>
                <h2 class="form-title mb-1">تنظیمات حساب کاربری</h2>
                <p class="form-subtitle mb-0">مدیریت اطلاعات شخصی و سطح دسترسی سیستم</p>
            </div>
        </div>

        <v-row class="mt-2">
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="profileData.fullName"
                    label="نام و نام خانوادگی"
                    outlined
                    dense
                    class="glass-input"
                    readonly
                />
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model="profileData.phone"
                    label="شماره موبایل"
                    outlined
                    dense
                    class="glass-input"
                    readonly
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'ProfileSection',

    computed: {
        profileData() {
            const userFromStore = this.$store.getters['auth/currentUser'];
            if (userFromStore && userFromStore.phone) {
                return userFromStore;
            }

            if (process.client) {
                const storedUser = localStorage.getItem('user_info');
                if (storedUser) {
                    return JSON.parse(storedUser);
                }
            }

            return {
                fullName: 'مشخص نشده',
                phone: 'مشخص نشده',
                email: 'مشخص نشده',
                role: 'کاربر عادی',
                lastLogin: '-'
            };
        }
    },

    mounted() {
        this.$store.dispatch('auth/initAuth');
    }
}
</script>