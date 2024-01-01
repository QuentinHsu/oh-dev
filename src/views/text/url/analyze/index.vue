<script setup lang="ts">
import { type Ref, reactive, ref, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import type { TypeTextURLAnalyze } from './type'
import Table from './components/table.vue'
import { REG_EXP_URL } from '@/constants/regex.ts'

const input: Ref<string> = ref('')
const inputStatus: TypeTextURLAnalyze['inputStatus'] = reactive({
  isURL: 'default',
})
let inputURLQuery: { params: { [key: string]: string } } = reactive({
  params: {},
})

function onDecodeURL(content: string): string {
  let decode = decodeURIComponent(content)
  while (decode !== content) {
    content = decode
    decode = decodeURIComponent(content)
  }
  return decode
}

const decodeURL: Ref<string> = ref('')
function onClickEmptyInput() {
  input.value = ''
  MessagePlugin.success('Your input has been cleared')
}
function onAnalyzeURL(content: string): string {
  return onDecodeURL(content)
}
function parseURL(url: string): { params: { [key: string]: string } } {
  const queryString = url.split('?')[1] || ''
  const paramsArr = queryString.includes('&') ? queryString.split('&') : []
  const paramsObj = paramsArr.reduce(
    (obj: { [key: string]: string }, param: string) => {
      const [key, value] = param.split('=')
      obj[key] = decodeURIComponent(value)
      return obj
    },
    {},
  )
  return {
    params: paramsObj,
  }
}
watch(
  () => input.value,
  () => {
    if (!input.value) {
      inputStatus.isURL = 'default'
      decodeURL.value = ''
      inputURLQuery = { params: {} }
    }
    else if (REG_EXP_URL.isURL.test(input.value)) {
      inputStatus.isURL = 'success'
      decodeURL.value = onAnalyzeURL(input.value)
      inputURLQuery = parseURL(decodeURL.value)
    }
    else {
      inputStatus.isURL = 'error'
      decodeURL.value = ''
      MessagePlugin.error('请输入正确的 URL 格式！')
    }
  },
)
</script>

<template>
  <div class="text-url-analyze">
    <!-- input -->
    <t-textarea
      v-model="input"
      placeholder="请输入正确格式的 URL 内容"
      name="input"
      :autosize="{ minRows: 5 }"
      :status="inputStatus.isURL"
      class="input"
    />
    <!-- actions -->
    <div class="actions">
      <t-button theme="danger" @click="onClickEmptyInput">
        Empty
      </t-button>
    </div>
    <!-- output -->
    <div class="out-put">
      <Table style="margin-top: 20px" :data="inputURLQuery.params" :row-url="decodeURL" />
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
