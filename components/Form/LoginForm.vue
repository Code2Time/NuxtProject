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
            dir="ltr"
        />

        <BaseInput 
            append-icon="mdi-lock-outline" 
            c-class="mb-2" 
            label="رمز عبور" 
            rules="required" 
            v-model="credentials.password"
            type="password" 
        />

        <BaseButton :disabled="!valid" :loading="loading" class="mt-4" type="submit">
            ورود
        </BaseButton>
    </v-form>
</template>

<script>
import BaseInput from '~/components/Base/BaseInput.vue';
import BaseButton from '~/components/Base/BaseButton.vue';

export default {
    name: 'LoginForm',
    components: { 
        BaseInput, 
        BaseButton 
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

<style scoped>
::v-deep input {
  text-align: left !important;
  direction: ltr !important;
}
</style>