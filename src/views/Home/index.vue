<script setup lang="ts">
import Header from "./components/header/index.vue";
import Body from "./components/body/index.vue";
</script>

<template>
  <div class="home">
    <Header class="" />
    <Body class="body" />
  </div>
</template>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 100vh;
  .body {
    flex: 1 1 0%;
    min-height: 0;
    display: flex;
    gap: 1px;
  }
}
</style>
