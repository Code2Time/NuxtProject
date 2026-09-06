<template>
    <v-fade-transition mode="out-in">
        <NewsSection
            v-if="activeTab === 'news'"
            key="news"
            :news-list="newsList"
        />

        <ShopSection
            v-else-if="activeTab === 'shop'"
            key="shop"
            :products="products"
            @add-to-cart="$emit('add-to-cart', $event)"
        />

        <ProfileSection
            v-else-if="activeTab === 'profile'"
            key="profile"
            :user-data="userData"
        />
    </v-fade-transition>
</template>

<script>
import NewsSection from '~/components/sections/News.vue'
import ShopSection from '~/components/sections/Shop.vue'
import ProfileSection from '~/components/sections/Profile.vue'

export default {
    name: 'MainContent',
    components: { NewsSection, ShopSection, ProfileSection },
    props: {
      activeTab: { type: String, required: true },
      newsList: { type: Array, default: () => [] },
      products: { type: Array, default: () => [] },
      userData: { type: Object, default: () => ({}) }
    }
}
</script>