<script setup lang="tsx">
import { ref } from 'vue'

const tabList = {
  param: { label: '参数', value: 'param' },
}
const value = ref(1)
</script>

<template>
  <t-space style="width: 100%;" direction="vertical" size="large">
    <t-tabs v-model="value">
      <t-tab-panel v-for="item in Object.values(tabList)" :key="item.value" :value="item.value" :label="item.label" :destroy-on-hide="false" />
    </t-tabs>
  </t-space>
</template>

<style lang="less" scoped>

</style>
