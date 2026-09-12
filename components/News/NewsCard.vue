<template>
    <v-card class="d-flex flex-column justify-space-between w-100 rounded-2xl overflow-hidden elevation-2 h-100 white-news-card">
        <div>
            <div class="position-relative overflow-hidden">
                <v-img
                    :src="item.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop'"
                    height="180"
                    cover
                    alt="تصویر خبر"
                >
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>

                <span class="position-absolute font-weight-bold text-caption white--text pa-1 px-3 category-tag">
                    {{ item.category || 'اطلاعیه' }}
                </span>
            </div>

            <div class="pa-6">
                <div class="d-flex align-center text-caption mb-3 text--secondary">
                    <div class="d-flex align-center ml-4">
                        <v-icon small class="ml-1" color="#64748b">mdi-calendar-month-outline</v-icon>
                        <span>{{ item.date || '۱۵ شهریور ۱۴۰۳' }}</span>
                    </div>
                    <div class="d-flex align-center">
                        <v-icon small class="ml-1" color="#64748b">mdi-clock-outline</v-icon>
                        <span>{{ item.readTime || '۲ دقیقه مطالعه' }}</span>
                    </div>
                </div>

                <h3 class="font-weight-bold text-subtitle-1 mb-3 overflow-hidden news-title">
                    {{ item.title }}
                </h3>

                <p class="font-weight-medium text-caption mb-0 overflow-hidden news-excerpt">
                    {{ item.excerpt || item.description }}
                </p>
            </div>
        </div>

        <div class="px-6 pb-6 pt-0">
            <v-divider class="mb-4 light-divider"></v-divider>
            <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center text-caption font-weight-bold text--secondary">
                    <v-icon small class="ml-1" color="#64748b">mdi-account-circle-outline</v-icon>
                    <span>توسط: پشتیبانی فنی</span>
                </div>

                <BaseButton
                    :to="`/news/${item.id}`"
                    color="#0f172a"
                    elevation="0"
                    :block="false"
                    :x-large="false"
                    c-class="white--text font-weight-bold px-4 rounded-lg action-btn"
                >
                    ادامه مطلب
                    <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                </BaseButton>
            </div>
        </div>
    </v-card>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'NewsCard',

    components: {
        BaseButton
    },

    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>


.news-title {
    color: #0f172a !important;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 3em;
}

.news-excerpt {
    color: #334155 !important;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 4.8em;
}

.action-btn {
    background-color: #0f172a !important;
}
</style>