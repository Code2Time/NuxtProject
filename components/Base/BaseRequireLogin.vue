<template>
    <v-card class="dark-gradient-banner pa-8 pa-md-10 text-center rounded-xl elevation-6 white--text border-card">
        <div class="mb-4 d-flex justify-center">
            <v-avatar color="rgba(255, 255, 255, 0.08)" size="80">
                <v-icon size="44" color="#60A5FA">
                    {{ icon }}
                </v-icon>
            </v-avatar>
        </div>

        <h2 class="text-h5 font-weight-bold white--text mb-3">
            {{ title }}
        </h2>

        <p class="grey--text text--lighten-2 text-body-2 mb-6">
            {{ description }}
        </p>

        <BaseButton
            to="/login"
            color="#2563EB"
            :block="false"
            c-class="white--text rounded-lg px-8 font-weight-bold elevation-2"
        >
            <v-icon right size="20" color="white" class="ml-2">
                mdi-login
            </v-icon>
                ورود به حساب کاربری
        </BaseButton>
    </v-card>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'RequireLogin',
    components: {
        BaseButton
    },
    props: {
        title: {
            type: String,
            default: 'جهت مشاهده این صفحه وارد شوید'
        },
        description: {
            type: String,
            default: 'برای دسترسی به این بخش و امکانات آن، ابتدا باید وارد حساب کاربری خود شوید.'
        },
        icon: {
            type: String,
            default: 'mdi-lock'
        }
    },

    computed: {
        // formattedIcon() {
        //     if (!this.icon) {
        //         return 'mdi-lock'
        //     }

        //     const cleanIcon = this.icon.trim()

        //     return cleanIcon.startsWith('mdi-')
        //         ? cleanIcon
        //         : `mdi-${cleanIcon}`
        // }
    }
}
</script>

<style scoped>
.border-card {
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
}
</style>