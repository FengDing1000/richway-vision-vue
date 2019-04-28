<template>
	<div class="content content-authority-manage">
		<div class="authority-manage-query richway-shadow">
			<el-form
				:inline="true"
				:model="ruleForm"
				label-width="80px"
				label-position="left">
				<el-row
					:gutter="20">
					<el-col
						:span="6">
						<el-form-item label="选择角色">
							<el-select
								v-model="ruleForm.roleCode"
								placeholder="请选择角色"
								filterable
								@change="handleChange('role')">
								<el-option
									v-for="(o,i) in roleList"
									:key="i"
									:label="o.roleName"
									:value="o.roleCode" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col
						:span="6">
						<el-form-item label="选择应用">
							<el-select
								v-model="ruleForm.appId"
								placeholder="请选择应用"
								filterable
								@change="handleChange('app')">
								<el-option
									v-for="(o,i) in appList"
									:key="i"
									:label="o.appNm || o.value"
									:value="o.appId || o.key" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col
						:span="6"
						class="richway-right">
						<el-form-item class="richway-right">
							<el-button-group>
								<el-button
									type="primary"
									@click="handleSave">
									<span>保存</span>
								</el-button>
							</el-button-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div
			v-loading="menuLoading"
			class="authority-manage-tree richway-shadow richway-clear">
			<el-tree
				ref="tree"
				:data="menuListForApp"
				:default-checked-keys="hasCheckedList"
				:props="defaultProps"
				node-key="menuId"
                check-on-click-node
				default-expand-all
				show-checkbox />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    components: {},
    data() {
        return {
            ruleForm: {
                roleCode: ``,
                appId: ``
            },
            roleList: [],
            appList: [],
            menuListForAppAndRole: [],
            menuListForApp: [],
            menuLoading: false,
            defaultProps: {
                children: `children`,
                label: `menuName`
            }
        };
    },
    computed: {
        hasCheckedList() {
            const arr = [];
            for (const item of this.menuListForAppAndRole) {
                arr.push(item.value);
            }
            return arr;
        }
    },
    mounted() {
        this._log(`authority_manage has mounted`);

        // 获取角色列表
        this.$getData.GetRoleList().then((res = {}) => {
            if (res.success === true) {
                this.roleList = res.data;
            }
        });

        // 获取平台列表
        this.$getData.GetAppAll().then((res = {}) => {
            if (res.success === true) {
                this.appList = res.data;
            }
        });
    },
    methods: {
        handleChange(type) {
            if (type === `app` && this.ruleForm.appId) {
                this.menuLoading = true;
                this.menuListForApp = [];
                this.$getData.GetMenuListForApp({
                    appId: this.ruleForm.appId
                }).then((res = {}) => {
                    this.menuListForApp = res.data;
                }).always(() => {
                    this.menuLoading = false;
                });
            }
            if (this.ruleForm.appId && this.ruleForm.roleCode) {
                this.menuLoading = true;
                this.menuListForAppAndRole = [];
                this.$getData.GetMenuListForAppAndRole({
                    appId: this.ruleForm.appId,
                    roleCode: this.ruleForm.roleCode
                }).then((res = {}) => {
                    this.menuListForAppAndRole = res.data;
                }).always(() => {
                    this.menuLoading = false;
                });
            }
        },
        handleSave() {
            const treeList = this.$refs.tree.getCheckedNodes();
            this._log(treeList);
            if (treeList.length) {
                const menuIds = [];
                for (const item of treeList) {
                    menuIds.push(item.menuId);
                }
                const info = {
                    pageIds: menuIds.join(`,`),
                    roleCode: this.ruleForm.roleCode,
                    appId: this.ruleForm.appId
                };
                this.$getData.SetMenuListForAppAndRole(info);
            } else {
                this.$message({
                    showClose: true,
                    message: `请至少选择一个菜单`,
                    type: `success`
                });
            }
        }
    }

};
</script>

<style lang="scss">
    .content-authority-manage {
        position: relative;
        padding-bottom: 50px !important;

        .el-tree-node__content {
            height: 40px !important;
        }

        .el-tree-node {
            float: left;
            display: inline-block;
            width: 240px;
            margin-right: 20px;
            background-color: rgba(16, 142, 233, .1);
        }
    }

    .authority-manage-query,
    .authority-manage-tree {
        padding: 10px;
        margin-bottom: 20px;
        background-color: #fff;
    }

    .authority-manage-tree {
        min-height: 300px;
    }
</style>
