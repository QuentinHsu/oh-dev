<script setup lang="ts">
interface menuItem {
  path: string
  name: string
  icon: string
}
const menuList: Array<menuItem> = [

  { path: '/text/url/analyze', name: 'URL 解析', icon: 'app' },
  { path: '/text/html/entity', name: 'HTML 字符转义', icon: 'app' },
  { path: '/text/json', name: 'JSON', icon: 'app' },
]
</script>

<template>
  <div class="body">
    <t-layout>
      <t-aside>
        <t-menu class="menu-right">
          <t-menu-item v-for="item in menuList" :key="item.path" :value="item.path" :to="{ path: item.path }">
            <template #icon>
              <t-icon :name="item.icon" />
            </template>
            {{ item.name }}
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
