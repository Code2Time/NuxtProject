<template>
    <div class="d-flex flex-column flex-md-row align-stretch align-md-center fill-width">
        <BaseButton
            to="/news"
            exact
            active-class="active-tab"
            :block="false"
            :x-large="false"
            :rounded="false"
            elevation="0"
            text
            :ripple="false"
            c-class="mx-1 nav-btn my-1 my-md-0 justify-start justify-md-center"
        >
            <v-icon small class="ml-2">mdi-newspaper</v-icon>
            <span>اخبار و اطلاعیه‌ها</span>
        </BaseButton>

        <BaseButton
            to="/products"
            exact
            active-class="active-tab"
            :block="false"
            :x-large="false"
            :rounded="false"
            elevation="0"
            text
            :ripple="false"
            c-class="mx-1 nav-btn my-1 my-md-0 justify-start justify-md-center"
        >
            <v-icon small class="ml-2">mdi-store</v-icon>
            <span>فروشگاه محصولات</span>
        </BaseButton>

        <client-only>
            <BaseButton
                to="/products/favorites"
                exact
                active-class="active-tab"
                :block="false"
                :x-large="false"
                :rounded="false"
                elevation="0"
                text
                :ripple="false"
                c-class="mx-1 nav-btn my-1 my-md-0 justify-start justify-md-center"
            >
                <v-badge
                    :content="favCount"
                    :value="user_is_logged_in && favCount > 0"
                    color="red"
                    overlap
                    class="ml-2 d-inline-flex"
                >
                    <v-icon small>mdi-heart-outline</v-icon>
                </v-badge>
                <span>علاقه‌مندی‌ها</span>
            </BaseButton>
        </client-only>

        <client-only>
            <BaseButton
                to="/products/cart"
                exact
                active-class="active-tab"
                :block="false"
                :x-large="false"
                :rounded="false"
                elevation="0"
                text
                :ripple="false"
                c-class="mx-1 nav-btn my-1 my-md-0 justify-start justify-md-center"
            >
                <v-badge
                    :content="cart_total_count"
                    :value="user_is_logged_in && cart_total_count > 0"
                    color="red"
                    overlap
                    class="ml-2 d-inline-flex"
                >
                    <v-icon small>mdi-cart-outline</v-icon>
                </v-badge>
                <span>سبد خرید</span>
            </BaseButton>
        </client-only>

        <client-only v-if="user_is_logged_in">
            <BaseButton
                to="/profile"
                exact
                active-class="active-tab"
                :block="false"
                :x-large="false"
                :rounded="false"
                elevation="0"
                text
                :ripple="false"
                c-class="mx-1 nav-btn my-1 my-md-0 justify-start justify-md-center"
            >
                <v-icon small class="ml-2">mdi-account-cog</v-icon>
                <span>پروفایل کاربری</span>
            </BaseButton>
        </client-only>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'NavLinks',

    components: {
        BaseButton
    },

    props: {
        is_logged_in: { type: Boolean, default: false }
    },

    data() {
        return {
            favCount: 0
        }
    },

    computed: {
        ...mapGetters({
            cart_total_count: 'cartTotalCount'
        }),

        user_is_logged_in() {
            if (process.client) {
                return this.$store.getters.isLoggedIn || localStorage.getItem('is_logged_in') === 'true'
            }
            return this.is_logged_in
        }
    },

    mounted() {
        this.updateFavCount()
        window.addEventListener('favorites-updated', this.updateFavCount)
    },

    beforeDestroy() {
        window.removeEventListener('favorites-updated', this.updateFavCount)
    },

    methods: {
        updateFavCount() {
            if (this.$helper) {
                this.favCount = this.$helper.getFavoriteCount()
            }
        }
    }
}
</script>

<style scoped>
.fill-width {
    width: 100%;
}

::v-deep .nav-btn {
    color: #94a3b8 !important;
    letter-spacing: 0;
    font-weight: 500;
}

::v-deep .nav-btn:hover {
    color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.05) !important;
}

::v-deep .nuxt-link-exact-active.nav-btn,
::v-deep .nuxt-link-active.nav-btn,
::v-deep .active-tab {
    color: #ffffff !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>