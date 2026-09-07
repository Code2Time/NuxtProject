<template>
    <div :class="is_mobile ? '' : 'd-none d-md-flex align-center'">
        <component
            :is="is_mobile ? 'v-list-item' : 'v-btn'"
            to="/news"
            exact
            :active-class="is_mobile ? 'active-tab-mobile' : 'active-tab'"
            :class="is_mobile ? 'mb-2' : 'mx-1 white--text no-glow'"
            :text="!is_mobile"
            :ripple="false"
        >
            <v-icon :small="!is_mobile" :class="is_mobile ? 'ml-3' : 'ml-2 no-glow'" :color="is_mobile ? 'white' : ''">mdi-newspaper</v-icon>
            <span v-if="!is_mobile">اخبار و اطلاعیه‌ها</span>
            <v-list-item-content v-else>
                <v-list-item-title class="white--text">اخبار و اطلاعیه‌ها</v-list-item-title>
            </v-list-item-content>
        </component>

        <component
            :is="is_mobile ? 'v-list-item' : 'v-btn'"
            to="/products"
            exact
            :active-class="is_mobile ? 'active-tab-mobile' : 'active-tab'"
            :class="is_mobile ? 'mb-2' : 'mx-1 white--text no-glow'"
            :text="!is_mobile"
            :ripple="false"
        >
            <v-icon :small="!is_mobile" :class="is_mobile ? 'ml-3' : 'ml-2 no-glow'" :color="is_mobile ? 'white' : ''">mdi-store</v-icon>
            <span v-if="!is_mobile">فروشگاه محصولات</span>
            <v-list-item-content v-else>
                <v-list-item-title class="white--text">فروشگاه محصولات</v-list-item-title>
            </v-list-item-content>
        </component>

        <client-only>
            <component
                v-if="is_logged_in"
                :is="is_mobile ? 'v-list-item' : 'v-btn'"
                to="/profile"
                exact
                :active-class="is_mobile ? 'active-tab-mobile' : 'active-tab'"
                :class="is_mobile ? 'mb-2' : 'mx-1 white--text no-glow'"
                :text="!is_mobile"
                :ripple="false"
            >
                <v-icon :small="!is_mobile" :class="is_mobile ? 'ml-3' : 'ml-2 no-glow'" :color="is_mobile ? 'white' : ''">mdi-account-cog</v-icon>
                <span v-if="!is_mobile">پروفایل کاربری</span>
                <v-list-item-content v-else>
                    <v-list-item-title class="white--text">پروفایل کاربری</v-list-item-title>
                </v-list-item-content>
            </component>
        </client-only>
    </div>
</template>

<script>
export default {
    name: 'NavLinks',
    props: {
        is_logged_in: { type: Boolean, default: false },
        is_mobile: { type: Boolean, default: false }
    }
}
</script>