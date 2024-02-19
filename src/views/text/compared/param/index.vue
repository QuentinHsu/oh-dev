<script setup lang="ts"></script>

<template>
  <t-space style="width: 100%;" direction="vertical" size="large">
    <t-row>
      <t-descriptions item-layout="vertical" size="large" style="width: 100%" :label-style="{ padding: '0 0 0 16px' }">
        <t-descriptions-item label="Object">
          <t-textarea :autosize="{ minRows: 8 }" />
        </t-descriptions-item>
        <t-descriptions-item label="Keys">
          <t-textarea :autosize="{ minRows: 8 }" />
        </t-descriptions-item>
      </t-descriptions>
    </t-row>
  </t-space>
</template>

<style lang="less" scoped>
:deep(.t-descriptions__body) {
  width: 100%
}
:deep(.t-descriptions__body td) {

}
</style>
