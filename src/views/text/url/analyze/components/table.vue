<script setup lang="tsx">
import { computed } from "vue";
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
  return data;
});

const columns = [
  { colKey: "key", title: "Key", width: "200" },
  {
    colKey: "value",
    title: "Value",
  },
];
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
  <t-table row-key="index" :data="tableData" :columns="columns">
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
  color: var(--td-success-color-2);
  :hover {
    color: var(--td-success-color-9);
  }
}
</style>
