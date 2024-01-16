<script setup lang="ts"></script>

<template>
  <div class="body">
    <t-layout>
      <t-aside>
        <t-menu class="menu-right">
          <t-menu-item value="/text/url/analyze" to="/text/url/analyze">
            <template #icon>
              <t-icon name="app" />
            </template>
            URL 解析
          </t-menu-item>
          <t-menu-item value="/text/html/entity" to="/text/html/entity">
            <template #icon>
              <t-icon name="app" />
            </template>
            HTML 字符转义
          </t-menu-item>
          <t-menu-item value="/text/json" to="/text/json">
            <template #icon>
              <t-icon name="app" />
            </template>
            JSON
          </t-menu-item>
        </t-menu>
      </t-aside>
      <t-layout>
        <div class="container">
          <RouterView />
        </div>
      </t-layout>
    </t-layout>
  </div>
</template>

<style lang="less" scoped>
.body {
  .container {
    padding: 20px;
    box-shadow: var(--td-shadow-inset-left);
  }
}
</style>
