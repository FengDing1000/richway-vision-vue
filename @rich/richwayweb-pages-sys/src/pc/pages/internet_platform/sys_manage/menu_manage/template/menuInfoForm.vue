<template>
	<div class="richway-menu-panel">
		<el-form
			ref="menuForm"
			:rules="menuRules"
			:model="menuForm"
			label-position="left"
			status-icon
			label-width="5.75rem">
			<el-form-item
				label="菜单类别:"
				required>
				<el-select
                    :disabled="!!menuForm.menuId"
					v-model="menuForm.menuType"
					@change="handleMenuTypeChange">
					<el-option
						v-for="(item, index) in menuTypeList"
						:key="index"
						:label="item.name"
						:value="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item
				label="菜单名称:"
				prop="menuName"
				required>
                <el-cascader
                    v-if="(menuForm.menuType === 'page' || menuForm.menuType === 'label') && type === 'add'"
                    key="cascader"
                    :options="menuListForAvailable"
                    :props="defaultProps"
                    v-model="selectedMenuOptions"
                    :show-all-levels="false"
                    :change-on-select="menuForm.menuType === 'label'"
                    filterable
                    placeholder="请选择页面"
                    @change="handleMenuChange" />
				<el-input
					v-else
					key="input"
					v-model="menuForm.menuName"
					type="type"
					auto-complete="off"
					maxlength="50"
					clearable />
			</el-form-item>
			<el-form-item
				label="父菜单名称:"
				required>
				<el-cascader
					:options="menuList"
					:props="defaultProps"
					v-model="selectedParentOptions"
					change-on-select
					filterable
					placeholder="请选择父菜单"
					@change="handleParentIDChange" />
			</el-form-item>
			<el-form-item
				v-show="menuForm.menuType !== 'label'"
				label="链接地址:"
                required>
				<el-input
					v-model="menuForm.url"
					:readonly="menuForm.menuType === 'page'"
					type="type"
					auto-complete="off"
					maxlength="50"
					clearable />
			</el-form-item>
			<el-form-item
				label="打开方式:"
                required>
				<el-select v-model="menuForm.target">
					<el-option
						v-for="(item, index) in targetList"
						:key="index"
						:label="item.code+'('+item.name+')'"
						:value="item.code" />
				</el-select>
			</el-form-item>
            <!--<el-form-item-->
                <!--v-show="menuForm.menuType === 'page'"-->
                <!--label="布局:">-->
                <!--<el-input-->
                    <!--v-model="menuForm.layoutId"-->
                    <!--type="type"-->
                    <!--auto-complete="off"-->
                    <!--maxlength="50"-->
                    <!--clearable />-->
            <!--</el-form-item>-->
            <!--<el-form-item-->
                <!--v-show="menuForm.menuType === 'page'"-->
                <!--label="组件编码:">-->
                <!--<el-input-->
                    <!--v-model="menuForm.componentId"-->
                    <!--auto-complete="off"-->
                    <!--maxlength="50"-->
                    <!--clearable />-->
            <!--</el-form-item>-->
            <el-form-item
                v-show="menuForm.menuType === 'page'"
                label="配置信息:">
                <el-input
                    v-model="menuForm.config"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    type="textarea"
                    readonly
                    @focus="handleConfigFocus"
                    clearable />
            </el-form-item>
			<el-form-item
				label="图标:">
				<el-input
					v-model="menuForm.icon"
					type="text"
					auto-complete="off"
					maxlength="50"
					readonly
					clearable
					@focus="handleIconFocus">
					<el-button
						slot="append"
						:class="[menuForm.icon]"
						class="richway-icon" />
				</el-input>
			</el-form-item>
			<el-form-item
				label="排序:">
				<el-input-number
					v-model="menuForm.sort"
					:min="1"
					:max="1000" />
			</el-form-item>
			<el-form-item
				label="显示/隐藏:">
				<el-switch
					v-model="menuForm.visible"
					:active-value="1"
					:inactive-value="-1"
					active-text="显示"
					inactive-text="隐藏" />
			</el-form-item>
			<el-form-item
				label="是否根节点:">
				<el-switch
					v-model="menuForm.rootNode"
					:active-value="1"
					:inactive-value="-1"
					active-text="是"
					inactive-text="否" />
			</el-form-item>
			<el-form-item
				label-width="0px"
				class="richway-push-right">
				<el-button
					:loading="saveStatus.loading"
					type="primary"
					round
					@click="submitForm('menuForm')">{{ saveStatus.title }}
				</el-button>
			</el-form-item>
		</el-form>

        <!--选择图标弹窗-->
		<el-dialog
			:visible.sync="dialogIconPanelVisible"
			append-to-body
			title="选择图标">
			<IconPanel
				active-icon="icon-links"
				@on-choose="handleIconChoose" />
		</el-dialog>

        <!--编辑配置信息弹窗-->
        <el-dialog
            :visible.sync="dialogConfigPanelVisible"
            append-to-body
            fullscreen
            title="编辑配置信息">
            <MapConfigEdit
                :menu-config="menuForm.config"
                @on-save="handleConfigChoose"
                @on-cancel="dialogConfigPanelVisible=false;" />
        </el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import menu from '@rich/richwayweb-utils/lib/model/menu';
