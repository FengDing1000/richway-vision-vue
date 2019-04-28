<template>
	<div class="content content-menu">
        <ContentLeftRight width="27.5rem">
            <div slot="left" class="content-menu-left">
                <div class="menu-query-panel">
                    <h1 class="title">菜单导航
                        <el-tooltip
                            effect="dark"
                            content="刷新菜单"
                            placement="bottom">
                            <i
                                class="richway-icon icon-refresh richway-right"
                                @click="handleRefresh" />
                        </el-tooltip>
                    </h1>
                    <el-form
                        ref="appQueryForm"
                        :model="appQueryForm">
                        <el-form-item>
                            <el-select
                                v-model="appQueryForm.appId"
                                :loading="appLoading"
                                filterable
                                placeholder="平台名称、平台编码"
                                @change="handleChange">
                                <el-option
                                    v-for="(item, index) in appList"
                                    :label="item.appNm || item.value"
                                    :value="item.appId || item.key"
                                    :key="index" />
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <MenuTree
                    :menu-list="menuList"
                    :menu-loading="menuLoading"
                    :type="appQueryForm.appId"
                    @on-click="handleClick"
                    @on-append="handleAppend"
                    @on-remove="handleRemove" />
                <div class="richway-right" style="margin-top: 1rem;">
                    <el-button type="primary" round size="mini" @click="handleAddFirstMenu">新增一级菜单</el-button>
                </div>
            </div>
            <div slot="right" class="content-menu-right" v-loading="currentMenuLoading">
                <div class="menu-edit-panel">
                    <h1 class="title">{{ panelTitle }}
                        <el-tooltip
                            effect="dark"
                            content="跳转到此页面"
                            placement="bottom">
                            <i
                                class="richway-icon icon-links richway-right"
                                @click="handleLinks" />
                        </el-tooltip>
                    </h1>
                    <MenuInfoForm
                        :menu-info="currentMenuInfo"
                        :menu-list="menuList"
                        @on-success="handleUpdateSuccess" />
                </div>
            </div>
        </ContentLeftRight>
	</div>
</template>

<script type="text/ecmascript-6">
import menu from '@rich/richwayweb-utils/lib/model/menu';
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';

const MenuInfoForm = r => require.ensure([], () => r(require(`./menuInfoForm`)), `components/pagesSys/menuManage`);
const MenuTree = r => require.ensure([], () => r(require(`./menuTree`)), `components/pagesSys/menuManage`);
const { deepClone } = RichWayWebUtils;
const {ContentLeftRight} = RichWayWebComponents;

export default {
    components: {
        MenuInfoForm,
        MenuTree,
        ContentLeftRight
    },
    data() {
        return {
            appLoading: false,
            appList: [],
            appQueryForm: {
                appId: ``
            },
            currentAppInfo: {},
            menuList: [],
            menuLoading: false,
            currentMenuLoading: false,
            currentMenuInfo: new menu.Menu(),
            currentParentMenuInfo: new menu.Menu()
        };
    },
    computed: {
        panelTitle() {
            let title = ``;
            if (this.currentMenuInfo.menuId) {
                title = `编辑菜单 -- ${this.currentMenuInfo.menuName}`;
            } else if (this.currentParentMenuInfo.menuId) {
                title = `新增子菜单 -- 父菜单（${this.currentParentMenuInfo.menuName}）`;
            } else {
                title = `新增一级菜单`;
            }
            return title;
        }
    },
    mounted() {
        this._log(`menu_manage has mounted`);
        this.handleQueryApp();
    },
    methods: {
        handleQueryApp() {
            this.appLoading = true;
            this.appList = [];
            this.$getData.GetAppAll().then((res = {}) => {
                this.appList = res.data;
                [this.appQueryForm] = this.appList;
                this.handleQueryMenu();
            }).always(() => {
                this.appLoading = false;
            });
        },
        handleRefresh() {
            this.appList = [];
            this.menuList = [];
            this.currentMenuLoading = false;
            this.handleQueryApp();
            this.currentMenuInfo = new menu.Menu({
                appId: this.appQueryForm.appId
            });
            this.currentParentMenuInfo = new menu.Menu();
        },
        handleLinks() {
            const activeUrl = this.currentMenuInfo.url;
            if (activeUrl) {
                window.open(activeUrl);
            }
        },
        handleQueryMenu() {
            this.menuLoading = true;
            this.$getData.GetMenuListForApp({ appId: this.appQueryForm.appId }).then((res = {}) => {
                this.menuList = res.data;
            }).always(() => {
                this.menuLoading = false;
            });
        },
        handleChange() {
            this.handleQueryMenu();
            this.currentMenuInfo = new menu.Menu({
                appId: this.appQueryForm.appId
            });
            this.currentParentMenuInfo = new menu.Menu();
        },
        handleClick(data) {
            this._log(`click`, data);
            this.currentMenuLoading = true;
            this.$getData.GetMenuInfo({
                menuId: data.menuId
            }).then((res = {}) => {
                this.currentMenuInfo = res.data || {};
                this.currentMenuInfo.appId = this.appQueryForm.appId;
                this.currentMenuLoading = false;
                this.currentParentMenuInfo = new menu.Menu();
            });
        },
        handleAppend(data) {
            this._log(`append`, data);
            this.currentParentMenuInfo = new menu.Menu(data.data);
            this.currentMenuLoading = false;
            this.currentMenuInfo = new menu.Menu({
                appId: this.appQueryForm.appId,
                parentId: data.data.menuId
            });
            this.currentMenuInfo.parentList = deepClone(data.data.parentList);
            this.currentMenuInfo.parentList.push(data.data.menuId);
            this._log(`currentMenuInfo`, this.currentMenuInfo);
        },
        handleRemove(data) {
            this._log(`remove`, data);
            this.$getData.DeleteMenu(data).then(() => {
                this.currentMenuInfo = new menu.Menu({
                    appId: this.appQueryForm.appId
                });
                this.currentMenuLoading = false;
                this.handleQueryMenu();
            });
        },
        handleUpdateSuccess() {
            this.handleQueryMenu();
            this.$getData.GetMenuListForUser().then((res = {}) => {
                this.$store.commit(`SET_MENU_LIST`, res.data);
            });
        },
        // 新增一级菜单
        handleAddFirstMenu() {
            this.currentMenuInfo = new menu.Menu({
                appId: this.appQueryForm.appId
            });
            this.currentParentMenuInfo = new menu.Menu();
        }
    }

};
</script>

<style lang="scss">
    .content-menu {
        position: relative;

        .title {
            position: relative;
            padding: .5rem;
            margin-bottom: .5rem;
            border-left: .3rem solid red;
            background: #f9f9f9;

            .richway-icon {
                position: absolute;
                top: 0;
                right: 0;
                display: inline-block;
                width: 39px;
                height: 39px;
                font-size: 20px;
                line-height: 39px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background: rgba(0, 0, 0, .1);
                }
            }
        }
    }

    .content-menu-left {
        padding: 10px;
        background-color: #fff;

        .menu-query-panel {
            .el-select {
                width: 100%;
            }
        }
    }

    .content-menu-right {
        flex-grow: 1;
        min-height: 100%;
        padding: 10px 10px 10px 30px;
        background-color: #fff;
    }
</style>
