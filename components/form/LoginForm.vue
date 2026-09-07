<template>
    <v-form ref="loginForm" v-model="valid" lazy-validation @submit.prevent="handleLogin">
        <BaseInput 
            append-icon="mdi-cellphone" 
            c-class="mb-2" 
            label="شماره موبایل" 
            placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
            rules="required, phone" 
            v-model="credentials.phone"
            type="tel" 
        />

        <BaseInput 
            append-icon="mdi-lock-outline" 
            c-class="mb-2" 
            label="رمز عبور" 
            rules="required" 
            v-model="credentials.password"
            type="password" 
        />

        <!-- <BaseAlert :message="errorMessage || error" type="error" /> -->

        <BaseButton :disabled="!valid" :loading="loading" class="mt-4" type="submit">
            ورود
        </BaseButton>
    </v-form>
</template>

<script>
import BaseInput from '~/components/base/BaseInput.vue';
// import BaseAlert from '~/components/base/BaseAlert.vue';
import BaseButton from '~/components/base/BaseButton.vue';

export default {
    name: 'LoginForm',
    components: { 
        BaseInput, 
        // BaseAlert, 
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
            errorMessage: '',
            credentials: { phone: '', password: '' }
        }
    },

    methods: {
        handleLogin() {
            this.errorMessage = '';
            
            if (this.$refs.loginForm && this.$refs.loginForm.validate()) {
                this.$emit('submit', { ...this.credentials });
            }
        }
    }
}
</script>