<template>
	<div class="richway-data-table data-table-standard">
		<div
			v-if="paging.noQuery !== true"
			class="richway-data-query">
			<div
				v-show="queryShow"
				class="query-detail">
				<el-form
					ref="dt_query"
					:inline="true"
					:model="paging.queryInfo"
					label-width="4rem"
					label-position="left"
					class="demo-form-inline">
					<el-row
						v-for="(item, index) in (paging.query || {}).fieldList"
						:gutter="20"
						:key="index">
						<el-col
							v-for="(subItem, subIndex) in item"
							:span="6"
							:key="subIndex">
							<el-form-item v-if="subItem.key && subItem.visibility">
								<div slot="label"><span v-html="subItem.label" /><em class="richway-right">:</em></div>
								<template v-if="subItem.type==='input'">
									<el-input
                                        :size="size"
										v-model="paging.queryInfo[subItem.key]"
										:placeholder="subItem.placeholder"
										:maxlength="subItem.maxlength"
										clearable
										@change="handleQueryInfoChange(subItem)" />
								</template>

								<template v-else-if="subItem.type==='radio'">
									<el-radio
                                        :size="size"
										v-for="(o, i) in subItem.options"
										v-model="paging.queryInfo[subItem.key]"
										:key="i"
										:label="o.value"
										@change="handleQueryInfoChange(subItem)">{{ o.label }}
									</el-radio>
								</template>

								<template v-else-if="subItem.type==='checkbox'">
									<el-checkbox-group v-model="paging.queryInfo[subItem.key]">
										<el-checkbox
                                            :size="size"
											v-for="(o, i) in subItem.options"
											:key="i"
											:label="o.value"
											@change="handleQueryInfoChange(subItem)">{{ o.label }}
										</el-checkbox>
									</el-checkbox-group>
								</template>

								<template v-else-if="subItem.type==='select'">
									<el-select
                                        :size="size"
										v-model="paging.queryInfo[subItem.key]"
										:placeholder="subItem.placeholder"
										:multiple="subItem.multiple"
										collapse-tags
										filterable
										@change="handleQueryInfoChange(subItem)">
										<el-option
											v-for="(o,i) in subItem.options"
											:key="i"
											:label="o.label"
											:value="o.value" />
									</el-select>
								</template>

								<template v-else-if="subItem.type==='date'">
									<el-date-picker
                                        :size="size"
										v-model="paging.queryInfo[subItem.key]"
										:placeholder="subItem.placeholder"
										:start-placeholder="subItem.startPlaceholder"
										:end-placeholder="subItem.endPlaceholder"
										:type="subItem.pickerType"
										:format="subItem.format"
										:default-value="subItem.defaultValue"
										:value-format="subItem.valueFormat"
										range-separator="到"
										@change="handleQueryInfoChange(subItem)" />
								</template>
								<template v-else-if="subItem.type==='segion'">
									<CascaderSegion
                                        :size="size"
										v-model="paging.queryInfo[subItem.key]"
										:change-on-select="true"
										@change="handleQueryInfoChange(subItem)" />
								</template>
							</el-form-item>
						</el-col>
						<el-col
							v-if="index === (((paging.query || {}).fieldList || []).length - 1)"
							:span="6"
							class="richway-right">
							<!--查询面板里面的按钮组-->
							<el-form-item
								class="richway-right query-detail-btn">
								<el-button-group>
									<el-button
										v-for="(btnItem,btnIndex) in paging.query.btnList"
										:key="btnIndex"
										:disabled="!!paging.loading && btnItem.type==='query1'"
										:type="btnItem.btnType"
										iocn="richway-icon"
										size="mini"
										@click="handleQueryBtnClick(btnItem.type)">
										<i
											:class="btnItem.icon"
											class="richway-icon" />
										<span>{{ btnItem.label }}</span>
									</el-button>
								</el-button-group>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div
				v-show="!queryShow"
				class="query-simple">
				<span>查询筛选:</span>
				<div class="info">
					<span
						v-for="(item, index) in querySimpleInfo"
						:key="index">{{ item }}</span>
				</div>
			</div>
			<div
				class="query-toggle"
				@click="handleQueryToggle">
				<i
					:class="[queryShow? 'icon-up-arrow' : 'icon-down-arrow']"
					class="richway-icon" />
				<span>{{ queryTitle }}</span>
			</div>
		</div>
		<div class="richway-data-content">
			<div class="richway-data-header">
				<span class="title">数据列表</span>
				<div class="btn-list richway-right">
					<el-button-group>
						<el-button
							v-for="(item, index) in (paging.table || {}).btnList"
							:key="index"
							:type="item.btnType"
							iocn="richway-icon"
							size="mini"
							@click="handleTableBtnClick(item)">
							<i
								:class="[item.icon]"
								class="richway-icon" />
							<span>{{ item.label }}</span>
						</el-button>
					</el-button-group>
				</div>
			</div>
			<div
				v-loading="paging.loading"
				class="richway-data-list">
				<span id="tablePrev" />
				<el-table
					v-if="((paging.table || {}).fieldList || []).length"
					ref="dt_table"
					:key="changeCount"
					:data="paging.dataList"
					:max-height="paging.tableMaxH"
					tooltip-effect="dark"
					border
					highlight-current-row
					header-row-class-name="richway-table-header"
					style="width: 100%;"
					@current-change="handleTableCurrentChange"
					@row-click="handleRowClick"
					@select="handleTableSelect"
					@selection-change="handleSelectChange">
					<el-table-column
						:width="55 * rem"
						type="selection"
						fixed
						class="el-table-column" />
					<template v-for="(item, index) in (paging.table || {}).fieldList">
						<el-table-column
							v-if="(item.list || []).length"
							:key="index"
							:label="item.label"
							:show-overflow-tooltip="true">
							<template v-for="(subItem, subIndex) in item.list">
								<el-table-column
									v-if="(subItem.list || []).length"
									:key="subIndex"
									:label="subItem.label">
									<template v-for="(o, i) in subItem.list">
										<ColumnItem
											v-if="o.render"
											:column-item="o"
											:key="i" />
										<el-table-column
											v-else
											:label="o.label"
											:fixed="o.fixed"
											:width="o.width ? o.width * rem : ''"
											:sortable="o.sortable"
											:prop="o.key"
											:key="i" />
									</template>
								</el-table-column>
								<template v-else>
									<ColumnItem
										v-if="subItem.render"
										:column-item="subItem"
										:key="subIndex" />
									<el-table-column
										v-else
										:label="subItem.label"
										:fixed="subItem.fixed"
										:width="subItem.width ? subItem.width * rem : ''"
										:sortable="subItem.sortable"
										:prop="subItem.key"
										:key="subIndex" />
								</template>
							</template>
						</el-table-column>
						<template v-else>
							<ColumnItem
								v-if="item.render"
								:column-item="item"
								:key="index" />
							<el-table-column
								v-else
								:label="item.label"
								:fixed="item.fixed"
								:width="item.width? item.width * rem : ''"
								:sortable="item.sortable"
								:show-overflow-tooltip="true"
								:prop="item.key"
								:key="index" />
							<template slot-scope="scope">
								<el-popover
									:key="index"
									placement="top-start"
									trigger="hover">
									<div>{{ scope.row[item.key] }}</div>
									<div
										slot="reference"
										class="name-wrapper">
										<div size="medium">{{ scope.row[item.key] }}</div>
									</div>
								</el-popover>
							</template>
						</template>
					</template>
				</el-table>
				<slot name="list" />
			</div>
			<div class="richway-data-paging">
				<el-pagination
					:current-page="paging.page"
					:page-sizes="paging.rowsList"
					:page-size="paging.rows"
					:total="paging.total"
					:disabled="paging.loading"
					background
					layout="total, sizes, prev, pager, next, jumper, slot"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					@prev-click="handlePrevPage"
					@next-click="handleNextPage">
					<span class="richway-right">共{{ paging.pages }}页 当前第{{ paging.page }}页</span>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import axios from 'axios';
