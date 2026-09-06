<template>
    <v-dialog v-model="dialog" max-width="400" persistent>
        <v-card class="glass-card pa-4 dark">
            <v-card-title class="white--text text-h6">تأیید هویت</v-card-title>
            
            <v-card-text>
                <p class="white--text">لطفاً برای ورود به پروفایل، رمز عبور خود را وارد کنید:</p>
                <v-text-field
                    v-model="inputPassword"
                    label="رمز عبور"
                    type="password"
                    outlined
                    dense
                    class="glass-input"
                    :error-messages="error"
                    @keyup.enter="verifyPassword"
                >
                </v-text-field>
            </v-card-text>
            
            <v-card-actions class="justify-end">
                <v-btn text color="white" @click="close">انصراف</v-btn>
                <v-btn color="primary" @click="verifyPassword">تأیید</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean
    },

    data() {
        return {
        inputPassword: '',
        error: ''
        }
    },
    
    computed: {
        dialog: {
        get() { return this.value },
        set(val) { this.$emit('input', val) }
        }
    },
    
    methods: {
        verifyPassword() {
        const savedPassword = this.$store.getters['auth/userPassword']

        if (this.inputPassword === savedPassword) {
            this.error = ''
            this.inputPassword = ''
            this.$emit('success')
        } else {
            this.error = 'رمز عبور وارد شده نادرست است.'
        }
        },
        close() {
        this.error = ''
        this.inputPassword = ''
        this.$emit('cancel')
        }
    }
}
</script>