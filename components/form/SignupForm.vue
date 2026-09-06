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

        <BaseAlert :message="error" type="error" class="mb-4" />
        <BaseAlert :message="success" type="success" class="mb-4" />

        <BaseButton
            :loading="loading"
            :disabled="!valid"
            type="submit"
            class="mt-4"
        >
            ثبت نام
        </BaseButton>
    </v-form>
</template>

<script>
import BaseAlert from '~/components/base/BaseAlert.vue';
import BaseButton from '~/components/base/BaseButton.vue';
import BaseInput from '~/components/base/BaseInput.vue';

export default {
    name: 'SignupForm',
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