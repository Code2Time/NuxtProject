<template>
    <client-only>
        <div>
            <v-btn
                v-if="isLoggedIn"
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
                to="/login/login"
            >
                <v-icon small class="ml-2 no-glow">mdi-login</v-icon>
                ورود به حساب
            </v-btn>
        </div>
    </client-only>
</template>

<script>
export default {
    name: 'AuthButtons',
    props: {
        isLoggedIn: { type: Boolean, default: false },
        block: { type: Boolean, default: false }
    }
}
</script>