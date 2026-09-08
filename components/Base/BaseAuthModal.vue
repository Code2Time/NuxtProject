<template>
    <v-dialog v-model="internalValue" max-width="400" persistent>
        <v-card class="glass-card pa-4 rounded-xl white--text text-rtl">
            <v-card-title class="text-h6 font-weight-bold d-flex align-center">
                <v-icon color="warning" class="ml-2">mdi-account-alert</v-icon>
                ورود به حساب کاربری
            </v-card-title>

            <v-card-text class="grey--text text--lighten-2 text-body-1 py-3">
                جهت افزودن این محصول به سبد خرید، ابتدا باید وارد حساب کاربری خود شوید.
            </v-card-text>

            <v-card-actions class="pt-4 justify-end">
                <v-btn text color="grey lighten-1" class="rounded-lg" @click="close">
                    انصراف
                </v-btn>
                
                <v-btn
                    color="primary"
                    class="rounded-lg font-weight-bold px-4"
                    :to="`/login/login?redirect=${encodeURIComponent($route.fullPath)}`"
                    @click="close"
                >
                    ورود به حساب
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'BaseAuthModal',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        internalValue: {
            get() {
                return this.value
            },

            set(val) {
                this.$emit('input', val)
            }
        }
    },

    methods: {
        close() {
            this.internalValue = false
        }
    }
}
</script>

<style scoped>
.text-rtl {
    direction: rtl;
}
</style>