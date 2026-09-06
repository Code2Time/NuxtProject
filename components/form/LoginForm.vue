<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <BaseInput 
            append-icon="mdi-cellphone" 
            c-class="mb-2" 
            label="شماره موبایل" 
            placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
            rules="required, phone" 
            type="tel" 
            v-model="credentials.phone"
        />

        <BaseInput 
            append-icon="mdi-lock-outline" 
            c-class="mb-2" 
            label="رمز عبور" 
            rules="required" 
            type="password" 
            v-model="credentials.password"
        />

        <!-- استفاده از errorMessage یا error پیام ورودی -->
        <BaseAlert :message="errorMessage || error" type="error" />

        <BaseButton :disabled="!valid" :loading="loading" class="mt-4" type="submit">
            ورود
        </BaseButton>
    </v-form>
</template>

<script>
import BaseInput from '~/components/base/BaseInput.vue';
import BaseAlert from '~/components/base/BaseAlert.vue';
import BaseButton from '~/components/base/BaseButton.vue';

export default {
    name: 'LoginForm',
    components: { 
        BaseInput, 
        BaseAlert, 
        BaseButton 
    },
    
    props: {
        loading: { 
            type: Boolean, 
            default: false 
        },
        error: { 
            type: String, 
            default: '' 
        }
    },

    data() {
        return {
            valid: true,
            errorMessage: '', // متغیر داخلی برای ذخیره خطای لاگین
            credentials: { phone: '', password: '' }
        }
    },

    methods: {
        async handleLogin() {
            this.errorMessage = ''; // پاک‌سازی خطای قبلی هنگام تلاش مجدد
            
            if (this.$refs.loginForm && this.$refs.loginForm.validate()) {
                try {
                    await this.$store.dispatch('auth/login', { ...this.credentials });
                    this.$router.push('/');
                } catch (err) {
                    // ذخیره پیغام خطا جهت نمایش در BaseAlert
                    this.errorMessage = err.message || 'خطا در ورود به سیستم';
                }
            }
        }
    }
}
</script>