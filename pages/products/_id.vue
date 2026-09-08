<template>
    <v-container class="py-8 rtl-dir">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="glass-card pa-6 pa-md-8 rounded-xl elevation-0">
                    <v-btn text color="primary" class="mb-4" to="/products">
                        <v-icon right>mdi-arrow-right</v-icon>
                        بازگشت به فروشگاه
                    </v-btn>

                    <template v-if="product">
                        <div class="d-flex align-center mb-6">
                            <v-avatar color="primary lighten-1" size="64" class="ml-4">
                                <v-icon dark size="36">{{ product.icon }}</v-icon>
                            </v-avatar>

                            <div>
                                <h1 class="text-h4 font-weight-bold white--text mb-1">
                                    {{ product.name }}
                                </h1>
                                <v-chip color="blue-grey lighten-2" dark small label>
                                    {{ product.category }}
                                </v-chip>
                            </div>
                        </div>

                        <v-divider class="mb-6 rgb-white-divider" />

                        <div class="mb-6">
                            <h3 class="text-h6 white--text mb-2">توضیحات محصول</h3>
                            <p class="grey--text text--lighten-2 text-body-1 style-description">
                                {{ product.description }}
                            </p>
                        </div>

                        <v-divider class="mb-6 rgb-white-divider" />

                        <div class="d-flex align-center justify-space-between flex-wrap">
                            <div>
                                <span class="grey--text text--lighten-1 body-2">قیمت:</span>
                                <span class="text-h5 font-weight-bold green--text text--accent-3 mr-2">
                                    {{ product.price }}
                                </span>
                                <span class="white--text caption">تومان</span>
                            </div>

                            <v-btn
                                color="primary"
                                large
                                class="rounded-lg font-weight-bold px-6"
                                @click="handleAddToCart"
                            >
                                <v-icon right>mdi-cart-plus</v-icon>
                                افزودن به سبد خرید
                            </v-btn>
                        </div>
                    </template>

                    <v-alert v-else type="error" class="mt-4">
                        محصول مورد نظر یافت نشد
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>

        <BaseAuthModal v-model="showAuthModal" />

        <v-snackbar v-model="showSuccessSnackbar" color="success" timeout="3000" top centered>
            محصول با موفقیت به سبد خرید اضافه شد.
            <template #action="{ attrs }">
                <v-btn text v-bind="attrs" @click="showSuccessSnackbar = false">بستن</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import BaseAuthModal from '~/components/Base/BaseAuthModal.vue'

export default {
    name: 'ProductDetailPage',
    components: {
        BaseAuthModal
    },

    data() {
        return {
            showAuthModal: false,
            showSuccessSnackbar: false
        }
    },
    
    created() {
        if (process.client) {
            this.$store.dispatch('checkAuth')
        }
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

    methods: {
        async handleAddToCart() {
            if (!this.product) return

            const isAdded = await this.$store.dispatch('addToCart', this.product)
            if (isAdded) {
                this.showSuccessSnackbar = true
            } else {
                this.showAuthModal = true
            }
        }
    }
}
</script>

<style scoped>
.rgb-white-divider {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
.style-description {
  line-height: 1.8;
}
</style>