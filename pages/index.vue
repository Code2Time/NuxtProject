<template>
    <v-app class="rtl-dir">
        <div class="animated-bg">

            <v-container fluid class="pa-0 fill-height align-start z-index-above">
                <AppNavbar
                    :active-tab.sync="activeTab"
                    @open-security="handleProfileClick"
                />

                <v-main class="w-100">
                    <v-container class="mt-4 mt-md-8 px-4 px-md-6">
                        <MainContent
                            :active-tab="activeTab"
                            :news-list="newsList"
                            :products="products"
                            :user-data="userData"
                            @add-to-cart="addToCart"
                        />
                    </v-container>
                </v-main>

                <SecurityModal
                    v-model="securityDialog"
                    @cancel="cancelSecurity"
                    @success="onSecuritySuccess"
                />
            </v-container>
        </div>
    </v-app>
</template>

<script>
import AppNavbar from '~/components/base/AppNavbar.vue'
import SecurityModal from '~/components/base/SecurityModal.vue'
import MainContent from '~/components/sections/MainContent.vue'

export default {
    name: 'IndexPage',
    components: { AppNavbar, SecurityModal, MainContent },

    asyncData() {
        try {
            const data = require('~/static/data.json')
            return { 
                newsList: data.newsList || [], 
                products: data.products || [] 
            }
        } catch (e) {
            return { newsList: [], products: [] }
        }
    },

    data() {
        return {
            activeTab: 'news',
            securityDialog: false,
            isProfileUnlocked: false,
            userData: {
                fullName: 'علی محمدی',
                email: 'a.mohammadi@example.com',
                role: 'توسعه‌دهنده ارشد سیستم',
                lastLogin: '۱۴۰۳/۰۶/۱۵ - ساعت ۱۴:۳۰'
            }
        }
    },

    methods: {
        handleProfileClick() {
            if (this.isProfileUnlocked) {
                this.activeTab = 'profile'
            } else {
                this.securityDialog = true
            }
        },
        
        cancelSecurity() {
            this.securityDialog = false
        },

        onSecuritySuccess() {
            this.isProfileUnlocked = true
            this.activeTab = 'profile'
            this.securityDialog = false
        },
        
        addToCart(product) {
            console.log('محصول انتخاب شد:', product)
        }
    }
}
</script>