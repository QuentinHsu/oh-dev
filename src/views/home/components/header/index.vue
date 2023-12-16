<script setup lang="ts"></script>

<template>
  <t-head-menu class="header">
    <template #logo>
      <div class="logo">oh dev</div>
    </template>
  </t-head-menu>
</template>

<style lang="less" scoped>
.header {
  background: var(--bg-color-page);
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #e7e7e7;
  .logo {
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
