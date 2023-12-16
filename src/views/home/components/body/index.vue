<script setup lang="ts"></script>

<template>
  <div class="body">
    <t-menu class="menu-right">
      <t-menu-item value="0">
        <template #icon>
          <t-icon name="app" />
        </template>
        URL 解析
      </t-menu-item>
    </t-menu>
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="less" scoped>
.body {
  .menu-right,
  .container {
    flex: 1 1 0%;
    min-width: 0;
  }
  .menu-right {
    max-width: 220px;
    flex: 1 1 0%;
    min-width: 0;
  }
  .container {
    padding: 20px;
    box-shadow: var(--td-shadow-inset-left);
  }
}
</style>
