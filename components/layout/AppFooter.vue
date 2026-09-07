<template>
    <v-footer padless color="transparent" class="w-100 mt-auto pa-0">
        <v-card flat tile width="100%" class="glass-header text-center py-4">
            <v-container class="py-0">
                <div class="d-flex flex-column flex-md-row align-center justify-space-between text-caption white--text" style="direction: rtl;">
                    <div class="mb-2 mb-md-0 font-weight-medium">
                        تمامی حقوق این سیستم محفوظ است © {{ current_year }}
                    </div>

                    <div class="d-flex align-center">
                        <NuxtLink to="/products" class="white--text text-decoration-none mx-2 hover-link">
                            فروشگاه
                        </NuxtLink>
                        <span class="grey--text text--lighten-1">•</span>
                        <NuxtLink to="/news" class="white--text text-decoration-none mx-2 hover-link">
                            اخبار
                        </NuxtLink>
                    </div>
                </div>
            </v-container>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: 'AppFooter',
    data() {
        return {
        current_year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
.glass-header {
    background-color: rgba(15, 23, 42, 0.85) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.w-100 {
    width: 100% !important;
}

.hover-link {
    transition: color 0.2s ease;
}

.hover-link:hover {
    color: #3B82F6 !important;
}
</style>