<template>
    <div>
        <h1 class="white--text font-weight-bold mb-6 text-h4">
            <v-icon color="#3B82F6" large class="ml-2">mdi-newspaper</v-icon>
            اخبار و اطلاعیه‌ها
        </h1>

        <v-row align="stretch">
            <v-col
                v-for="(news_item, item_index) in news_list"
                :key="item_index"
                cols="12"
                sm="6"
                md="6"
            >
                <v-card class="glass-card pa-5 rounded-xl white--text d-flex flex-column fill-height">
                    <div class="d-flex justify-space-between align-center mb-3">
                        <v-chip color="#8B5CF6" small class="white--text font-weight-bold">
                            {{ news_item.tag || 'اطلاعیه' }}
                        </v-chip>
                        <span class="text-caption grey--text text--lighten-1">{{ news_item.date }}</span>
                    </div>

                    <h3 class="text-h6 font-weight-bold mb-2">{{ news_item.title }}</h3>
                    
                    <p class="grey--text text--lighten-2 text-body-2 mb-0 flex-grow-1">
                        {{ news_item.description }}
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'NewsPage',
    asyncData() {
        try {
            const json_data = require('~/static/data.json')
            return { news_list: json_data.newsList || [] }
        } catch (error_exception) {
            return { news_list: [] }
        }
    }
}
</script>