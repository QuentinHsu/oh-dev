<script setup lang="tsx">
import { computed, ref } from "vue";
import { isColor } from "@/utils/is.ts";
import { useClipboard } from "@vueuse/core";
import { MessagePlugin } from "tdesign-vue-next";
import { RiFileCopyLine } from "@remixicon/vue";

const { copy } = useClipboard();

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
type SortOrder = "asc" | "desc" | "all";
interface Item {
  key: string;
}
function sortItems(array: Item[], order: SortOrder = "asc"): Item[] {
  if (order === "all") return array;
  return array.sort((a, b) => {
    if (order === "asc") {
      // 升序排序
      if (a.key > b.key) {
        return 1;
      } else if (a.key < b.key) {
        return -1;
      } else {
        return 0;
      }
    } else {
      // 降序排序
      if (a.key > b.key) {
        return -1;
      } else if (a.key < b.key) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}
const tableData = computed(() => {
  const data = [];
  for (let key in props.data) {
    if (props.data.hasOwnProperty(key)) {
      data.push({
        key,
        value: props.data[key],
      });
    }
  }
  const sortTypeText =
    sort?.value?.descending === true
      ? "asc"
      : sort?.value?.descending === false
      ? "desc"
      : "all";
  sortItems(data, sortTypeText);
  return data;
});

const columns = [
  { colKey: "key", title: "Key", width: "350", sorter: true, sortType: "all" },
  {
    colKey: "value",
    title: "Value",
  },
];
const sort = ref({
  sortBy: "key",
  descending: true,
});
const sortChange = (val: any) => {
  sort.value = val;
};
const copyText = (content: string): void => {
  copy(content)
    .then(() => {
      MessagePlugin.success("Copy successful");
    })
    .catch(() => {
      MessagePlugin.error("Copy failed");
    });
};
</script>

<template>
  <t-table
    row-key="index"
    :data="tableData"
    :columns="columns"
    :sort="sort"
    @sort-change="sortChange"
  >
    <template #key="{ row }">
      <div style="display: flex; align-items: center">
        <span>
          {{ row.key }}
        </span>
        <span class="icon-copy">
          <RiFileCopyLine
            style="margin-left: 40px"
            v-show="row.value"
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
            >{{ row.value }}</span
          >
        </template>
        <template v-else>{{ row.value }}</template>
        <span class="icon-copy">
          <RiFileCopyLine
            style="margin-left: 40px"
            v-show="row.value"
            @click="copyText(row.value)"
          />
        </span>
      </div>
    </template>
  </t-table>
</template>

<style lang="less" scoped>
.icon-copy {
  cursor: pointer;
  color: var(--td-success-color-2);
  :hover {
    color: var(--td-success-color-9);
  }
}
</style>
