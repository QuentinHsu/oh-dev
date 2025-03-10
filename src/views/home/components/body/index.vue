<script setup lang="ts">
interface menuItem {
	path: string;
	name: string;
	icon: string;
}
const menuList: menuItem[] = [
	{ path: "/text/url/analyze", name: "URL 解析", icon: "app" },
	// { path: "/text/html/entity", name: "HTML 字符转义", icon: "app" },
	// { path: "/text/json", name: "JSON", icon: "app" },
	// { path: "/text/compared", name: "对比", icon: "app" },
];
</script>

<template>
	<div class="body">
		<TLayout>
			<TAside>
				<TMenu class="menu-right">
					<TMenuItem
						v-for="item in menuList"
						:key="item.path"
						:to="{ path: item.path }"
						:value="item.path"
					>
						<template #icon>
							<TIcon :name="item.icon" />
						</template>
						{{ item.name }}
					</TMenuItem>
				</TMenu>
			</TAside>
			<TLayout>
				<div class="container">
					<RouterView />
				</div>
			</TLayout>
		</TLayout>
	</div>
</template>

<style lang="less" scoped>
.body {
	.container {
		padding: 20px;
		box-shadow: var(--td-shadow-inset-left);
	}
}
</style>
