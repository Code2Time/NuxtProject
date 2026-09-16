<template>
    <v-form ref="registerForm" v-model="valid" lazy-validation @submit.prevent="handleRegister">
        <BaseInput
            v-model="credentials.name"
            label="نام و نام خانوادگی"
            placeholder="علی محمدی"
            append-icon="mdi-account-outline"
            rules="required"
            c-class="mb-2"
        />

        <BaseInput
            v-model="credentials.phone"
            label="شماره موبایل"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            append-icon="mdi-cellphone"
            type="tel"
            c-class="mb-2"
            rules="required, phone"
        />

        <BaseInput
            v-model="credentials.password"
            label="رمز عبور"
            type="password"
            append-icon="mdi-lock-outline"
            c-class="mb-2"
            rules="required, min8"
        />
        <BaseButton
            :loading="loading"
            :disabled="!valid"
            type="submit"
            c-class="mt-4"
        >
            ثبت نام
        </BaseButton>
    </v-form>
</template>

<script>
export default {
    name: 'SignupForm',
    props: {
        loading: { 
            type: Boolean, 
            default: false 
        },
        
        error: { 
            type: String, 
            default: '' 
        },
        
        success: { 
            type: String, 
            default: '' 
        }
    },

    data() {
        return {
            valid: true,
            credentials: { name: '', phone: '', password: '' }
        }
    },

    methods: {
        handleRegister() {
            const form = this.$refs.registerForm;
            
            if (form && form.validate()) {
                this.$emit('submit', {
                    fullName: this.credentials.name,
                    phone: this.credentials.phone,
                    password: this.credentials.password
                });
            }
        }
    }
}
</script>