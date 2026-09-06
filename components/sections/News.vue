<template>
    <v-row class="justify-center">
        <v-col v-for="news in newsList" :key="news.id" cols="12" sm="10" md="6">
            <v-card class="glass-card pa-6 rounded-xl fill-height d-flex flex-column justify-space-between" flat>
                <div>
                    <div class="d-flex justify-space-between align-center mb-3">
                        <v-chip color="rgba(255,255,255,0.2)" text-color="white" small class="font-weight-bold">
                        {{ news.category }}
                        </v-chip>
                        <span class="caption text-white-50">{{ news.date }}</span>
                    </div>
                    <h2 class="form-title text-h6 mb-3">{{ news.title }}</h2>
                    <p class="form-subtitle line-height-relaxed mb-4">{{ news.summary }}</p>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'NewsSection',
    props: {
        newsList: { type: Array, default: () => [] }
    }
}
</script>