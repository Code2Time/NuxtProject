<template>
    <v-card class="white-product-card d-flex flex-column justify-space-between w-100 pa-6 rounded-2xl elevation-2 position-relative h-100">
        <div v-if="product.badge" class="light-badge position-absolute rounded-pill font-weight-bold text-caption pa-1 px-3">
            {{ product.badge }}
        </div>

        <div class="d-flex flex-column flex-grow-1 w-100">
            <div class="d-flex align-center mb-4">
                <v-avatar color="#eff6ff" size="52" class="ml-4 icon-avatar-box flex-shrink-0">
                    <v-icon color="#2563eb" size="26">{{ product.icon || 'mdi-cube-outline' }}</v-icon>
                </v-avatar>
                <div class="overflow-hidden">
                    <h3 class="card-title font-weight-bold text-subtitle-1 mb-1 text-truncate">
                        {{ product.name || product.title }}
                    </h3>
                    <span class="card-category font-weight-bold text-caption d-block text-truncate">
                        {{ product.category || 'سرویس سازمانی' }}
                    </span>
                </div>
            </div>

            <p class="card-desc mb-6 font-weight-medium text-caption overflow-hidden flex-grow-1">
                {{ product.description }}
            </p>

            <div v-if="product.features && product.features.length" class="mb-6">
                <div v-for="(feat, fIdx) in product.features" :key="fIdx" class="d-flex align-center mb-2 card-feature text-caption font-weight-medium">
                    <v-icon small color="#16a34a" class="ml-2 flex-shrink-0">mdi-check-circle</v-icon>
                    <span class="text-truncate">{{ feat }}</span>
                </div>
            </div>
        </div>

        <div class="mt-auto w-100">
            <v-divider class="mb-4 light-divider"></v-divider>
            <div class="d-flex align-center justify-space-between">
                <div>
                    <span class="price-label d-block font-weight-bold text-caption">تعرفه سرویس</span>
                    <span class="price-value font-weight-black text-subtitle-1">{{ product.price || 'تماس بگیرید' }}</span>
                </div>

                <BaseButton
                    :to="`/products/${product.id}`"
                    color="#0f172a"
                    elevation="0"
                    :block="false"
                    :x-large="false"
                    c-class="white--text font-weight-bold px-4 rounded-lg action-btn"
                >
                    مشاهده محصول
                    <v-icon small class="mr-1">mdi-arrow-left</v-icon>
                </BaseButton>
            </div>
        </div>
    </v-card>
</template>

<script>
import BaseButton from '~/components/Base/BaseButton.vue'

export default {
  name: 'ProductCard',

  components: {
    BaseButton
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.white-product-card {
  width: 100% !important;
  max-width: 100% !important;
}

.icon-avatar-box {
  border: 1px solid #bfdbfe !important;
}

.card-title {
  color: #0f172a !important;
}

.card-category {
  color: #2563eb !important;
}

.card-desc {
  color: #334155 !important;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  min-height: 4.8em;
}

.card-feature {
  color: #1e293b !important;
}

.price-label {
  color: #64748b !important;
}

.price-value {
  color: #0f172a !important;
}

.light-badge {
  top: 16px;
  left: 16px;
  background-color: #f1f5f9;
  color: #0f172a;
  border: 1px solid #cbd5e1;
  z-index: 1;
}

.action-btn {
  background-color: #0f172a !important;
}

.action-btn:hover {
  background-color: #1e293b !important;
}
</style>