import DataTablePaging from './dataTablePaging.js';
import ColumnItem from './columnItem.vue';
import CascaderSegion from '../region/cascaderSegion';

const { mapState } = require(`vuex`);
const { offset } = RichWayWebUtils;

export default {
    name: `dataTableStandard`,
    components: {
        ColumnItem,
        CascaderSegion
    },
    props: {
        config: {
            type: Object,
            default: () => {
            }
        },
        pagingInfo: {
            type: Object,
            default: null
        },
        manualQuery: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: `small`
        }
    },
    data() {
        return {
            source: null,
            index: 0,
            paging: {},
            queryShow: true,
            changeCount: 0
        };
    },
    computed: {
        ...mapState([`rem`]),
        queryTitle() {
            return this.queryShow ? `收起` : `展开`;
        },
        querySimpleInfo() {
            const arr = [];
            for (const key in this.paging.queryInfo) {
                if (Object.hasOwnProperty.call(this.paging.queryInfo, key)) {
                    const config = this.paging.getConfigByKey(key, this.paging.queryInfo[key]);
                    const value = config.filterValue;
                    if (!(value === null || value === undefined || value === ``)) {
                        arr.push(`${config.label}：${value}`);
                    }
                }
            }
            if (!arr.length) {
                arr.push(`暂时没有设置查询条件`);
            }
            return arr;
        }
    },
    watch: {
        "config.query": {
            handler(curVal) {
                const o = this.paging.getQuery(curVal);
                this.paging.query = o.query;
                this.paging.queryInfo = o.queryInfo;
            },
            deep: true,
            immediate: false
        },
        "config.table": {
            handler(curVal) {
                this.paging.table = this.paging.getTable(curVal);
            },
            deep: true,
            immediate: false
        }
    },
    beforeMount() {
        if (!this.pagingInfo) {
            this.initGetDataFun();
            this.paging = new DataTablePaging(this.config);
        } else {
            this.paging = this.pagingInfo;
        }
        this._log(`dataTable: beforeMount`);
    },
    mounted() {
        if (!this.manualQuery) {
            this.pagingQuery();
        }
        RichWayWebUtils.eventHandler.addHandler(window, `resize`, this.tableResize);
    },
    destroyed() {
        RichWayWebUtils.eventHandler.removeHandler(window, `resize`, this.tableResize);
        this.cancelSearch();
    },
    methods: {
        cancelSearch() {
            // 取消请求
            if (typeof ((this.source || {}).cancel) === `function`) {
                this.source.cancel();
            }
        },
        initGetDataFun() {
            if (typeof (this.config.getDataFun) === `string`) {
                if (!this.$getData[this.config.getDataFun]) {
                    this._log(`this.config.getDataFun is null`);
                }
                this.config.getDataFun = this.$getData[this.config.getDataFun];
            }
        },
        pagingQuery(params = {}) {
            this.cancelSearch();
            this.$nextTick(() => {
                const { CancelToken } = axios;
                this.source = CancelToken.source();
                params.cancelToken = this.source.token;

                this.paging.queryFun(params).then(() => {
                    this.changeCount++;
                    this.$emit(`on-query`, {
                        dataList: this.paging.dataList,
                        queryInfo: this.paging.queryInfo
                    });
                    this.$nextTick(() => {
                        this.tableResize();
                    });
                });
            });
        },
        handleQueryInfoChange(item) {
            this.$emit(`on-query-change`, {
                queryInfo: this.paging.queryInfo,
                field: item
            });
        },
        handleQueryBtnClick(type) {
            if (type === `query`) {
                this.paging.page = 1;
                this.pagingQuery();
                this._log(`current data-table is`, this.paging);
            } else if (type === `reset`) {
                this.paging.queryInfo = this.paging.queryInfoStatic;
            }
        },
        handleTableBtnClick(item) {
            this._log(`table btn has click`, item);
            if ((item.type === `edit` || item.type === `delete`) && !this.paging.selectedList.length) {
                this.$message({
                    message: `请至少选中一行数据`,
                    type: `warning`
                });
                return false;
            }
            item.handleClick(this.paging.selectedList);
        },
        handleQueryToggle() {
            this.queryShow = !this.queryShow;
            this.$nextTick(() => {
                this.getTableMaxH();
            });
        },
        handleSelectChange(selection) {
            this._log(`table checkbox has click`, selection);
            this.paging.selectedList = selection;

            this.$emit(`on-select-change`, {}, this.paging.selectedList);
        },
        // 点击一行，复选框选中
        handleRowClick(row) {
            this.$refs.dt_table.toggleRowSelection(row);

            this.$emit(`on-select-change`, row, this.paging.selectedList);
        },
        handleTableCurrentChange(row) {
            this.$refs.dt_table.setCurrentRow(row);
        },
        handleTableSelect(selection, row) {
            this.$refs.dt_table.setCurrentRow(row);
        },
        // 改变每页显示的条数
        handleSizeChange(val) {
            const index = (this.paging.page - 1) * this.paging.rows;
            this.paging.rows = val;
            this.paging.page = Math.ceil(index / this.paging.rows);
            this._log(`每页 ${val} 条`);

            this.pagingQuery();
        },
        // 改变当前页到某一页
        handleCurrentChange(val) {
            this.paging.page = val;
            this._log(`当前页: ${val}`);

            this.pagingQuery();
        },
        // 上一页
        handlePrevPage() {
            if (this.paging.page > 1) {
                this.paging.page--;
                this._log(`上一页`);
            }
        },
        // 下一页
        handleNextPage() {
            if (this.paging.pages > this.paging.page) {
                this.paging.page++;
                this._log(`下一页`);
            }
        },
        // 表格大小发生了变化
        tableResize() {
            RichWayWebUtils.throttleDuration(this.getTableMaxH, 400, 400)();
        },
        getTableMaxH() {
            const tablePrevOffset = offset(document.getElementById(`tablePrev`));
            const clientH = document.body.clientHeight;
            const dataTable = document.getElementsByClassName(`richway-data-table`)[0];
            const dataPaging = dataTable.getElementsByClassName(`richway-data-paging`)[0];
            const dataPagingH = dataPaging.clientHeight;

            const currentModule = this.$store.state.currentPageInfo.module;
            const currentLayoutInfo = this.$store.state[currentModule].layoutInfo || {};
            const hasFooter = (currentLayoutInfo.footer || {}).display !== `hide`;
            const deviation = hasFooter ? 50 : 24;

            this.paging.tableMaxH = clientH - tablePrevOffset.top - dataPagingH - deviation * this.rem;

            this._log(`clientH:${clientH}, tablePrevOffset:${tablePrevOffset.top}, dataPagingH:${dataPagingH}, tableMaxH:${this.paging.tableMaxH}`);
        }
    }
};
</script>

