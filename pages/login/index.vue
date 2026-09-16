<template>
    <v-container fluid fill-height class="dark-gradient-banner ma-0 pa-0 overflow-hidden">
        <v-row align="center" justify="center" class="fill-height ma-0 pa-4 relative z-10">
            <v-col cols="12" sm="10" md="9" lg="8" xl="6" class="pa-0">
                <v-card class="elevation-24 rounded-xl overflow-hidden border-0">
                    <v-row no-gutters class="fill-height">
                        <v-col cols="12" md="6" class="pa-8 pa-sm-12 white d-flex flex-column justify-space-between">
                            <div>
                                <div class="d-flex align-center mb-8">
                                    <v-sheet
                                        color="grey lighten-4"
                                        rounded="lg"
                                        width="32"
                                        height="32"
                                        class="d-flex align-center justify-center ml-3"
                                    >
                                        <v-icon color="blue-grey darken-4" small>
                                            mdi-cube-outline
                                        </v-icon>
                                    </v-sheet>

                                    <span class="text-subtitle-2 font-weight-black blue-grey--text text--darken-4">
                                        سامانه مدیریت سازمانی
                                    </span>
                                </div>

                                <div class="mb-8 text-right">
                                    <h1 class="text-h5 font-weight-black blue-grey--text text--darken-4 mb-2">
                                        خوش آمدید
                                    </h1>

                                    <p class="text-caption blue-grey--text text--lighten-1 font-weight-medium mb-0">
                                        اطلاعات حساب کاربری خود را وارد کنید.
                                    </p>
                                </div>

                                <LoginForm :loading="loading" @submit="handleLogin" />
                            </div>

                            <div class="mt-8 text-center">
                                <v-divider class="mb-5"></v-divider>

                                <p class="text-caption blue-grey--text text--lighten-1 mb-3">
                                    نیاز به راهنمایی دارید؟
                                </p>

                                <a
                                    href="#"
                                    class="text-caption font-weight-bold primary--text text-decoration-none"
                                    @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')"
                                >
                                    تماس با پشتیبانی فنی
                                </a>
                            </div>
                        </v-col>

                        <v-col cols="12" md="6" class="hidden-sm-and-down brand-banner relative d-flex flex-column justify-space-between align-center pa-10 overflow-hidden">
                            <div class="banner-overlay"></div>

                            <div class="relative z-10 d-flex flex-column align-center text-center">
                                <v-sheet
                                    color="rgba(255,255,255,0.12)"
                                    rounded="lg"
                                    width="52"
                                    height="52"
                                    class="d-flex align-center justify-center mb-4"
                                >
                                    <v-icon color="white" size="28">
                                        mdi-cube-outline
                                    </v-icon>
                                </v-sheet>

                                <h3 class="white--text font-weight-black text-subtitle-1 mb-1">
                                    سامانه مدیریت سازمانی
                                </h3>

                                <p class="grey--text text--lighten-2 text-caption mb-0">
                                    مدیریت هوشمند فرآیندها
                                </p>
                            </div>

                            <div class="relative z-10 text-center brand-content">
                                <h2 class="white--text text-h5 font-weight-black mb-4 text-shadow-md line-height-tight">
                                    امنیت، سرعت و یکپارچگی
                                    <br>
                                    در فرآیندها
                                </h2>

                                <p class="grey--text text--lighten-3 text-body-2 font-weight-regular mb-0 text-shadow-sm line-height-relaxed">
                                    پلتفرمی متمرکز برای مدیریت داده‌ها،
                                    گزارش‌گیری پیشرفته و اتوماسیون
                                    فرآیندهای سازمانی.
                                </p>
                            </div>

                            <div class="relative z-10 d-flex align-center justify-center flex-wrap">
                                <div class="brand-feature mx-1">
                                    <v-icon small color="white" class="ml-1">
                                        mdi-shield-check-outline
                                    </v-icon>
                                    <span>امنیت بالا</span>
                                </div>

                                <div class="brand-feature mx-1">
                                    <v-icon small color="white" class="ml-1">
                                        mdi-speedometer
                                    </v-icon>
                                    <span>سرعت بالا</span>
                                </div>

                                <div class="brand-feature mx-1">
                                    <v-icon small color="white" class="ml-1">
                                        mdi-sync
                                    </v-icon>
                                    <span>یکپارچگی</span>
                                </div>
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

    components: {
        LoginForm
    },

    layout: 'auth',

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
                this.$toast.success('ورود با موفقیت انجام شد')
                this.$router.push('/news')
            } catch (error) {
                this.$toast.error(
                    error.message || 'شماره موبایل یا رمز عبور اشتباه است'
                )
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>
.brand-banner {
    background-image: url('~/assets/images/background.png');
    background-size: cover;
    background-position: center;
}

.banner-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        rgba(15, 23, 42, 0.35) 0%,
        rgba(15, 23, 42, 0.55) 45%,
        rgba(15, 23, 42, 0.95) 100%
    );
    z-index: 1;
}

.relative {
    position: relative;
}

.z-10 {
    z-index: 10;
}

.brand-content {
    max-width: 380px;
    width: 100%;
}

.brand-feature {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.text-shadow-md {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.text-shadow-sm {
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
}

.line-height-relaxed {
    line-height: 1.9;
}

.line-height-tight {
    line-height: 1.5;
}
</style>