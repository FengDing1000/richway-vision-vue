<template>
	<div class="richway-data-table data-table-choice">
		<div
			v-if="paging.noQuery !== true"
			class="richway-data-query">
			<div
				class="query-detail">
				<el-form
					ref="dt_query"
					:inline="true"
					:model="paging.queryInfo"
					label-width="3rem"
					label-position="left"
					class="demo-form-inline">
					<el-row
						v-for="(item, index) in (paging.query || {}).fieldList"
						:gutter="20"
						:key="index">
						<el-col
							v-for="(subItem, subIndex) in item"
							:span="12"
							:key="subIndex">
							<el-form-item v-if="subItem.key && subItem.visibility">
								<div slot="label"><span v-html="subItem.label" /><em class="richway-right">:</em></div>
								<template v-if="subItem.type==='input'">
									<el-input
										v-model="paging.queryInfo[subItem.key]"
										:placeholder="subItem.placeholder"
										:maxlength="subItem.maxlength"
										clearable
										@change="handleQueryInfoChange(subItem)" />
								</template>
							</el-form-item>
						</el-col>
						<el-col
							v-if="index === 0"
							:span="12"
							class="richway-right">
							<!--查询面板里面的按钮组-->
							<el-form-item
								class="richway-right">
								<el-button-group>
									<el-button
										v-for="(btnItem,btnIndex) in paging.query.btnList"
										:key="btnIndex"
										:disabled="!!paging.loading && btnItem.type==='query'"
										:type="btnItem.btnType"
										iocn="richway-icon"
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
		</div>
		<div class="richway-data-content">
			<div
				v-loading="paging.loading"
				class="richway-data-list">
				<span id="tablePrev" />
				<el-table
					v-if="((paging.table || {}).fieldList || []).length"
					ref="dt_table"
					:key="changeCount"
					:data="paging.dataList"
					max-height="300"
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
						type="selection"
						fixed
						width="55"
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
											:width="o.width"
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
										:width="subItem.width"
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
								:width="item.width"
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
					layout="total, sizes, prev, pager, next"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					@prev-click="handlePrevPage"
					@next-click="handleNextPage">
					<!--<span class="richway-right">共{{ paging.pages }}页 当前第{{ paging.page }}页</span>-->
				</el-pagination>
			</div>
		</div>
		<div class="richway-data-footer">
			<el-button
				round
				@click="handleClose">关闭</el-button>
			<el-button
				type="primary"
				round
				@click="handleChoose">保存</el-button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import DataTablePaging from './dataTablePaging.js';
import ColumnItem from './columnItem.vue';

export default {
    name: `dataTableChoice`,
    components: {
        ColumnItem
    },
    props: {
        config: {
            type: Object,
            default: () => {
            }
        },
        detailInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            index: 0,
            paging: {},
            changeCount: 0
        };
    },
    watch: {
        detailInfo: {
            handler() {
                this.pagingQuery();
            },
            deep: true,
            immediate: false
        }
    },
    beforeMount() {
        this.initGetDataFun();
        this.paging = new DataTablePaging(this.config);
        this._log(`dataTable: beforeMount`);
    },
    mounted() {
        this._log(`dataTable has mounted`, this.paging);
        this.pagingQuery();
    },
    methods: {
        handleClose() {
            this.$emit(`on-close`);
        },
        handleChoose() {
            this.$emit(`on-choose`, this.paging.selectedList);
        },
        initGetDataFun() {
            if (typeof (this.config.getDataFun) === `string`) {
                if (!this.$getData[this.config.getDataFun]) {
                    this._log(`this.config.getDataFun is null`);
                }
                this.config.getDataFun = this.$getData[this.config.getDataFun];
            }
        },
        pagingQuery() {
            this.paging.queryFun().then(() => {
                this.changeCount++;
                this.$emit(`on-query`, {
                    dataList: this.paging.dataList,
                    queryInfo: this.paging.queryInfo
                });

                if (typeof ((this.$getData || {})[this.config.getDataFunHasChoose]) === `function`) {
                    this.$getData[this.config.getDataFunHasChoose](this.detailInfo).then(res => {
                        for (const item of res.data) {
                            for (const subItem of this.paging.dataList) {
                                if (item.deptCd === subItem.deptCd) {
                                    this.$refs.dt_table.toggleRowSelection(subItem, true);
                                }
                            }
                        }
                    });
                }
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
        handleSelectChange(selection) {
            this._log(`table checkbox has click`, selection);
            this.paging.selectedList = selection;
        },
        // 点击一行，复选框选中
        handleRowClick(row) {
            this.$refs.dt_table.toggleRowSelection(row);
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

    .data-table-choice{
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

            .el-form {
                padding: 0 .9rem;
            }

            .el-row {
                position: relative;
                padding: .5rem 0;

                /*&::before {*/
                /*position: absolute;*/
                /*bottom: 0;*/
                /*left: 10px;*/
                /*right: 10px;*/
                /*display: inline-block;*/
                /*!*border-bottom: 1px dashed #999;*!*/
                /*}*/

                /*&:last-child::before {*/
                /*display: none;*/
                /*}*/

                .el-form-item {
                    margin-bottom: 0;
                }

                .el-range-editor {
                    width: 17rem !important;
                    input {
                        width: 7rem !important;;
                    }
                }
            }
        }

        .richway-data-list{
            padding-top: .9rem;
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

        .richway-data-footer{
            text-align: right;
        }
    }

</style>
