<template>
    <client-only>
        <v-container class="py-12">
            <v-row v-if="!isAuthenticated" justify="center">
                <v-col cols="12" sm="10" md="8" lg="6">
                    <BaseRequireLogin
                        title="ورود به حساب کاربری"
                        description="برای مشاهده سبد خرید، لطفاً ابتدا وارد حساب کاربری خود شوید."
                        icon="mdi-cart-remove"
                    />
                </v-col>
            </v-row>

            <template v-else>
                <v-row v-if="!cartItems || cartItems.length === 0" justify="center">
                    <v-col cols="12" sm="10" md="8" lg="6">
                        <v-card class="pa-8 text-center rounded-xl elevation-2 white-news-card white">
                            <div class="mb-4">
                                <v-avatar color="#E0F2FE" size="80">
                                <v-icon size="48" color="#3B82F6">mdi-cart-off</v-icon>
                                </v-avatar>
                            </div>

                            <h2 class="text-h5 font-weight-bold grey--text text--darken-3 mb-3">
                                سبد خرید شما خالی است
                            </h2>

                            <p class="grey--text text--darken-1 text-body-2 mb-6">
                                برای مشاهده و انتخاب خدمات و محصولات، به صفحه فروشگاه مراجعه کنید.
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
                        <v-icon color="#3B82F6" x-large class="ml-3">mdi-cart-outline</v-icon>
                        <h1 class="text-h4 font-weight-bold grey--text text--darken-3">سبد خرید شما</h1>
                    </div>

                    <v-row>
                        <v-col cols="12" md="8">
                            <v-card
                                v-for="item in cartItems"
                                :key="getItemKey(item)"
                                class="mb-4 pa-4 rounded-xl elevation-1 white-news-card d-flex align-center justify-space-between flex-wrap white"
                            >
                                <div class="d-flex align-center">
                                    <v-avatar color="#E0F2FE" rounded size="56" class="ml-4">
                                        <v-icon color="#0284C7">mdi-shield-check-outline</v-icon>
                                    </v-avatar>
                                    <div>
                                        <h3 class="text-subtitle-1 font-weight-bold grey--text text--darken-3 mb-1">
                                        {{ item.title || item.name || (item.product && item.product.title) || 'محصول انتخاب‌شده' }}
                                        </h3>
                                        <span class="text-caption grey--text text--darken-1 d-block">
                                        {{ item.category || (item.product && item.product.category) || 'زیرساخت' }}
                                        </span>
                                    </div>
                                </div>

                                <div class="d-flex align-center mt-3 mt-sm-0">
                                    <div class="d-flex align-center rounded-lg px-2 py-1 ml-4 border-quantity">
                                        <BaseButton
                                            color="transparent"
                                            elevation="0"
                                            :block="false"
                                            custom-class="pa-0 min-w-0 grey--text text--darken-2"
                                            @click="updateQty(getItemKey(item), (item.quantity || item.qty || 1) - 1)"
                                        >
                                            <v-icon small>mdi-minus</v-icon>
                                        </BaseButton>

                                        <span class="mx-3 font-weight-bold grey--text text--darken-3">
                                            {{ item.quantity || item.qty || 1 }}
                                        </span>

                                        <BaseButton
                                            color="transparent"
                                            elevation="0"
                                            :block="false"
                                            custom-class="pa-0 min-w-0 grey--text text--darken-2"
                                            @click="updateQty(getItemKey(item), (item.quantity || item.qty || 1) + 1)"
                                            >
                                            <v-icon small>mdi-plus</v-icon>
                                        </BaseButton>
                                    </div>

                                    <span class="text-subtitle-1 font-weight-bold success--text ml-4">
                                        {{ getItemTotalPrice(item) }} تومان
                                    </span>

                                    <BaseButton
                                        color="transparent"
                                        elevation="0"
                                        :block="false"
                                        custom-class="pa-0 min-w-0 error--text"
                                        @click="removeItem(getItemKey(item))"
                                    >
                                        <v-icon small>mdi-trash-can-outline</v-icon>
                                    </BaseButton>
                                </div>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-card class="pa-6 rounded-xl elevation-2 white-news-card white">
                                <h3 class="text-h6 font-weight-bold grey--text text--darken-3 mb-4">
                                    خلاصه سفارش
                                </h3>

                                <div class="d-flex justify-space-between py-3 light-divider">
                                    <span class="grey--text text--darken-1 font-weight-medium">تعداد محصولات:</span>
                                    <span class="font-weight-bold grey--text text--darken-3">
                                        {{ cartTotalCount }}
                                    </span>
                                </div>

                                <div class="d-flex justify-space-between py-4 light-divider">
                                    <span class="grey--text text--darken-1 font-weight-medium">جمع کل:</span>
                                    <span class="font-weight-bold text-h6 success--text">
                                        {{ formatPrice(cartTotalPrice) }} تومان
                                    </span>
                                </div>

                                <BaseButton
                                    color="#10B981"
                                    elevation="2"
                                    :block="true"
                                    custom-class="mt-6 rounded-lg font-weight-bold py-6 text-body-1 white--text"
                                    @click="checkout"
                                >
                                    تکمیل خرید و پرداخت
                                </BaseButton>
                            </v-card>
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
import BaseRequireLogin from '~/components/Base/BaseRequireLogin.vue' // یا مسیر دقیق فایل RequireLogin

export default {
    name: 'CartPage',

    components: {
        BaseButton,
        BaseRequireLogin
    },

    computed: {
        ...mapGetters(['cartItems', 'cartTotalCount', 'cartTotalPrice']),

        isAuthenticated() {
        return this.$store.getters['auth/isAuthenticated']
        }
    },

    mounted() {
        if (this.isAuthenticated) {
            this.loadUserCart()
        }
    },

    methods: {
        ...mapActions(['removeFromCart', 'updateQuantity', 'loadUserCart']),

        getItemKey(item) {
            return item.id || item.productId || item.product_id || item._id
        },

        parseNumericPrice(value) {
            if (value === null || value === undefined) return 0
            const strValue = String(value)
                .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
                .replace(/[0-9]/g, (d) => '0123456789'.indexOf(d))
                .replace(/[^0-9]/g, '')
            return parseInt(strValue, 10) || 0
        },

        getItemTotalPrice(item) {
            const rawPrice = item.price 
                ?? item.unitPrice 
                ?? item.unit_price 
                ?? item.totalPrice 
                ?? item.total_price 
                ?? item.amount 
                ?? item.product?.price 
                ?? item.product?.unitPrice 
                ?? item.product?.unit_price 
                ?? 0

            const qty = Number(item.quantity || item.qty || 1)
            const numericPrice = this.parseNumericPrice(rawPrice)

            return this.formatPrice(numericPrice * qty)
        },

        removeItem(id) {
            this.removeFromCart(id)
            if (this.$toast) {
                this.$toast.info('محصول از سبد خرید حذف شد')
            }
        },

        updateQty(productId, quantity) {
            if (quantity > 0) {
                this.updateQuantity({ productId, quantity })
            }
        },

        formatPrice(value) {
            const numericValue = this.parseNumericPrice(value)
            return numericValue.toLocaleString('fa-IR')
        },

        checkout() {
            if (this.$toast) {
                this.$toast.success('در حال انتقال به درگاه پرداخت...')
            }
        }
    }
}
</script>

<style scoped>
.border-quantity {
    border: 1px solid #cbd5e1;
    background-color: #f8fafc;
}
</style>