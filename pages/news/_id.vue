<template>
    <div class="py-8">
        <v-container class="max-width-container">
            <v-row justify="center">
                <v-col cols="12" md="10" lg="8">
                    <BaseButton
                        text
                        color="#2563eb"
                        :block="false"
                        c-class="mb-4 font-weight-bold px-0"
                        to="/news"
                    >
                        <v-icon class="ml-1">mdi-arrow-right</v-icon>
                        بازگشت به لیست اخبار
                    </BaseButton>

                    <v-card v-if="newsItem" class="white-detail-card rounded-2xl overflow-hidden elevation-2">
                        <v-img
                            :src="newsItem.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop'"
                            height="300"
                            cover
                            alt="تصویر خبر"
                        >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </v-row>
                            </template>
                        </v-img>

                        <div class="pa-6 pa-md-8">
                            <div class="d-flex align-center justify-space-between mb-4 flex-wrap">
                                <v-chip color="#eff6ff" text-color="#2563eb" label small class="font-weight-bold px-3">
                                    {{ newsItem.category || 'اطلاعیه' }}
                                </v-chip>

                                <div class="d-flex align-center text-slate text-caption">
                                    <v-icon small color="#64748b" class="ml-1">mdi-calendar-month-outline</v-icon>
                                    <span class="ml-4">{{ newsItem.date || '۱۵ شهریور ۱۴۰۳' }}</span>
                                    <v-icon small color="#64748b" class="ml-1">mdi-clock-outline</v-icon>
                                    <span>{{ newsItem.readTime || '۲ دقیقه مطالعه' }}</span>
                                </div>
                            </div>

                            <h1 class="news-title font-weight-black text-h5 text-md-h4 mb-6">
                                {{ newsItem.title }}
                            </h1>

                            <v-divider class="mb-6" />

                            <div class="news-content text-body-1 text-justify">
                                <p>{{ newsItem.summary || newsItem.content || newsItem.excerpt }}</p>
                            </div>

                            <div class="mt-8 pt-6 border-t d-flex align-center justify-space-between">
                                <span class="text-caption text-slate">منبع: تیم فنی سامانه مدیریت</span>

                                <BaseButton
                                    icon
                                    color="#64748b"
                                    :block="false"
                                    @click="shareNews"
                                >
                                    <v-icon>mdi-share-variant-outline</v-icon>
                                </BaseButton>
                            </div>
                        </div>
                    </v-card>

                    <v-card v-else class="white-detail-card rounded-2xl pa-8 text-center elevation-1">
                        <v-icon size="64" color="#f59e0b" class="mb-4">mdi-newspaper-remove</v-icon>

                        <h2 class="text-h6 font-weight-bold mb-2">خبر مورد نظر یافت نشد</h2>

                        <p class="text-body-2 text-slate mb-6">
                            این اطلاعیه ممکن است آرشیو یا حذف شده باشد.
                        </p>

                        <BaseButton
                            color="#2563eb"
                            dark
                            :block="false"
                            c-class="px-6 rounded-xl"
                            to="/news"
                        >
                            بازگشت به اطلاعیه‌ها
                        </BaseButton>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
    name: 'NewsDetailPage',

    components: {
        BaseButton
    },

    asyncData({ params, error }) {
        try {
            const data = require('~/static/data/news.json')

            const newsItem = data.newsList.find(
                (item) => item.id === parseInt(params.id, 10)
            )

            if (!newsItem) {
                return error({ statusCode: 404, message: 'خبر یافت نشد' })
            }

            return { newsItem }
        } catch (e) {
            return error({ statusCode: 500, message: 'خطا در دریافت اطلاعات' })
        }
    },

    methods: {
        async shareNews() {
            const title = this.newsItem?.title || 'خبر'
            const url = window.location.href

            if (navigator.share) {
                try {
                    await navigator.share({
                        title,
                        url
                    })
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        this.$toast.error('اشتراک‌گذاری خبر انجام نشد')
                    }
                }
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                try {
                    await navigator.clipboard.writeText(url)
                    this.$toast.info('لینک خبر کپی شد')
                } catch (error) {
                    this.$toast.error('کپی لینک انجام نشد')    
                }
            } else{
                this.$toast.info('امکان اشتراک‌گذاری یا کپی لینک در این مرورگر وجود ندارد')
            }
        }
    }
}
</script>

<style scoped>
.news-title {
    color: #0f172a !important;
    line-height: 1.4;
}

.news-content {
    color: #334155 !important;
    line-height: 1.9;
}

.text-slate {
    color: #64748b !important;
}
</style>