<script setup lang="ts">
import { reactive, watch } from "vue";

import { REG_EXP_URL } from "@/constants/regex.ts";

import type { TypeTextURLAnalyze } from "../type";
import { parseURL } from "../utils";

const emit = defineEmits(["update:modelValue"]);

const form = reactive({
	inputRaw: "",
	inputDecoded: "",
});

const inputStatus: TypeTextURLAnalyze["inputStatus"] = reactive({
	isHttpURL: "default",
});

function validatorInput(value: string): boolean | Record<PropertyKey, unknown> {
	const infoURL = parseURL(value);

	if (!value) {
		inputStatus.isHttpURL = "default";
		emit("update:modelValue", infoURL);

		return { result: true, message: "", type: "success" };
	} else if (REG_EXP_URL.isHttpURL.test(value)) {
		inputStatus.isHttpURL = "success";
		emit("update:modelValue", infoURL);

		return {
			result: true,
			message: "太强了，你输入了个有效的 HTTP URL！",
			type: "success",
		};
	} else {
		inputStatus.isHttpURL = "error";
		emit("update:modelValue", infoURL);

		return {
			result: false,
			message: "不太对劲儿啊！我觉得它不是一个有效的 HTTP URL！",
			type: "error",
		};
	}
}

/**
 * 清空输入
 */
function onClear(): void {
	form.inputRaw = "";
	form.inputDecoded = "";
}

watch(
	() => form.inputRaw,
	(newValue) => {
		try {
			form.inputDecoded = decodeURIComponent(newValue);
		} catch {
			form.inputDecoded = "";
		}
	},
);

const formRules = {
	inputDecoded: [{ validator: validatorInput }],
};

defineExpose({
	onClear,
});
</script>

<template>
	<TForm :data="form" label-width="0" :rules="formRules">
		<TFormItem name="inputRaw">
			<TTextarea
				v-model="form.inputRaw"
				:autosize="{ minRows: 5 }"
				class="input-textarea"
				placeholder="请输入原始 HTTP URL 内容"
				:status="inputStatus.isHttpURL"
			/>
		</TFormItem>

		<TFormItem name="inputDecoded">
			<TTextarea
				v-model="form.inputDecoded"
				:autosize="{ minRows: 5 }"
				class="input-textarea"
				placeholder="显示 decodeURIComponent 后的内容"
				:status="inputStatus.isHttpURL"
			/>
		</TFormItem>
	</TForm>
</template>

<style lang="less" scoped></style>
