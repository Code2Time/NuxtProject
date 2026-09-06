<template>
    <v-row class="justify-center">
        <v-col v-for="product in products" :key="product.id" cols="12" sm="10" md="4">
            <v-card class="glass-card pa-5 text-center rounded-xl fill-height d-flex flex-column justify-space-between" flat>
                <div>
                    <div class="icon-wrapper mb-4 mx-auto">
                        <v-icon size="40" color="white">{{ product.icon || 'mdi-package-variant' }}</v-icon>
                    </div>
                    <h2 class="form-title text-h6 mb-1">{{ product.name }}</h2>
                    <p class="form-subtitle caption mb-3">{{ product.category }}</p>
                    <p class="form-subtitle text-body-2 mb-4">{{ product.description }}</p>
                </div>

                <div>
                    <div class="text-h6 font-weight-bold white--text mb-3">
                        {{ product.price }} <span class="caption">تومان</span>
                    </div>
                    <v-btn block color="primary" rounded class="custom-btn py-3" @click="$emit('add-to-cart', product)">
                        افزودن به سبد خرید
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ShopSection',
    props: {
        products: { type: Array, default: () => [] }
    }
}
</script>