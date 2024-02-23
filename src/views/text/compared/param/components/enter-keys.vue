<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import type { TdTextareaProps } from 'tdesign-vue-next/lib/textarea/type'
import { MessagePlugin } from 'tdesign-vue-next'
import { isStringConvertibleToObjectNotArray } from '@/utils/is'

const emit = defineEmits(['update:value'])
const value = ref('')
const valueStatus: Ref<TdTextareaProps['status']> = ref('default')
function onBlur(): void {
  if (valueStatus.value === 'error')
    MessagePlugin[valueStatus.value]('请输入正确的 JSON 字符串')
}
function onChange(): void {
  valueStatus.value = value.value === '' ? 'default' : isStringConvertibleToObjectNotArray(value.value) ? 'success' : 'error'
  if (valueStatus.value === 'success')
    emit('update:value', JSON.parse(value.value))
  else
    emit('update:value', {})
}
</script>

<template>
  <div class="enter-keys">
    <t-textarea v-model="value" :autosize="{ minRows: 8, maxRows: 8 }" :status="valueStatus" @blur="onBlur" @change="onChange" />
    <t-button>确定</t-button>
  </div>
</template>

<style lang="less" scoped>
.enter-keys {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
