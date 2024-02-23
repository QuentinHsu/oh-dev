<script setup lang="ts">
import { type Ref, ref } from 'vue'
import Enter from './components/enter.vue'
import EnterKeys from './components/enter-keys.vue'

const enterValue: Ref<{ [key: string]: any }> = ref({})
const enterKeysValue: Ref<string[]> = ref([])
</script>

<template>
  <t-space style="width: 100%;" direction="vertical" size="large">
    <t-row>
      <t-descriptions
        item-layout="vertical"
        size="large" style="width: 100%" :label-style="{ padding: '0 0 0 16px' }"
        class="content-text"
      >
        <t-descriptions-item label="Object">
          <Enter v-model:value="enterValue" />
        </t-descriptions-item>
        <t-descriptions-item label="Keys">
          <EnterKeys v-model:value="enterKeysValue" />
        </t-descriptions-item>
      </t-descriptions>
      <div v-if="Object.keys(enterValue).length > 0" class="">
        <t-descriptions
          size="large" style="width: 100%" :label-style="{ width: '100px', padding: '0 0 0 16px' }"
        >
          <t-descriptions-item label="Object.keys">
            {{ Object.keys(enterValue).length }}
          </t-descriptions-item>
        </t-descriptions>
      </div>
    </t-row>
  </t-space>
</template>

<style lang="less" scoped>
:deep(.t-descriptions__body) {
  width: 100%
}
:deep(.t-descriptions__content ) {
  box-sizing: border-box;
  height: 100%;
}
</style>
