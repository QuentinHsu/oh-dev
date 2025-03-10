/* eslint perfectionist/sort-objects: "error" */
<script setup lang="ts">
import { MessagePlugin } from "tdesign-vue-next";
import type { Ref } from "vue";
import { ref } from "vue";

import Input from "./components/input.vue";
import Table from "./components/table.vue";

const refInput = ref<InstanceType<typeof Input> | null>(null);

const inputURLQuery: Ref<{
	raw: string;
	status: string;
	params: Record<string, string>;
	fullPath: string;
}> = ref({
	status: "success",
	fullPath: "",
	params: {},
	raw: "",
});

function onClickEmptyInput() {
	refInput.value?.onClear();
	MessagePlugin.success("Your input has been cleared");
}
</script>

<template>
	<div class="text-url-analyze">
		<!-- input -->
		<Input v-model:model-value="inputURLQuery" ref="refInput" />

		<!-- actions -->
		<div class="actions">
			<TButton
				:disabled="!Boolean(inputURLQuery.raw)"
				theme="danger"
				@click="onClickEmptyInput"
			>
				Empty
			</TButton>
		</div>
		<!-- output -->
		<div class="out-put">
			<Table :data="inputURLQuery" />
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
