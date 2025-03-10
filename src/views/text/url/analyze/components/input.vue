<script setup lang="ts">
import { reactive } from "vue";

import { REG_EXP_URL } from "@/constants/regex.ts";

import type { TypeTextURLAnalyze } from "../type";
import { parseURL } from "../utils";

const emit = defineEmits(["update:modelValue"]);

const form = reactive({
	inputRaw: "",
});

const inputStatus: TypeTextURLAnalyze["inputStatus"] = reactive({
	isHttpURL: "default",
});

function validatorInput(value: string): boolean | Record<PropertyKey, unknown> {
	const infoURL = parseURL(form.inputRaw);

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
}

const formRules = {
	inputRaw: [{ validator: validatorInput }],
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
				placeholder="请输入有效的 HTTP URL 内容"
				:status="inputStatus.isHttpURL"
			/>
		</TFormItem>
	</TForm>
</template>

<style lang="less" scoped></style>
