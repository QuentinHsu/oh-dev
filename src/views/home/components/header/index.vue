<script setup lang="ts">
import { watch } from "vue";
import { useColorMode, UseColorModeReturn } from "@vueuse/core";

const systemThemeMode: UseColorModeReturn = useColorMode(); // Ref<'dark' | 'light'>

const themeMode: UseColorModeReturn = systemThemeMode; // Ref<'dark' | 'light'>

watch(
  () => themeMode.value,
  (value) => {
    switch (value) {
      case "dark":
        document.documentElement.setAttribute("theme-mode", "dark");
        break;
      case "light":
        document.documentElement.removeAttribute("theme-mode");
        break;

      default:
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <t-head-menu class="header">
    <template #logo>
      <div class="logo">oh dev</div>
    </template>
    <template #operations>
      <t-radio-group v-model:value="themeMode">
        <t-radio-button value="light"
          ><t-icon name="mode-light"
        /></t-radio-button>
        <t-radio-button value="dark"
          ><t-icon name="mode-dark"
        /></t-radio-button>
      </t-radio-group>
    </template>
  </t-head-menu>
</template>

<style lang="less" scoped>
.header {
  border-radius: 3px;
  box-shadow: var(--td-shadow-inset-bottom);
  .logo {
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
