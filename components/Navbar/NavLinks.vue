<template>
    <div :class="isMobile ? '' : 'd-none d-md-flex align-center'">
        <v-list-item
            v-if="isMobile"
            to="/news"
            exact
            active-class="active-tab-mobile"
            class="mb-2"
            :ripple="false"
        >
            <v-icon small class="ml-3" color="white">mdi-newspaper</v-icon>
            <v-list-item-content>
                <v-list-item-title class="white--text">اخبار و اطلاعیه‌ها</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-btn
            v-else
            to="/news"
            exact
            active-class="active-tab"
            class="mx-1 white--text"
            elevation="0"
            text
            :ripple="false"
        >
            <v-icon small class="ml-2">mdi-newspaper</v-icon>
            <span>اخبار و اطلاعیه‌ها</span>
        </v-btn>

        <v-list-item
            v-if="isMobile"
            to="/products"
            exact
            active-class="active-tab-mobile"
            class="mb-2"
            :ripple="false"
        >
            <v-icon small class="ml-3" color="white">mdi-store</v-icon>
            <v-list-item-content>
                <v-list-item-title class="white--text">فروشگاه محصولات</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-btn
            v-else
            to="/products"
            exact
            active-class="active-tab"
            class="mx-1 white--text"
            elevation="0"
            text
            :ripple="false"
        >
            <v-icon small class="ml-2">mdi-store</v-icon>
            <span>فروشگاه محصولات</span>
        </v-btn>

        <client-only>
            <v-list-item
                v-if="isMobile"
                to="/products/cart"
                exact
                active-class="active-tab-mobile"
                class="mb-2"
                :ripple="false"
            >
                <v-badge
                    :content="cartTotalCount"
                    :value="userIsLoggedIn && cartTotalCount > 0"
                    color="red"
                    overlap
                    class="ml-3 d-inline-flex"
                >
                    <v-icon small color="white">mdi-cart-outline</v-icon>
                </v-badge>
                <v-list-item-content>
                    <v-list-item-title class="white--text">سبد خرید</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-btn
                v-else
                to="/products/cart"
                exact
                active-class="active-tab"
                class="mx-1 white--text"
                elevation="0"
                text
                :ripple="false"
            >
                <v-badge
                    :content="cartTotalCount"
                    :value="userIsLoggedIn && cartTotalCount > 0"
                    color="red"
                    overlap
                    class="ml-2 d-inline-flex"
                >
                    <v-icon small>mdi-cart-outline</v-icon>
                </v-badge>
                <span>سبد خرید</span>
            </v-btn>
        </client-only>

        <client-only>
            <template v-if="userIsLoggedIn">
                <v-list-item
                    v-if="isMobile"
                    to="/profile"
                    exact
                    active-class="active-tab-mobile"
                    class="mb-2"
                    :ripple="false"
                >
                    <v-icon small class="ml-3" color="white">mdi-account-cog</v-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">پروفایل کاربری</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-btn
                    v-else
                    to="/profile"
                    exact
                    active-class="active-tab"
                    class="mx-1 white--text"
                    elevation="0"
                    text
                    :ripple="false"
                >
                    <v-icon small class="ml-2">mdi-account-cog</v-icon>
                    <span>پروفایل کاربری</span>
                </v-btn>
            </template>
        </client-only>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'NavLinks',
    props: {
        isLoggedIn: { type: Boolean, default: false }
    },

    computed: {
        ...mapGetters(['cartTotalCount']),

        isMobile() {
            return this.$vuetify.breakpoint.smAndDown
        },

        userIsLoggedIn() {
            if (process.client) {
                return this.$store.getters.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true'
            }
            return this.isLoggedIn
        }
    }
}
</script>