<style lang="scss">
    .richway-data-table {
        .richway-icon {
            font-size: .7rem;
        }

        .richway-icon + span {
            padding-left: .2rem;
        }
    }

    .data-table-standard{
        .richway-table-header {
            th {
                background: #f8f8f9 !important;
            }
        }

        .richway-data-query,
        .richway-data-content {
            position: relative;
            padding: 0 .9rem;
            margin-bottom: 1.1rem;
            background: #fff;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        }

        .richway-data-header,
        .richway-data-paging {
            padding: .5rem 0;
        }

        .richway-data-query {
            padding: 0;

            .query-simple {
                display: table;
                padding: .8rem .9rem;
            }

            .query-detail-btn{
                .el-form-item{
                    margin-right: 0 !important;
                }
            }

            .info {
                display: table-cell;
                padding-left: .5rem;
                font-size: .6rem;
                vertical-align: middle;
                color: #aaa;

                > span {
                    position: relative;
                    display: inline-block;
                    padding: 0 .5rem;

                    &::before {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: -.15rem;
                        content: " ";
                        border-right: 2px dashed #999;
                    }

                    &:last-child {
                        border-right: none;

                        &::before {
                            display: none;
                        }
                    }
                }
            }

            .query-toggle {
                position: absolute;
                top: .8rem;
                right: .9rem;
                display: inline-block;
                cursor: pointer;
            }

            .el-form {
                padding: 0 .9rem;
            }

            .el-row {
                position: relative;
                padding: .5rem 0;

                &::before {
                    position: absolute;
                    bottom: 0;
                    left: .5rem;
                    right: .5rem;
                    display: inline-block;
                    border-bottom: 1px dashed #999;
                }

                &:last-child::before {
                    display: none;
                }

                .el-form-item {
                    margin-bottom: 0;
                }

                .el-range-editor {
                    width: 15rem !important;
                    input {
                        width: 6.6rem !important;;
                    }
                    .el-range-separator{
                        padding: 0;
                        width: auto;
                    }
                }
            }
        }

        .richway-data-header {
            .title {
                display: inline-block;
                height: 1.8rem;
                line-height: 1.8rem;
            }
            .el-range-editor {
                width: 17rem;
                input {
                    width: 7rem;
                }
            }
        }

        // 序列号连号
        .el-column-checkbox {
            position: relative;
            .el-column-div {
                position: absolute;
                width: .75rem;
                height: .75rem;
                line-height: .75rem;
                text-align: center;
                background: #108ee9;
                top: 0;
                right: -.25rem;
                z-index: 999;
                color: #fff;
                font-size: .5rem;
            }
        }

        // 序列号
        .el-table__fixed-body-wrapper {
            counter-reset: section 0;
            .el-table-column--selection {
                .el-checkbox {
                    position: relative;
                    &:after {
                        content: counter(section);
                        counter-increment: section;
                        color: #fff;
                        position: absolute;
                        width: .75rem;
                        height: .75rem;
                        background: #108ee9;
                        font-size: .5rem;
                        right: -.75rem;
                        top: 0;
                        line-height: .75rem;
                        text-align: center;
                        z-index: 999;
                        -webkit-border-radius: 3px;
                        -moz-border-radius: 3px;
                        border-radius: 3px;
                    }
                }
            }
        }
    }


</style>
