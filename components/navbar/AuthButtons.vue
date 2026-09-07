<template>
    <client-only>
        <v-btn
            v-if="is_logged_in"
            :block="block"
            :outlined="!block"
            color="#EF4444"
            class="white--text font-weight-bold rounded-lg no-glow"
            :ripple="false"
            @click="$emit('logout')"
        >
            <v-icon small class="ml-2 no-glow">mdi-logout</v-icon>
            {{ block ? 'خروج از حساب' : 'خروج' }}
        </v-btn>

        <v-btn
            v-else
            :block="block"
            color="#3B82F6"
            class="white--text font-weight-bold rounded-lg no-glow"
            :ripple="false"
            to="/login"
        >
            <v-icon small class="ml-2 no-glow">mdi-login</v-icon>
            ورود به حساب
        </v-btn>
    </client-only>
</template>

<script>
export default {
    name: 'AuthButtons',
    props: {
        is_logged_in: {
            type: Boolean,
            required: false
        },
        block: {
            type: Boolean,
            default: false
        }
    }
}
</script>