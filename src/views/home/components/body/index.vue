<script setup lang="ts"></script>

<template>
  <div class="body">
    <t-layout>
      <t-aside>
        <t-menu class="menu-right">
          <t-menu-item value="0" to="/text/url/analyze">
            <template #icon>
              <t-icon name="app" />
            </template>
            URL 解析
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
