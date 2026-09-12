<template>
    <v-card class="dark-gradient-banner rounded-2xl overflow-hidden mb-8 elevation-3 position-relative">
        <v-row no-gutters class="align-center flex-row-reverse">
            <v-col v-if="type === 'products'" cols="12" md="5" class="d-flex justify-center align-center pa-4 pa-md-0 position-relative overflow-hidden">
                <div class="hero-image-container">
                    <v-img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                        height="100%"
                        width="100%"
                        cover
                        alt="کاور سازمانی"
                        class="rounded-xl rounded-md-0"
                    ></v-img>
                    <div class="hero-image-overlay position-absolute fill-height w-100 d-none d-md-block"></div>
                </div>
            </v-col>

            <v-col v-else cols="12" md="4" class="d-flex justify-center pa-6 pa-md-8">
                <v-avatar color="rgba(255, 255, 255, 0.05)" size="120" class="hero-icon-avatar">
                    <v-icon size="64" color="#60a5fa">mdi-bullhorn-outline</v-icon>
                </v-avatar>
            </v-col>

            <v-col cols="12" :md="type === 'products' ? 7 : 8" class="pa-6 pa-md-10">
                <div class="d-inline-flex align-center badge-chip px-3 py-1 rounded-pill mb-4">
                    <v-icon small color="#60a5fa" class="ml-2">
                        {{ type === 'products' ? 'mdi-shield-check' : 'mdi-newspaper-variant-outline' }}
                    </v-icon>
                    <span class="badge-text font-weight-bold text-caption">
                        {{ badgeText || (type === 'products' ? 'سرویس‌های ابری و زیرساخت' : 'اطلاع‌رسانی و رویدادها') }}
                    </span>
                </div>

                <h1 class="hero-title white--text font-weight-black mb-4">
                    {{ title || (type === 'products' ? 'فروشگاه و لیست سرویس‌ها' : 'اخبار و اطلاعیه‌ها') }}
                </h1>

                <p class="hero-subtitle grey--text text--lighten-4 mb-6 max-w-600">
                    {{ subtitle || (type === 'products' ? 'ارائه برترین راهکارهای نرم‌افزاری و زیرساخت‌های ابری با بالاترین پایداری و امنیت.' : 'آخرین به‌روزرسانی‌های امنیتی، ارتقای سرویس‌ها و اطلاعیه‌های رسمی سامانه را در این بخش دنبال کنید.') }}
                </p>

                <div v-if="type === 'products'" class="search-box-container position-relative">
                    <v-text-field
                        :value="value"
                        placeholder="جستجو در بین خدمات و محصولات..."
                        hide-details
                        solo
                        flat
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        class="bright-search-input rounded-xl"
                        @input="$emit('input', $event)"
                    ></v-text-field>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'BaseHero',
    props: {
        type: {
            type: String,
            default: 'products',
            validator: val => ['products', 'news'].includes(val)
        },
        value: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        badgeText: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.dark-gradient-banner {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
}

.hero-image-container {
    width: 100%;
    height: 320px;
    position: relative;
    overflow: hidden;
}

.badge-chip {
    background: rgba(59, 130, 246, 0.15) !important;
    border: 1px solid rgba(96, 165, 250, 0.3) !important;
}

.badge-text {
    color: #60a5fa !important;
}

.hero-title {
    font-size: 2rem !important;
    line-height: 1.3 !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
    font-size: 1rem !important;
    line-height: 1.6 !important;
}

.hero-image-overlay {
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #0f172a 0%, rgba(15, 23, 42, 0.1) 100%);
}

.hero-icon-avatar {
    border: 1px dashed rgba(96, 165, 250, 0.3);
}

.search-box-container {
    z-index: 2;
    max-width: 520px;
}

.max-w-600 {
    max-width: 600px;
}
</style>