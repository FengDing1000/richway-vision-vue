<template>
	<div class="richway-data-table">
		<div class="richway-data-query">
			<div
				v-show="queryShow"
				class="query-detail">
				<slot name="query" />
			</div>
			<div
				v-show="!queryShow"
				class="query-simple">
				<span>查询筛选:</span>
				<div class="info">
					<span>关键字：石棉县</span>
					<span>用户名：admin</span>
					<span>手机号：15888888888</span>
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
					<slot name="btn" />
				</div>
			</div>
			<div
				v-loading="_paging.loading"
				class="richway-data-list">
				<slot name="list" />
			</div>
			<div class="richway-data-paging">
				<el-pagination
					:current-page="_paging.page"
					:page-sizes="_paging.rowsList"
					:page-size="_paging.rows"
					:total="_paging.total"
					:disabled="_paging.loading"
					background
					layout="total, sizes, prev, pager, next, jumper, slot"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					@prev-click="handlePrevPage"
					@next-click="handleNextPage">
					<span class="richway-right">共{{ _paging.pages }}页 当前第{{ _paging.page }}页</span>
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const { mapState } = require(`vuex`);
const { eventHandler, throttleDuration } = RichWayWebUtils;

export default {
    name: `dataTable`,
    props: {
        paging: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            queryShow: true,
            tableMaxH: 500,
            changeCount: 0
        };
    },
    computed: {
        ...mapState([`settingInfo`]),
        queryTitle() {
            return this.queryShow ? `收起` : `展开`;
        },
        _paging: {
            get() {
                return {
                    loading: this.paging.loading || false,
                    pages: this.paging.pages || 0,
                    total: this.paging.total || 0,
                    page: this.paging.page || 1,
                    rows: this.paging.rows || 10,
                    rowsList: this.paging.rowsList || []
                };
            },
            set(o = {}) {
                if (o.page) {
                    this.paging.page = o.page;
                }
                if (o.rows) {
                    this.paging.rows = o.rows;
                }
            }
        }
    },
    watch: {
        settingInfo: {
            handler(val, oldVal) {
                this.tableResize();
                this._log(val, oldVal);
            },
            deep: true// 对象内部的属性监听，也叫深度监听
        }
    },
    mounted() {
        this._log(`dataTable has mounted`);
        this._paging = this.paging;

        this.tableResize();
        eventHandler.addHandler(window, `resize`, throttleDuration(this.tableResize, 400, 400));
    },
    destroyed() {
        eventHandler.removeHandler(window, `resize`, this.tableResize);
    },
    methods: {
        handleQueryToggle() {
            this.queryShow = !this.queryShow;
        },
        // 改变每页显示的条数
        handleSizeChange(val) {
            const index = (this._paging.page - 1) * this._paging.rows;
            this._paging = { rows: val };
            this._paging.page = Math.ceil(index / this._paging.rows);
            console.log(`每页 ${val} 条`);

            this.$emit(`on-query`, this._paging);
        },
        // 改变当前页到某一页
        handleCurrentChange(val) {
            this._paging = { page: val };
            console.log(`当前页: ${val}`);

            this.$emit(`on-query`, this._paging);
        },
        // 上一页
        handlePrevPage() {
            if (this._paging.page > 1) {
                this._paging.page--;
                console.log(`上一页`);

                this.$emit(`on-query`, this._paging);
            }
        },
        // 下一页
        handleNextPage() {
            if (this._paging.pages > this._paging.page) {
                this._paging.page++;
                console.log(`下一页`);

                this.$emit(`on-query`, this._paging);
            }
        },
        // 表格大小发生了变化
        tableResize() {
            const clientH = document.body.clientHeight;
            const header = document.getElementsByClassName(`richway-header`)[0];
            const headerH = header.clientHeight;
            const breadCrumbH = document.getElementsByClassName(`richway-bread-crumb`)[0].clientHeight;
            const dataTable = document.getElementsByClassName(`richway-data-table`)[0];
            const dataQuery = dataTable.getElementsByClassName(`richway-data-query`)[0];
            const dataQueryH = dataQuery.clientHeight;
            const dataPaging = dataTable.getElementsByClassName(`richway-data-paging`)[0];
            const dataPagingH = dataPaging.clientHeight;

            this.tableMaxH = clientH - breadCrumbH - dataQueryH - dataPagingH - 120;
            if (this.settingInfo.headerPosition === `top`) {
                this.tableMaxH = this.tableMaxH - headerH;
            }

            this._log(clientH, headerH, breadCrumbH, dataQueryH, dataPagingH, this.tableMaxH);

            this.$emit(`on-resize`, {
                height: this.tableMaxH
            });
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
			}
		}

		.richway-data-header {
			.title {
				display: inline-block;
				height: 1.8rem;
				line-height: 1.8rem;
			}
		}

</style>
