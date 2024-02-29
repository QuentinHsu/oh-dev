<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

import EnterKeys from "./components/enter-keys.vue";
import Enter from "./components/enter.vue";

const enterValue: Ref<Record<string, any>> = ref({});
const enterKeysValue: Ref<string[]> = ref([]);
</script>

<template>
	<TSpace direction="vertical" size="large">
		<TRow>
			<TDescriptions
				class="content-text"
				item-layout="vertical"
				:label-style="{ padding: '0 0 0 16px' }"
				size="large"
			>
				<TDescriptionsItem label="Object">
					<Enter v-model:value="enterValue" />
				</TDescriptionsItem>
				<TDescriptionsItem label="Keys">
					<EnterKeys v-model:value="enterKeysValue" />
				</TDescriptionsItem>
			</TDescriptions>
			<div v-if="Object.keys(enterValue).length > 0" class="">
				<TDescriptions
					:label-style="{ width: '100px', padding: '0 0 0 16px' }"
					size="large"
				>
					<TDescriptionsItem label="Object.keys">
						{{ Object.keys(enterValue).length }}
					</TDescriptionsItem>
				</TDescriptions>
			</div>
		</TRow>
	</TSpace>
</template>

<style lang="less" scoped>
.t-space,
.t-descriptions,
:deep(.t-descriptions__body) {
	width: 100%;
}

:deep(.t-descriptions__content) {
	box-sizing: border-box;
	height: 100%;
}
</style>
