<template>
    <v-container class="py-8 rtl-dir">
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="glass-card pa-6 pa-md-8 rounded-xl elevation-0">
                    <v-btn text color="primary" class="mb-4" to="/news">
                        <v-icon right class="ml-1">mdi-arrow-right</v-icon>
                        بازگشت به لیست اخبار
                    </v-btn>

                    <template v-if="newsItem">
                        <div class="d-flex align-center justify-space-between mb-4 flex-wrap">
                            <v-chip color="primary" label small class="font-weight-bold">
                                {{ newsItem.category }}
                            </v-chip>

                            <span class="grey--text text--lighten-1 caption">
                                <v-icon small color="grey lighten-1">mdi-calendar</v-icon>
                                {{ newsItem.date }}
                            </span>
                        </div>

                        <h1 class="text-h4 font-weight-bold white--text mb-6">
                            {{ newsItem.title }}
                        </h1>

                        <v-divider dark class="mb-6" />

                        <p class="white--text text-body-1 text-justify">
                            {{ newsItem.summary }}
                        </p>
                    </template>

                    <v-alert v-else type="error" class="mt-4">
                        خبر مورد نظر یافت نشد
                    </v-alert>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'NewsDetailPage',
    asyncData({ params, error }) {
        try {
            const data = require('~/static/data/news.json')
            const newsItem = data.newsList.find(
                (item) => item.id === parseInt(params.id)
            )

            if (!newsItem) {
                return error({ statusCode: 404, message: 'خبر یافت نشد' })
            }

            return { newsItem }
        } catch (e) {
            return error({ statusCode: 500, message: 'خطا در دریافت اطلاعات' })
        }
    }
}
</script>