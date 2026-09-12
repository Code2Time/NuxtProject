<template>
    <v-container fluid fill-height class="login-wrapper ma-0 pa-0 rtl-dir overflow-hidden">
        <v-row align="center" justify="center" class="fill-height ma-0 pa-4 relative z-10">
            <v-col cols="12" sm="10" md="9" lg="8" xl="6" class="pa-0">
                <v-card class="app-card rounded-2xl overflow-hidden border-0 elevation-12">
                    <v-row no-gutters class="fill-height">
                        <v-col cols="12" md="6" class="pa-8 pa-sm-12 bg-white d-flex flex-column justify-space-between white">
                            <div>
                                <div class="d-flex align-center mb-8">
                                    <div class="logo-box ml-3 rounded-lg d-flex align-center justify-center">
                                        <v-icon color="#0f172a" small>mdi-cube-outline</v-icon>
                                    </div>
                                    <span class="text-subtitle-2 font-weight-black slate-dark--text">سامانه مدیریت سازمانی</span>
                                </div>

                                <div class="mb-8 text-right">
                                    <h1 class="text-h5 font-weight-black slate-dark--text mb-2">خوش آمدید</h1>
                                    <p class="text-caption grey--text text--darken-1 font-weight-medium mb-0">جهت ورود به پنل کاربری، اطلاعات خود را وارد کنید.</p>
                                </div>

                                <LoginForm :loading="loading" @submit="handleLogin" />
                            </div>

                            <div class="mt-8 pt-4 border-t border-slate-100 d-flex justify-space-between align-center text-caption">
                                <span class="grey--text text--darken-1">نیاز به راهنمایی دارید؟</span>
                                <a href="#" class="font-weight-bold grey--text text--darken-3 text-decoration-none hover-link" @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')">
                                    پشتیبانی فنی
                                </a>
                            </div>
                        </v-col>

                        <v-col cols="12" md="6" class="hidden-sm-and-down brand-banner relative d-flex flex-column justify-end pa-10 overflow-hidden">
                            <div class="banner-overlay"></div>

                            <div class="relative z-10 text-right">
                                <h2 class="text-h5 font-weight-black white--text text-shadow mb-3">
                                    امنیت، سرعت و یکپارچگی در فرآیندها
                                </h2>
                                <p class="text-body-2 white--text font-weight-medium text-shadow opacity-95 mb-0 line-height-relaxed">
                                    پلتفرم متمرکز برای مدیریت داده‌ها، گزارش‌گیری پیشرفته و اتوماسیون کامل بخش‌های اداری.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '~/components/Form/LoginForm.vue'

export default {
    name: 'LoginPage',
    components: { LoginForm },
    layout: 'empty',
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async handleLogin(credentials) {
            this.loading = true
            try {
                await this.$store.dispatch('auth/login', credentials)

                if (this.$toast) {
                    this.$toast.success('ورود با موفقیت انجام شد')
                }

                const redirectPath = this.$route.query.redirect
                    ? decodeURIComponent(this.$route.query.redirect)
                    : '/products'

                this.$router.push(redirectPath)
            } catch (error) {
                if (this.$toast) {
                    this.$toast.error(error.message || 'شماره موبایل یا رمز عبور اشتباه است')
                }
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.login-wrapper {
    background-color: #0f172a;
    background-image: 
        radial-gradient(at 80% 20%, rgba(30, 58, 138, 0.35) 0px, transparent 50%),
        radial-gradient(at 20% 80%, rgba(15, 23, 42, 0.9) 0px, transparent 50%);
    min-height: 100vh;
}

.logo-box {
    width: 32px;
    height: 32px;
    background: #f1f5f9;
}

.slate-dark--text {
    color: #0f172a !important;
}

.border-slate-100 {
    border-top: 1px solid #f1f5f9 !important;
}

.brand-banner {
    background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80');
    background-size: cover;
    background-position: center;
    position: relative;
}

.banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg, 
        rgba(15, 23, 42, 0.2) 0%, 
        rgba(15, 23, 42, 0.75) 60%,
        rgba(15, 23, 42, 0.95) 100%
    ) !important;
    z-index: 1;
}

.relative { position: relative; }
.z-10 { z-index: 10 !important; }

.text-shadow {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
}

.opacity-95 {
    opacity: 0.95 !important;
}

.line-height-relaxed {
    line-height: 1.8 !important;
}

.hover-link:hover {
    color: #0f172a !important;
    text-decoration: underline !important;
}
</style>