import targetList from '@rich/richwayweb-utils/lib/model/target';
import validateInfo from '@rich/richwayweb-utils/lib/validator';
import RichWayWebComponents from '@rich/richwayweb-components';

const { IconPanel } = RichWayWebComponents;
const MapConfigEdit = r => require.ensure([], () => r(require(`@rich/richwayweb-map/src/pc/pages/internet_platform/map_config_edit/template`)), `components/pagesSys/menuManage`)

export default {
    name: `MenuInfoForm`,
    components: {
        IconPanel,
        MapConfigEdit
    },
    props: {
        menuInfo: {
            type: Object,
            default: () => {
            }
        },
        menuList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            menuTypeList: menu.menuTypeList,
            menuListForAvailable: [],
            menuForm: new menu.Menu(),
            menuRules: {
                menuName: [
                    { required: true, message: `请输入菜单名称`, trigger: `blur` },
                    { validator: validateInfo.nameAll, trigger: `blur` }
                ]
            },
            saveStatus: {
                loading: false,
                title: `保存`
            },
            defaultProps: {
                children: `children`,
                label: `menuName`,
                value: `menuId`
            },
            selectedMenuOptions: [],
            selectedParentOptions: [],

            dialogIconPanelVisible: false,
            dialogConfigPanelVisible: false
        };
    },
    computed: {
        type() {
            return this.menuInfo.menuId ? `update` : `add`;
        },
        targetList() {
            if (this.menuForm.menuType === `url`) {
                return [
                    {
                        code: `_blank`,
                        name: `在新窗口中打开被链接文档`
                    }
                ];
            } else {
                return targetList;
            }
        }
        // selectedParentOptions: {
        //     get() {
        //         return this.menuInfo.parentList || [];
        //     },
        //     set() {}
        // }
    },
    watch: {
        menuInfo: {
            immediate: true,
            handler() {
                // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                if (typeof ((this.$refs.menuForm || {}).resetFields) === `function`) {
                    this.$refs.menuForm.resetFields();
                }

                this.menuForm = new menu.Menu(this.menuInfo);

                this.selectedMenuOptions = [];
                this.selectedParentOptions = this.menuForm.parentList;
            }
        }
    },
    mounted() {
        this.$getData.GetMenuListForAvailable().then(res => {
            this.menuListForAvailable = res.data;
        });
    },
    methods: {
        initMenuForm(info = {}) {
            this.menuForm = new menu.Menu(info);
        },
        // 切换了菜单类型
        handleMenuTypeChange(code) {
            this.initMenuForm({
                menuType: code
            });
        },
        // 选择了菜单
        handleMenuChange() {
            this._log(`choose menu`, this.selectedMenuOptions);
            const currentMenuInfo = menu.findMenuFromMenuList(this.selectedMenuOptions[this.selectedMenuOptions.length - 1], this.menuListForAvailable);
            this.initMenuForm(currentMenuInfo);
            this._log(`menuForm`, this.menuForm);
        },
        // 选择了父菜单
        handleParentIDChange() {
            this._log(`choose menu`, this.selectedParentOptions);
            this.menuForm.parentId = this.selectedParentOptions[this.selectedParentOptions.length - 1];
        },
        // 显示选择图标弹窗
        handleIconFocus() {
            this._log(`click icon input, choose icon ...`);
            this.dialogIconPanelVisible = !this.dialogIconPanelVisible;
        },
        // 选择了图标
        handleIconChoose(data = {}) {
            this._log(`choose icon`, data);
            this.menuForm.icon = data.icon_fontclass || ``;
            this.dialogIconPanelVisible = false;
        },
        // 显示编辑配置信息弹窗
        handleConfigFocus() {
            this._log(`click config input, change config ...`);
            this.dialogConfigPanelVisible = !this.dialogConfigPanelVisible;
        },
        // 编辑好了配置信息
        handleConfigChoose(str = ``) {
            this._log(`change config`, str);
            this.menuForm.config = str || ``;
            this.dialogConfigPanelVisible = false;
        },
        // 表单验证
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.saveStatus.loading = true;
                    this.saveStatus.title = `保存中`;
                    this.saveFun();
                } else {
                    this._log(`error submit!!`);
                    return false;
                }
            });
        },
        // 保存
        saveFun() {
            this.$getData.SaveMenu(this.menuForm).then(res => {
                if (res.success === true) {
                    this.$emit(`on-success`, res);
                }
            }).catch(err => {
                this.$emit(`on-failed`, err);
            }).always(() => {
                this.saveStatus.loading = false;
                this.saveStatus.title = `保存`;
            });
        }
    }
};
</script>

<style lang="scss">
    .richway-menu-panel {
        margin-top: 1rem;

        .el-select,
        .el-cascader {
            width: 100%;
        }
    }
</style>
