<script setup lang="ts">
import { reactive } from 'vue'
import type { TypeTextURLAnalyze } from '../type'
import { parseURL } from '../utils'
import { REG_EXP_URL } from '@/constants/regex.ts'

const emits = defineEmits([
  'update:modelValue',
])
const form = reactive({
  inputRaw: '',
})
const inputStatus: TypeTextURLAnalyze['inputStatus'] = reactive({
  isHttpURL: 'default',
})
function validatorInput(value: string): boolean | object {
  const infoURL = parseURL(form.inputRaw)
  if (!value) {
    inputStatus.isHttpURL = 'default'
    emits('update:modelValue', infoURL)
    return { result: true, message: '', type: 'success' }
  }
  else if (REG_EXP_URL.isHttpURL.test(value)) {
    inputStatus.isHttpURL = 'success'
    emits('update:modelValue', infoURL)
    return { result: true, message: '太强了，你输入了个有效的 HTTP URL！', type: 'success' }
  }
  else {
    inputStatus.isHttpURL = 'error'
    emits('update:modelValue', infoURL)
    return { result: false, message: '不太对劲儿啊！我觉得它不是一个有效的 HTTP URL！', type: 'error' }
  }
}
/**
 * 清空输入
 */
function onClear(): void {
  form.inputRaw = ''
}
const formRules = {
  inputRaw: [
    { validator: validatorInput },
  ],
}
defineExpose({
  onClear,
})
</script>

<template>
  <t-form label-width="0" :data="form" :rules="formRules">
    <t-form-item name="inputRaw">
      <t-textarea
        v-model="form.inputRaw"
        placeholder="请输入有效的 HTTP URL 内容"
        :autosize="{ minRows: 5 }"
        :status="inputStatus.isHttpURL"
        class="input-textarea"
      />
    </t-form-item>
  </t-form>
</template>

<style lang="less" scoped></style>
