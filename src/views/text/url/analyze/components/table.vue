<script setup lang="ts">
import { RiFileCopyLine } from "@remixicon/vue";
import type { PrimaryTableCol, TableProps } from "tdesign-vue-next";
import type { PropType, Ref } from "vue";
import { computed, ref, watch } from "vue";

import { copyText } from "@/utils/index.ts";
import { isColor } from "@/utils/is.ts";

interface TypeData {
	fullPath: string;
	params: Record<PropertyKey, string>;
}

const props = defineProps({
	data: {
		type: Object as PropType<TypeData>,
		default: () => ({
			fullPath: "",
			params: {},
		}),
	},
});

const sort = ref<TableProps["sort"]>({
	sortBy: "key",
	descending: true,
});

const urlPath = computed(() => props.data.fullPath?.split("?")[0]);

const selectedRowKeys: Ref<(string | number)[]> = ref([]);

function rehandleSelectChange(value: (string | number)[]): void {
	selectedRowKeys.value = value;
}

interface Item {
	key: string;
	value: string;
}

const tableData: Ref<Item[]> = ref([]);

function sortItems(sort: TableProps["sort"]) {
	let newArray: Item[] = [...tableData.value];

	if (Array.isArray(sort)) {
		return;
	}
	if (sort) {
		newArray = [...newArray].sort((a, b) => {
			if (sort.sortBy === "asc") {
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
	tableData.value = newArray;
}

const columns: PrimaryTableCol[] = [
	{
		colKey: "row-select",
		type: "multiple",
		width: 50,
	},
	{ colKey: "key", title: "Key", width: 350, sorter: true, sortType: "all" },
	{
		colKey: "value",
		title: "Value",
	},
];

const sortChange: TableProps["onSortChange"] = (val) => {
	sort.value = val;
	sortItems(val);
};

const newURL = computed(() => {
	if (!urlPath.value) {
		return "";
	}

	let newURL = "";

	const urlParams =
		selectedRowKeys.value.length > 0
			? `?${selectedRowKeys.value.map((item) => `${item}=${props.data.params[item]}`).join("&")}`
			: "";

	newURL = `${urlPath.value}${urlParams}`;

	return newURL;
});

watch(
	() => props.data,
	() => {
		if (Object.keys(props.data.params).length > 0) {
			const data = [];

			for (const key in props.data.params) {
				if (Object.prototype.hasOwnProperty.call(props.data.params, key)) {
					data.push({
						key,
						value: props.data.params[key],
					});
				}
			}
			tableData.value = data;
		}
	},
	{ immediate: true, deep: true },
);
</script>

<template>
	<div class="params-table">
		<span class="sort-tag">排序：{{ sort }}</span>
		<TTable
			:columns="columns"
			:data="tableData"
			row-key="key"
			:selected-row-keys="selectedRowKeys"
			:sort="sort"
			@select-change="rehandleSelectChange"
			@sort-change="sortChange"
		>
			<template #key="{ row }">
				<div class="column-label">
					<div class="column-label-content">
						{{ row.key }}
					</div>
					<span class="icon-copy">
						<RiFileCopyLine v-show="row.key" @click="copyText(row.key)" />
					</span>
				</div>
			</template>
			<template #value="{ row }">
				<div class="column-label">
					<span class="column-label-content">
						<template v-if="isColor(row.value)">
							<span
								:style="`background-color: ${row.value};padding: 5px; border-radius: 5px;`"
							>
								{{ row.value }}
							</span>
						</template>
						<template v-else>
							{{ row.value }}
						</template>
					</span>
					<span class="icon-copy">
						<RiFileCopyLine v-show="row.value" @click="copyText(row.value)" />
					</span>
				</div>
			</template>
		</TTable>

		<TAlert v-if="newURL" class="copy-url" theme="success" :title="newURL">
			<template #operation>
				<span @click="copyText(newURL)">Copy</span>
			</template>
		</TAlert>
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
.sort-tag {
	padding-left: 16px;
	vertical-align: top;
}
.column-label {
	display: flex;
	align-items: center;
	&-content {
		margin-right: 40px;
		display: inline-flex;
	}
}
.copy-url {
	margin-top: 20px;
}
</style>
