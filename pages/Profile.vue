<template>
    <div>
        <h1 class="white--text font-weight-bold mb-6 text-h4">
            <v-icon color="#3B82F6" large class="ml-2">mdi-account-cog</v-icon>
            پروفایل کاربری
        </h1>

        <v-card class="glass-card pa-6 rounded-xl white--text max-w-600 mx-auto">
            <div class="text-center mb-6">
                <v-avatar size="80" color="#3B82F6" class="mb-3">
                    <v-icon size="50" color="white">mdi-account</v-icon>
                </v-avatar>
                <h2 class="text-h5 font-weight-bold">کاربر سیستم</h2>
                <span class="grey--text text--lighten-1 text-caption">user@example.com</span>
            </div>

            <v-divider class="my-4 border-white-10"></v-divider>

            <div class="d-flex justify-space-between py-2">
                <span class="grey--text text--lighten-2">وضعیت حساب:</span>
                <v-chip color="#8B5CF6" small class="white--text font-weight-bold">فعال</v-chip>
            </div>
            <div class="d-flex justify-space-between py-2">
                <span class="grey--text text--lighten-2">سطح دسترسی:</span>
                <span class="font-weight-bold">مدیر سیستم</span>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ProfilePage',
    mounted() {
        if (process.client) {
            const is_logged_in = localStorage.getItem('isLoggedIn') === 'true';
            if (!is_logged_in) {
                if (this.$toast) {
                    this.$toast.error('برای مشاهده پروفایل ابتدا باید وارد شوید');
                }
                this.$router.push('/login');
            }
        }
    }
}
</script>

<style scoped>
.max-w-600 {
    max-width: 600px;
}
</style>