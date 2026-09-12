<template>
    <v-container class="center-container rtl-dir py-6">
        <v-row justify="center" align="center" class="w-100 ma-0">
            <v-col cols="12" md="8">
                <v-card class="pa-6 pa-md-8 rounded-xl elevation-2 white">
                    <BaseButton
                        to="/products"
                        color="transparent"
                        elevation="0"
                        :block="false"
                        c-class="mb-4 font-weight-bold px-0 primary--text"
                    >
                        <v-icon right class="ml-1">mdi-arrow-right</v-icon>
                        بازگشت به فروشگاه
                    </BaseButton>

                    <template v-if="product">
                        <div class="d-flex align-center mb-6">
                            <v-avatar color="#E0F2FE" size="64" class="ml-4">
                                <v-icon color="#0284C7" size="36">
                                    {{ product.icon || 'mdi-cube-outline' }}
                                </v-icon>
                            </v-avatar>

                            <div>
                                <h1 class="text-h4 font-weight-bold grey--text text--darken-3 mb-1">
                                    {{ product.name || product.title }}
                                </h1>
                                <v-chip color="#0284C7" label small dark class="font-weight-bold">
                                    {{ product.category || 'عمومی' }}
                                </v-chip>
                            </div>
                        </div>

                        <v-divider class="mb-6" />

                        <div class="mb-6">
                            <h3 class="text-h6 font-weight-bold grey--text text--darken-3 mb-2">
                                توضیحات محصول
                            </h3>
                            <p class="grey--text text--darken-2 text-body-1 text-justify line-height-lg">
                                {{ product.description }}
                            </p>
                        </div>

                        <v-divider class="mb-6" />

                        <div class="d-flex align-center justify-space-between flex-wrap">
                            <div class="d-flex align-center">
                                <span class="grey--text text--darken-1 body-1 font-weight-medium ml-2">قیمت:</span>
                                <span class="text-h4 font-weight-bold success--text ml-2">
                                    {{ formattedPrice }}
                                </span>
                                <span class="grey--text text--darken-1 caption">تومان</span>
                            </div>

                            <div class="d-flex align-center mt-3 mt-sm-0">
                                <BaseButton
                                    color="#10B981"
                                    elevation="2"
                                    :block="false"
                                    c-class="rounded-lg font-weight-bold px-6 ml-3 white--text"
                                    @click="handleAddToCart"
                                >
                                    <v-icon right class="ml-1">mdi-cart-plus</v-icon>
                                    افزودن به سبد خرید
                                </BaseButton>

                                <BaseButton
                                    color="transparent"
                                    elevation="0"
                                    :block="false"
                                    c-class="pa-0 min-w-0"
                                    @click="handleToggleFav"
                                >
                                    <v-icon :color="isFav ? 'red' : 'grey darken-1'">
                                        {{ isFav ? 'mdi-heart' : 'mdi-heart-outline' }}
                                    </v-icon>
                                </BaseButton>
                            </div>
                        </div>
                    </template>

                    <v-alert v-else type="error" class="mt-4">
                        محصول مورد نظر یافت نشد
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'ProductDetailPage',

    components: {
        BaseButton
    },

    asyncData({ params, error }) {
        try {
            const data = require('~/static/data/products.json')
            const product = data.products.find(
                (item) => item.id === parseInt(params.id)
            )

            if (!product) {
                return error({ statusCode: 404, message: 'محصول یافت نشد' })
            }

            return { product }
        } catch (e) {
            return error({ statusCode: 500, message: 'خطا در دریافت اطلاعات' })
        }
    },

    computed: {
        ...mapGetters(['isFavorite']),

        isFav() {
            if (!this.product) return false
            const id = this.product.id || this.product.productId || this.product._id
            return this.isFavorite(id)
        },

        formattedPrice() {
            if (!this.product || this.product.price === undefined || this.product.price === null) {
                return '۰'
            }

            const priceString = String(this.product.price)
                .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
                .replace(/[0-9]/g, (d) => '0123456789'.indexOf(d))
                .replace(/[^0-9]/g, '')
            const priceNum = Number(priceString)

            if (isNaN(priceNum) || priceString === '') {
                return this.product.price
            }

            return priceNum.toLocaleString('fa-IR')
        }
    },

    mounted() {
        this.loadUserFavorites()
    },

    methods: {
        ...mapActions(['addToCart', 'toggleFavorite', 'loadUserFavorites']),

        async handleAddToCart() {
            if (!this.product) return

            try {
                await this.addToCart(this.product)
                if (this.$toast) {
                    this.$toast.success('محصول با موفقیت به سبد خرید اضافه شد')
                }
            } catch (error) {
                if (this.$toast) {
                    this.$toast.error('خطا در افزودن محصول به سبد خرید')
                }
            }
        },

        handleToggleFav() {
            if (!this.product) return
            
            const wasFav = this.isFav
            this.toggleFavorite(this.product)

            if (this.$toast) {
                const message = !wasFav
                    ? 'محصول به علاقه‌مندی‌ها اضافه شد'
                    : 'محصول از علاقه‌مندی‌ها حذف شد'
                this.$toast.info(message)
            }
        }
    }
}
</script>