<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { TdTextareaProps } from 'tdesign-vue-next/lib/textarea/type'
import { isStringConvertibleToObjectNotArray } from '@/utils/is'

const value = ref('')
const valueStatus: Ref<TdTextareaProps['status']> = ref('default')
function onBlur(): void {
  valueStatus.value = value.value === ''
    ? 'default'
    : isStringConvertibleToObjectNotArray(value.value)
      ? 'success'
      : 'error'
}
</script>

<template>
  <div class="enter">
    <t-textarea v-model="value" :autosize="{ minRows: 8 }" :status="valueStatus" @blur="onBlur" />
    <t-icon name="paste" class="paste" />
  </div>
</template>

<style lang="less" scoped>
.enter {
  position: relative;

  // display: inline-block;
  .paste {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }
}
</style>
