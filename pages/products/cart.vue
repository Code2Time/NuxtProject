<template>
    <v-container class="py-8 rtl-dir">
        <h1 class="white--text font-weight-bold mb-6 text-h4">
            <v-icon color="#3B82F6" large class="ml-2">
                mdi-cart-outline
            </v-icon>
            سبد خرید شما
        </h1>

        <v-card v-if="!userIsLoggedIn" class="glass-card pa-12 rounded-xl text-center white--text">
            <v-icon size="80" color="amber lighten-2" class="mb-4">mdi-account-lock-outline</v-icon>
            <h2 class="text-h5 font-weight-bold mb-2">
                جهت مشاهده سبد خرید وارد شوید
            </h2>
            
            <p class="grey--text text--lighten-1 mb-6">
                برای دسترسی به آیتم‌های سبد خرید و تکمیل سفارش، ابتدا باید وارد حساب کاربری خود شوید.
            </p>
            <v-btn 
                color="primary" 
                large 
                to="/login/login?redirect=/products/cart" 
                class="rounded-lg font-weight-bold px-8"
            >
                <v-icon class="ml-2">mdi-login</v-icon>
                ورود به حساب کاربری
            </v-btn>
        </v-card>

        <v-row v-else-if="cartItems.length > 0">
            <v-col cols="12" md="8">
                <v-card
                    v-for="item in cartItems"
                    :key="item.id"
                    class="glass-card pa-4 mb-4 rounded-xl white--text d-flex align-center flex-wrap"
                >
                    <v-avatar color="rgba(59, 130, 246, 0.2)" size="56" class="ml-4 rounded-lg">
                        <v-icon color="#3B82F6">{{ item.icon || 'mdi-cube-outline' }}</v-icon>
                    </v-avatar>

                    <div class="flex-grow-1 my-2">
                        <h3 class="text-h6 font-weight-bold">{{ item.name }}</h3>
                        <span class="grey--text text--lighten-1 caption">{{ item.category }}</span>
                    </div>

                    <div class="d-flex align-center my-2 mx-4">
                        <v-btn icon small color="primary" @click="updateQty(item.id, item.quantity + 1)">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <span class="mx-3 font-weight-bold text-h6">{{ item.quantity }}</span>
                        <v-btn
                            icon
                            small
                            color="primary"
                            :disabled="item.quantity <= 1"
                            @click="updateQty(item.id, item.quantity - 1)"
                        >
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </div>

                    <div class="text-left my-2 ml-4">
                        <div class="green--text text--accent-3 font-weight-bold text-subtitle-1">
                            {{ item.price }} تومان
                        </div>
                    </div>

                    <v-btn icon color="error" @click="removeItem(item.id)">
                        <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="glass-card pa-6 rounded-xl white--text">
                    <h2 class="text-h6 font-weight-bold mb-4">خلاصه سفارش</h2>

                    <div class="d-flex justify-space-between mb-3">
                        <span class="grey--text text--lighten-1">تعداد محصولات:</span>
                        <span class="font-weight-bold">{{ cartTotalCount }}</span>
                    </div>

                    <v-divider class="my-4 rgb-white-divider" />

                    <div class="d-flex justify-space-between mb-6">
                        <span class="text-subtitle-1">جمع کل:</span>
                        <span class="text-h6 font-weight-bold green--text text--accent-3">
                            {{ cartTotalPrice.toLocaleString('fa-IR') }} تومان
                        </span>
                    </div>

                    <v-btn block color="success" large class="rounded-lg font-weight-bold">
                        تکمیل خرید و پرداخت
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>

        <v-card v-else class="glass-card pa-12 rounded-xl text-center white--text">
            <v-icon size="80" color="grey lighten-1" class="mb-4">mdi-cart-off</v-icon>
            <h2 class="text-h5 font-weight-bold mb-2">سبد خرید شما خالی است</h2>
            <p class="grey--text text--lighten-1 mb-6">برای افزودن کالا به فروشگاه مراجعه کنید.</p>
            <v-btn color="primary" large to="/products" class="rounded-lg font-weight-bold">
                مشاهده فروشگاه
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'CartPage',

    created() {
        if (process.client) {
            this.$store.dispatch('checkAuth')
        }
    },

    computed: {
        ...mapGetters(['cartItems', 'cartTotalCount', 'cartTotalPrice']),

        userIsLoggedIn() {
            if (process.client) {
                return this.$store.getters.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true'
            }
            return false
        }
    },

    methods: {
        ...mapMutations({
            removeItem: 'REMOVE_FROM_CART',
            updateQuantity: 'UPDATE_QUANTITY'
        }),

        updateQty(productId, quantity) {
            this.updateQuantity({ productId, quantity })
        }
    }
}
</script>