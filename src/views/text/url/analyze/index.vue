<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

import Table from './components/table.vue'
import Input from './components/input.vue'

const refInput = ref<InstanceType<typeof Input> | null>(null)

const inputURLQuery: Ref<{ status: string, params: { [key: string]: string } }> = ref({
  status: 'success',
  params: {},
})

function onClickEmptyInput() {
  refInput.value?.onClear()
  MessagePlugin.success('Your input has been cleared')
}
</script>

<template>
  <div class="text-url-analyze">
    <!-- input -->
    <Input ref="refInput" v-model:model-value="inputURLQuery" />

    <!-- actions -->
    <div class="actions">
      <t-button theme="danger" @click="onClickEmptyInput">
        Empty
      </t-button>
    </div>
    <!-- output -->
    <div class="out-put">
      <Table style="margin-top: 20px" :data="inputURLQuery" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.text-url-analyze {
  .actions {
    margin: 20px 0 20px;
  }
  :deep(.t-collapse-panel__content) {
    padding: 0;
  }
  :deep(textarea) {
    word-break: break-all;
  }
  .input {
    :deep(textarea) {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }

  .output {
    :deep(textarea) {
      border: 0px;
    }
  }
}
</style>
