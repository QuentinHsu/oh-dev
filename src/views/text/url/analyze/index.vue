<script setup lang="ts">
import { ref, watch, type Ref, reactive } from "vue";
import { REG_EXP_URL } from "@/constants/regex.ts";
import { TypeTextURLAnalyze } from "./type";
import { MessagePlugin } from "tdesign-vue-next";

const input: Ref<string> = ref("");
const inputStatus: TypeTextURLAnalyze["inputStatus"] = reactive({
  isURL: "default",
});

const onDecodeURL = (content: string): string => {
  let decode = decodeURIComponent(content);
  while (decode !== content) {
    content = decode;
    decode = decodeURIComponent(content);
  }
  return decode;
};

const decodeURL: Ref<string> = ref("");

const onAnalyzeURL = (content: string): string => {
  return onDecodeURL(content);
};
watch(
  () => input.value,
  () => {
    if (!input.value) {
      inputStatus.isURL = "default";
      decodeURL.value = "";
    } else if (REG_EXP_URL.isURL.test(input.value)) {
      inputStatus.isURL = "success";
      decodeURL.value = onAnalyzeURL(input.value);
    } else {
      inputStatus.isURL = "error";
      decodeURL.value = "";
      MessagePlugin.error("请输入正确的 URL 格式！");
    }
  }
);
</script>

<template>
  <div class="text-url-analyze">
    <!-- input -->
    <t-textarea
      v-model="input"
      placeholder="请输入"
      name="description"
      :autosize="{ minRows: 5 }"
      :status="inputStatus.isURL"
    />
    <!-- output -->
    <t-collapse :default-value="[1]">
      <t-collapse-panel>
        <template #header>
          <span>Encode Result</span>
        </template>
        <t-textarea
          v-model="decodeURL"
          placeholder="这里是 encode 的结果"
          name="description"
          :autosize="{ minRows: 5 }"
        />
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>

<style lang="less" scoped>
.text-url-analyze {
  .actions {
    margin: 20px 0 20px;
  }
}
</style>
