<template>
    <client-only>
        <v-container class="py-12">
            <v-row v-if="!isAuthenticated" justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <BaseRequireLogin
                        title="ورود به حساب کاربری"
                        description="برای مشاهده لیست علاقه‌مندی‌ها، لطفاً ابتدا وارد حساب کاربری خود شوید."
                        icon="mdi-heart-remove-outline"
                    />
                </v-col>
            </v-row>

            <template v-else>
                <v-row v-if="!favoriteItems || favoriteItems.length === 0" justify="center">
                    <v-col cols="12" sm="10" md="8" lg="6">
                        <v-card class="pa-8 text-center rounded-xl elevation-2 white-news-card white">
                            <div class="mb-4">
                                <v-avatar color="#FEF3C7" size="80">
                                <v-icon size="48" color="#F59E0B">mdi-heart-off-outline</v-icon>
                                </v-avatar>
                            </div>

                            <h2 class="text-h5 font-weight-bold grey--text text--darken-3 mb-3">
                                لیست علاقه‌مندی‌های شما خالی است
                            </h2>

                            <p class="grey--text text--darken-1 text-body-2 mb-6">
                                شما هنوز هیچ محصول یا خدماتی را به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید.
                            </p>

                            <BaseButton
                                to="/products"
                                color="#3B82F6"
                                :block="false"
                                custom-class="white--text rounded-lg px-8 font-weight-bold elevation-1"
                            >
                                <v-icon right size="20" class="ml-1">mdi-storefront-outline</v-icon>
                                مشاهده محصولات
                            </BaseButton>
                        </v-card>
                    </v-col>
                </v-row>

                <div v-else>
                    <div class="d-flex align-center mb-6">
                        <v-icon color="#EF4444" x-large class="ml-3">mdi-heart</v-icon>
                        <h1 class="text-h4 font-weight-bold grey--text text--darken-3">لیست علاقه‌مندی‌ها</h1>
                    </div>

                    <v-row align="stretch">
                        <v-col
                            v-for="(item, index) in favoriteItems"
                            :key="item.id || item._id || index"
                            cols="12"
                            sm="6"
                            md="4"
                            class="d-flex"
                        >
                            <ProductCard :product="item" />
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-container>
    </client-only>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseButton from '~/components/Base/BaseButton.vue'
import ProductCard from '~/components/Products/ProductCard.vue'
import BaseRequireLogin from '~/components/Base/BaseRequireLogin.vue'   

export default {
name: 'FavoritesPage',

    components: {
        BaseButton,
        ProductCard,
        BaseRequireLogin
    },

    computed: {
        ...mapGetters(['favoriteItems']),

        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },

    mounted() {
        if (this.isAuthenticated) {
            this.loadUserFavorites()
        }
    },

    methods: {
        ...mapActions(['loadUserFavorites'])
    }
}
</script>