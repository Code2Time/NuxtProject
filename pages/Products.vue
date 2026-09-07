<template>
    <div>
        <h1 class="white--text font-weight-bold mb-6 text-h4">
            <v-icon color="#3B82F6" large class="ml-2">mdi-store</v-icon>
            فروشگاه محصولات
        </h1>

        <v-row class="fill-height" align="stretch">
            <v-col
                v-for="(product, index) in product_list"
                :key="product.id || index"
                cols="12"
                sm="6"
                md="4"
                class="d-flex"
            >
                <v-card
                    class="glass-card d-flex flex-column justify-space-between w-100 pa-6 rounded-xl"
                    flat
                >
                    <div>
                        <div class="d-flex justify-center mb-6">
                            <v-avatar color="rgba(59, 130, 246, 0.2)" size="80" class="rounded-lg">
                                <v-icon color="#3B82F6" size="40">
                                    {{ product.icon || 'mdi-cube-outline' }}
                                </v-icon>
                            </v-avatar>
                        </div>

                        <h2 v-if="product.title" class="white--text text-h6 font-weight-bold text-center mb-3">
                            {{ product.title }}
                        </h2>

                        <p class="white--text text-body-2 text-center line-height-relaxed product-desc">
                            {{ product.description }}
                        </p>
                    </div>

                    <div class="mt-4">
                        <v-btn
                            block
                            color="#3B82F6"
                            class="white--text font-weight-bold py-5 rounded-lg no-glow"
                            :ripple="false"
                        >
                            خرید محصول
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'ProductsPage',
    asyncData() {
        try {
            const jsonData = require('~/static/data.json')
            return { product_list: jsonData.products || [] }
        } catch (errorException) {
            return { product_list: [] }
        }
    }
}
</script>

<style scoped>
.glass-card {
    background-color: rgba(15, 23, 42, 0.75) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    height: 100%;
}

.line-height-relaxed {
    line-height: 1.8 !important;
}

.product-desc {
    min-height: 60px;
}

.w-100 {
    width: 100% !important;
}

.no-glow {
    box-shadow: none !important;
    filter: none !important;
}
</style>