<script setup lang="ts">
import { reactive } from 'vue'
import type { TypeTextURLAnalyze } from '../type'
import { REG_EXP_URL } from '@/constants/regex.ts'

const form = reactive({
  inputRaw: '',
})
const inputStatus: TypeTextURLAnalyze['inputStatus'] = reactive({
  isURL: 'default',
})
function validatorInput(value: string): boolean | object {
  if (!value) {
    inputStatus.isURL = 'default'
    return { result: true, message: '', type: 'success' }
  }
  else if (REG_EXP_URL.isURL.test(value)) {
    inputStatus.isURL = 'success'
    return { result: true, message: '太强了，你输入了个有效的 HTTP URL！', type: 'success' }
  }
  else {
    inputStatus.isURL = 'error'
    return { result: false, message: '不太对劲儿啊！我觉得它不是一个有效的 HTTP URL！', type: 'error' }
  }
}
const formRules = {
  inputRaw: [
    { validator: validatorInput },
  ],
}
</script>

<template>
  <t-form label-width="0" :data="form" :rules="formRules">
    <t-form-item name="inputRaw">
      <t-textarea
        v-model="form.inputRaw"
        placeholder="请输入有效的 HTTP URL 内容"
        :autosize="{ minRows: 5 }"
        :status="inputStatus.isURL"
        class="input-textarea"
      />
    </t-form-item>
  </t-form>
</template>

<style lang="less" scoped></style>
