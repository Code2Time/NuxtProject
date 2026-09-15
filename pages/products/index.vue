<template>
    <div class="light-admin-page">
        <v-container fluid class="max-width-container py-8 px-4 px-md-8">
            <BaseHero type="products" v-model="searchQuery" />

            <ProductStats :stats="stats" />

            <div class="d-flex align-center justify-space-between mb-6">
                <div class="d-flex align-center">
                    <div class="blue-accent-line ml-3"></div>
                    <h2 class="text-h5 font-weight-bold grey--text text--darken-4">لیست خدمات و محصولات</h2>
                </div>
                <span class="text-caption font-weight-bold grey--text text--darken-2">
                    تعداد موارد: {{ productList.length }}
                </span>
            </div>

            <v-row align="stretch" class="mx-0">
                <v-col
                    v-for="(product, index) in productList"
                    :key="product.id || index"
                    cols="12"
                    sm="6"
                    md="4"
                    class="pa-2 pa-md-3 d-flex"
                >
                    <ProductCard :product="product" />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BaseHero from '~/components/Base/BaseHero.vue'
import ProductStats from '~/components/Products/ProductStats.vue'
import ProductCard from '~/components/Products/ProductCard.vue'

export default {
    name: 'ProductsIndexPage',

    components: {
        BaseHero,
        ProductStats,
        ProductCard
    },

    asyncData() {
        try {
            const jsonData = require('~/static/data/products.json')
            const products = jsonData.products || jsonData || []
            const stats = jsonData.stats || []
            return { 
                allProducts: products, 
                productList: products,
                stats
            }
        } catch (err) {
            console.error('Error loading products.json:', err)
            return { allProducts: [], productList: [], stats: [] }
        }
    },

    data() {
        return {
            searchQuery: ''
        }
    },

    watch: {
        searchQuery() {
            this.handleSearch()
        }
    },

    methods: {
        handleSearch() {
            if (!this.searchQuery || !this.searchQuery.trim()) {
                this.productList = this.allData
                return
            }

            const query = this.searchQuery.toLowerCase().trim()
            this.productList = this.allProducts.filter(p => {
                const titleMatch = (p.name || p.title || '').toLowerCase().includes(query)
                const descMatch = (p.description || '').toLowerCase().includes(query)
                const categoryMatch = (p.category || '').toLowerCase().includes(query)
                return titleMatch || descMatch || categoryMatch
            })
        }
    }
}
</script>
