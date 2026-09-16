<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <div class="mb-5 text-right">
            <label class="text-caption font-weight-bold slate-dark--text mb-2 d-block">
                شماره همراه
            </label>

            <BaseInput
                v-model="credentials.phone"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                type="tel"
                dir="ltr"
                append-icon="mdi-cellphone"
                rules="required,phone"
                :dark="false"
                c-class="light-input-field"
            />
        </div>

        <div class="mb-2 text-right">
            <div class="d-flex justify-space-between align-center mb-2">
                <label class="text-caption font-weight-bold slate-dark--text mb-0">
                    رمز عبور
                </label>

                <a href="#" class="text-caption grey--text text--darken-1 text-decoration-none hover-blue" @click.prevent="$toast.info('لطفاً با پشتیبانی سیستم تماس بگیرید')">
                    فراموشی رمز؟
                </a>
            </div>

            <BaseInput
                v-model="credentials.password"
                placeholder="••••••••"
                type="password"
                dir="ltr"
                append-icon="mdi-lock-outline"
                rules="required"
                :dark="false"
                :show-password-toggle="true"
                c-class="light-input-field"
            />
        </div>

        <div class="mt-8">
            <BaseButton
                type="submit"
                color="#0f172a"
                :loading="loading"
                :disabled="!valid"
                :block="true"
                c-class="corporate-btn-primary"
            >
                ورود به حساب
            </BaseButton>
        </div>
    </v-form>
</template>

<script>
import BaseInput from '~/components/Base/BaseInput.vue'

export default {
    name: 'LoginForm',
    components: {
        BaseInput
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            valid: true,
            credentials: {
                phone: '',
                password: ''
            }
        }
    },
    methods: {
        handleLogin() {
            if ( this.$refs.loginForm && !this.$refs.loginForm.validate()) { return }
            this.$emit('submit', {...this.credentials})
        }
    }
}
</script>

<style scoped>
.slate-dark--text {
    color: #334155;
}

.hover-blue:hover {
    color: #2563eb !important;
}

::v-deep .light-input-field .v-input__slot {
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    box-shadow: none !important;
    border-radius: 10px !important;
}

::v-deep .light-input-field.v-input--is-focused .v-input__slot {
    border-color: #0f172a !important;
    background: #ffffff !important;
}

::v-deep .light-input-field input {
    color: #0f172a !important;
    font-size: 0.95rem !important;
    font-weight: 600 !important;
}

::v-deep .light-input-field .v-icon {
    color: #64748b !important;
}

.corporate-btn-primary {
    height: 48px !important;
    transition: all 0.2s ease;
}

.corporate-btn-primary:hover {
    background-color: #1e293b !important;
    box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3) !important;
}
</style>