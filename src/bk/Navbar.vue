<template id="navbar">
<el-menu>
	<el-row>
		<el-col :span="3"></el-col>
		<el-col :span="2">
			<el-row>
				<img src alt style />LOGO
			</el-row>
		</el-col>
		<el-col :span="8">
			<el-menu mode="horizontal">
				<el-menu-item index="1">Explore</el-menu-item>
				<el-menu-item index="2">Hot</el-menu-item>
				<el-menu-item index="3">Follow</el-menu-item>
				<el-menu-item index="4">Waiting Answer</el-menu-item>
				<el-menu-item index="4" disabled>No ads and short videos</el-menu-item>
			</el-menu>
		</el-col>
		<el-col :span="5">
			<el-row>
				<el-input v-model="searchBox" placeholder="Waiting for your brain fxxk"></el-input>
				<!-- <el-button>123</el-button> -->
			</el-row>
		</el-col>
		<el-col :span="3">
			<el-row>
				<!-- <img src alt="AVATAR" /> -->
				<el-dropdown>
					<span>
						Username
      					<el-icon class="el-icon--right">
							<arrow-down />
						</el-icon>	
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item>个人信息</el-dropdown-item>
							<el-dropdown-item>我的回答</el-dropdown-item>
							<el-dropdown-item>管理页面</el-dropdown-item>
							<el-dropdown-item divided>退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>		
			</el-row>
		</el-col>
		<el-col :span="3"></el-col>
	</el-row>
</el-menu>
</template>

<script setup>

import { ArrowDown } from '@element-plus/icons-vue'


</script>

<style scoped>
/* .el-col {
	border: 1px solid;
} */

.el-row {
	justify-content: center;
}

div {
	height: 100%;
	align-items: center;
}
</style>