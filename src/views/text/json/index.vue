<script setup lang="ts">
import JsonEditorVue from 'json-editor-vue'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import { ref } from 'vue'

const value = ref()
</script>

<template>
  <div class="text-json">
    <JsonEditorVue
      v-model="value"
      mode="text"
      class="jse-theme-dark"
    />
  </div>
</template>

<style lang="less" scoped></style>
