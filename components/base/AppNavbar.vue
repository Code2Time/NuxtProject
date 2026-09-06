<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      class="glass-drawer"
      dark
      fixed
      app
      disable-route-watcher
    >
      <div class="pa-4 text-center border-bottom-glass">
        <v-avatar size="64" class="mb-2">
          <v-icon size="40" color="white">mdi-account-circle</v-icon>
        </v-avatar>
        <div class="font-weight-bold white--text">کاربر سیستم</div>
        <div class="caption text-white-50">user@example.com</div>
      </div>

      <div class="drawer-menu-container pa-2">
        <div
          class="drawer-item"
          :class="{ 'active-drawer-item': activeTab === 'news' }"
          @click="onMobileTabSelect('news')"
        >
          <v-icon class="ml-3" color="white">mdi-newspaper-variant-outline</v-icon>
          <span class="tab-text">اخبار و اطلاعیه‌ها</span>
        </div>

        <div
          class="drawer-item mt-2"
          :class="{ 'active-drawer-item': activeTab === 'shop' }"
          @click="onMobileTabSelect('shop')"
        >
          <v-icon class="ml-3" color="white">mdi-storefront-outline</v-icon>
          <span class="tab-text">فروشگاه محصولات</span>
        </div>

        <div
          class="drawer-item mt-2"
          :class="{ 'active-drawer-item': activeTab === 'profile' }"
          @click="onMobileProfileClick"
        >
          <v-icon class="ml-3" color="white">mdi-account-cog-outline</v-icon>
          <span class="tab-text">پروفایل کاربری</span>
        </div>
      </div>
    </v-navigation-drawer>

    <v-app-bar flat color="transparent" class="glass-header px-2 px-md-4" dark app>
      <!-- اصلاح نمایش آیکون همبرگری در دسکتاپ و موبایل -->
      <v-app-bar-nav-icon
        class="d-lg-none ml-2 white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <div class="navbar-title font-weight-bold">
        پنل مدیریت و کاربری
      </div>

      <v-spacer></v-spacer>

      <div class="d-none d-lg-flex">
        <v-btn
          text
          class="custom-tab-item"
          :class="{ 'active-tab': activeTab === 'news' }"
          @click="$emit('update:activeTab', 'news')"
        >
          <v-icon right class="ml-2">mdi-newspaper-variant-outline</v-icon>
          اخبار و اطلاعیه‌ها
        </v-btn>

        <v-btn
          text
          class="custom-tab-item"
          :class="{ 'active-tab': activeTab === 'shop' }"
          @click="$emit('update:activeTab', 'shop')"
        >
          <v-icon right class="ml-2">mdi-storefront-outline</v-icon>
          فروشگاه محصولات
        </v-btn>

        <v-btn
          text
          class="custom-tab-item"
          :class="{ 'active-tab': activeTab === 'profile' }"
          @click="$emit('open-security')"
        >
          <v-icon right class="ml-2">mdi-account-cog-outline</v-icon>
          پروفایل کاربری
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    activeTab: { type: String, required: true, default: 'news' }
  },
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    onMobileTabSelect(tab) {
      this.$emit('update:activeTab', tab)
      this.drawer = false
    },
    onMobileProfileClick() {
      this.drawer = false
      this.$emit('open-security')
    }
  }
}
</script>

<style scoped>
.navbar-title {
  font-size: 1.1rem !important;
  color: #ffffff !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.custom-tab-item {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85) !important;
  border-radius: 12px !important;
  margin: 0 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
  text-transform: none !important;
  height: 40px !important;
}

.custom-tab-item:hover {
  background: rgba(255, 255, 255, 0.12) !important;
}

.active-tab {
  background: rgba(255, 255, 255, 0.22) !important;
  color: #ffffff !important;
  font-weight: 700 !important;
}

.drawer-menu-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.drawer-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer !important;
  user-select: none;
  transition: background-color 0.2s ease;
  position: relative;
  z-index: 10;
}

.drawer-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.active-drawer-item {
  background: rgba(255, 255, 255, 0.2) !important;
}

.tab-text {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.95rem;
}
</style>