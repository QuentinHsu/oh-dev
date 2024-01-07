<script setup lang="tsx">
import type { Ref } from 'vue'
import { computed, reactive, ref } from 'vue'
import { RiFileCopyLine } from '@remixicon/vue'
import { isColor } from '@/utils/is.ts'
import { copyText } from '@/utils/index.ts'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
let sort = reactive({
  sortBy: 'key',
  descending: true,
})
const urlPath = computed(() => {
  return props.data.fullPath && props.data.fullPath.split('?')[0]
})
const selectedRowKeys: Ref<string[]> = ref([])
function rehandleSelectChange(value: string[]) {
  selectedRowKeys.value = value
}
type SortOrder = 'asc' | 'desc' | 'all'
interface Item {
  key: string
}
function sortItems(array: Item[], order: SortOrder = 'asc'): Item[] {
  if (order === 'all')
    return array
  return array.sort((a, b) => {
    if (order === 'asc') {
      // 升序排序
      if (a.key > b.key)
        return 1

      else if (a.key < b.key)
        return -1

      else
        return 0
    }
    else {
      // 降序排序
      if (a.key > b.key)
        return -1

      else if (a.key < b.key)
        return 1

      else
        return 0
    }
  })
}
const tableData = computed(() => {
  const data = []
  for (const key in props.data.params) {
    if (Object.prototype.hasOwnProperty.call(props.data.params, key)) {
      data.push({
        key,
        value: props.data.params[key],
      })
    }
  }
  const sortTypeText
    = sort?.descending === true
      ? 'asc'
      : sort?.descending === false
        ? 'desc'
        : 'all'
  return sortItems(data, sortTypeText)
})

const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { colKey: 'key', title: 'Key', width: '350', sorter: true, sortType: 'all' },
  {
    colKey: 'value',
    title: 'Value',
  },
]

function sortChange(val: any) {
  sort = val
}

const newURL = computed(() => {
  if (!urlPath.value)
    return ''

  let newURL = ''
  const urlParams = selectedRowKeys.value.length
    ? `?${selectedRowKeys.value.map((item) => {
    return `${item}=${props.data.params[item]}`
  }).join('&')}`
    : ''
  newURL = `${urlPath.value}${urlParams}`
  return newURL
})
</script>

<template>
  <div class="params-table">
    <t-table
      row-key="key"
      :data="tableData"
      :columns="columns"
      :sort="sort"
      :selected-row-keys="selectedRowKeys"
      @select-change="rehandleSelectChange"
      @sort-change="sortChange"
    >
      <template #key="{ row }">
        <div style="display: flex; align-items: center">
          <span>
            {{ row.key }}
          </span>
          <span class="icon-copy">
            <RiFileCopyLine
              v-show="row.value"
              style="margin-left: 40px"
              @click="copyText(row.value)"
            />
          </span>
        </div>
      </template>
      <template #value="{ row }">
        <div style="display: flex; align-items: center">
          <template v-if="isColor(row.value)">
            <span
              :style="`background-color: ${row.value};padding: 5px; border-radius: 5px;`"
            >{{ row.value }}</span>
          </template>
          <template v-else>
            {{ row.value }}
          </template>
          <span class="icon-copy">
            <RiFileCopyLine
              v-show="row.value"
              style="margin-left: 40px"
              @click="copyText(row.value)"
            />
          </span>
        </div>
      </template>
    </t-table>

    <t-alert v-if="newURL" style="margin-top: 20px;" theme="success" :title="newURL">
      <template #operation>
        <span @click="copyText(newURL)">Copy</span>
      </template>
    </t-alert>
  </div>
</template>

<style lang="less" scoped>
.icon-copy {
  cursor: pointer;
  color: var(--td-success-color-2);
  :hover {
    color: var(--td-success-color-9);
  }
}
:deep(.t-alert__title) {
  word-break: break-all;

}
:deep(.t-alert__message) {
  .t-alert__operation {
    padding: 0;
  }
}
</style>
