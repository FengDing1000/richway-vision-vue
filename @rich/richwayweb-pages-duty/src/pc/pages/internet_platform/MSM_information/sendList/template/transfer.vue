<template>
	<div
		style="border: 1px solid #ccc;padding: 10px
">
		<div>
			<div>待选联系人</div>
			<el-form
				ref="inputRefs"
				:model="searchInput"
				:inline="true"
				style="">
				<el-form-item prop="tableDataName">
					<el-input
						v-model="searchInput.tableDataName"
						icon="search"
						placeholder="请输入搜索内容"
						style="width:240px
"
						@change="realTime" />
				</el-form-item>
			</el-form>
		</div>

		<el-row>
			<el-col :span="10">
				<el-table
					:data="tableData"
					border
					height="280"
					style="width: 100%;margin-bottom: 0
"
					@selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
						width="40" />

					<el-table-column
						v-for="(item, key) in tableKey"
						:key="key"
						:prop="item.value"
						:label="item.name"
						:width="item.width"
						show-overflow-tooltip
					/>
				</el-table>
			</el-col>

			<el-col :span="4">
				<div
					style="margin-top: 100%;margin-left:25%;margin-right:25%
">
					<!-- <el-button @click="selectItems">获取选中数据</el-button> -->
					<el-button
						type="primary"
						icon="icon el-icon-d-arrow-right"
						@click="selectItems" />
				</div>
			</el-col>

			<el-col :span="10">
				<el-table
					:data="resultData"
					height="280"
					style="width: 100%;margin-bottom: 0
"
					border
				>

					<el-table-column
						v-for="(item, key) in tableKey"
						:key="key"
						:prop="item.value"
						:label="item.name"
						:width="item.width"
						show-overflow-tooltip
					/>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button
								size="mini"
								type="danger"
								@click.native.prevent="handleDelete(scope.$index, scope.row,resultData)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/ecmascript-6">
// import RichWayWebUtils from '@rich/richwayweb-utils';
// import RichWayWebComponents from '@rich/richwayweb-components';
// const _log = RichWayWebUtils.console.log;

export default {
    components: {},
    data() {
        return {
            searchInput: {
                tableDataName: ``
            },
            tableKey: [{
                name: `姓名`,
                value: `accountNames`,
                label: 100
            }, {
                name: `电话`,
                value: `accountNbrs`,
                label: 100
            }, {
                name: `职位`,
                value: `accountNbrs`,
                label: 100
            }, {
                name: `备注`,
                value: `accountNbrs`,
                label: 100
            }]
        };
    },
    computed: {},
    mounted() {
        // _log(`sendList has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
		.content-sendList {
			position: relative;
		}
</style>
