<template>
    <v-container fluid fill-height class="animated-bg ma-0 pa-0 overflow-hidden rtl-dir">
        <v-row align="center" justify="center" class="z-index-above fill-height my-0">
            <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="pa-4">
                <v-card class="glass-card pa-5 pa-sm-8 pa-md-8 rounded-xl elevation-0 text-center">
                    <h2 class="form-title mb-1">ورود به حساب</h2>
                    <p class="form-subtitle mb-6">خوش آمدید! لطفاً اطلاعات خود را وارد کنید</p>

                    <v-tabs v-model="tab" background-color="transparent" dark grow class="mb-6 custom-tabs">
                        <v-tab class="custom-tab-text">ورود</v-tab>
                        <!-- <v-tab class="custom-tab-text">ثبت نام</v-tab> -->
                    </v-tabs>

                    <v-tabs-items v-model="tab" class="transparent-tabs">
                        <v-tab-item>
                            <LoginForm
                                :loading="loading"
                                @submit="handleLogin"
                            />
                        </v-tab-item>

                        <!-- <v-tab-item>
                            <SignupForm
                                :loading="loading"
                                @submit="handleRegister"
                            />
                        </v-tab-item> -->
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import LoginForm from '~/components/form/LoginForm.vue';
// import SignupForm from '~/components/form/SignupForm.vue';

export default {
    name: 'LoginPage',
    components: {
        LoginForm,
        // SignupForm
    },

    layout: 'empty',

    data() {
        return {
            tab: 0,
            loading: false
        }
    },

    methods: {
        handleLogin(credentials) {
            this.loading = true;

            setTimeout(() => {
                const isValidUser = credentials.phone === '09111111111' && credentials.password === '12345678';

                if (isValidUser) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('isLoggedIn', 'true');
                        this.$root.$emit('user-auth-changed');
                    }

                    if (this.$toast) {
                        this.$toast.success('ورود با موفقیت انجام شد!');
                    }

                    this.$router.push('/products');
                } else if (this.$toast) {
                    this.$toast.error('شماره موبایل یا رمز عبور اشتباه است.');
                }

                this.loading = false;
            }, 500);
        },

        handleRegister(credentials) {
            this.loading = true;

            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('isLoggedIn', 'true');
                    this.$root.$emit('user-auth-changed');
                }

                if (this.$toast) {
                    this.$toast.success('حساب کاربری با موفقیت ساخته شد!');
                }

                this.loading = false;
                this.$router.push('/products');
            }, 500);
        }
    }
}
</script>

<style scoped>
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