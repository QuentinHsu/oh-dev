<script setup lang="tsx">
import { RiArrowUpDownLine } from "@remixicon/vue";
import { ref } from "vue";
import { encode } from "html-entities";

const input = ref("");
const output = ref("");

const onBlurInput = () => {
  let encodeText: string = encode(input.value);
  // TODO 处理空格字符串默认不被转义的情况
  encodeText.replace(/ /g, "&amp;nbsp;");
  output.value = encodeText;
};
</script>

<template>
  <div class="text-html-entity">
    <!-- input -->
    <t-textarea
      v-model="input"
      placeholder="请输入文本内容"
      name="description"
      :autosize="{ minRows: 5 }"
      @blur="onBlurInput"
    />
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
      "
    >
      <RiArrowUpDownLine />
    </div>

    <!-- output -->
    <t-textarea
      v-model="output"
      placeholder="请输入文本内容"
      name="description"
      :autosize="{ minRows: 5 }"
    />
  </div>
</template>

<style lang="less" scoped></style>
