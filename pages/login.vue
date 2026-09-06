<template>
    <v-container fluid fill-height class="animated-bg ma-0 pa-0 overflow-hidden rtl-dir">
        <div class="bg-circles">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
            <div class="circle circle-3"></div>
        </div>

        <v-row align="center" justify="center" class="z-index-above fill-height my-0">
            <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="pa-4">
                <v-card class="glass-card pa-5 pa-sm-8 pa-md-8 rounded-xl elevation-0 text-center">
                    <h2 class="form-title mb-1">ورود به حساب</h2>
                    <p class="form-subtitle mb-6">خوش آمدید! لطفاً اطلاعات خود را وارد کنید</p>

                    <v-tabs v-model="tab" background-color="transparent" dark grow class="mb-6 custom-tabs">
                        <v-tab class="custom-tab-text">ورود</v-tab>
                        <v-tab class="custom-tab-text">ثبت نام</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab" class="transparent-tabs">
                        <v-tab-item>
                            <LoginForm
                                :loading="loading"
                                :error="loginError"
                                @submit="handleLogin"
                            />
                        </v-tab-item>

                        <v-tab-item>
                            <SignupForm
                                :loading="loading"
                                :error="registerError"
                                :success="registerSuccess"
                                @submit="handleRegister"
                            />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '~/components/form/LoginForm.vue';
import SignupForm from '~/components/form/SignupForm.vue';

export default {
    layout: 'empty',
    
    components: {
        LoginForm,
        SignupForm
    },

    data() {
        return {
            tab: 0,
            loading: false,
            loginError: '',
            registerError: '',
            registerSuccess: ''
        }
    },

    methods: {
        async handleLogin(credentials) {
            this.loading = true;
            this.loginError = '';

            try {
                await this.$store.dispatch('auth/login', credentials);
                this.$router.push('/');
            } catch (error) {
                this.loginError = error.message || 'خطا در ورود به سیستم';
            } finally {
                this.loading = false;
            }
        },

        async handleRegister(credentials) {
            this.loading = true;
            this.registerError = '';
            this.registerSuccess = '';

            try {
                await this.$store.dispatch('auth/register', credentials);
                this.registerSuccess = 'حساب کاربری با موفقیت ساخته شد! در حال انتقال به صفحه ورود...';

                setTimeout(() => {
                    this.tab = 0;
                    this.registerSuccess = '';
                }, 1500);
            } catch (error) {
                this.registerError = error.message || 'خطا در ثبت نام. لطفاً مجدداً تلاش کنید.';
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.rtl-dir {
    direction: rtl;
    text-align: right;
    font-family: 'Sahel', sans-serif !important;
}

.animated-bg {
    background: linear-gradient(135deg, #2b1055 0%, #7597de 50%, #d8682e 100%);
    position: relative;
    min-height: 100vh;
    width: 100vw !important;
}

.z-index-above {
    position: relative;
    z-index: 2;
}

.bg-circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
}

.circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(5px);
    animation: float 8s infinite ease-in-out;
}

.circle-1 {
    width: 250px;
    height: 250px;
    top: 10%;
    right: 15%;
    animation-delay: 0s;
}

.circle-2 {
    width: 350px;
    height: 350px;
    bottom: 5%;
    left: 10%;
    animation-delay: -3s;
    background: rgba(216, 104, 46, 0.25);
}

.circle-3 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 5%;
    animation-delay: -5s;
}

@keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
}

.glass-card {
    background: rgba(255, 255, 255, 0.08) !important;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.25) !important;
    box-shadow: none !important;
    width: 100%;
}

.form-title {
    font-family: 'Sahel', sans-serif !important;
    font-size: 1.6rem !important;
    font-weight: 700 !important;
    color: #ffffff !important;
    letter-spacing: -0.3px !important;
    line-height: 1.5 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15) !important;
}

.form-subtitle {
    font-family: 'Sahel', sans-serif !important;
    font-size: 0.95rem !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 0.85) !important;
    letter-spacing: 0 !important;
}

.custom-tab-text {
    font-weight: 700 !important;
    font-size: 1.1rem !important;
    letter-spacing: 0 !important;
}

::v-deep .v-tab--active {
    color: #ffffff !important;
    font-weight: 900 !important;
}

.transparent-tabs {
    background: transparent !important;
}
</style>