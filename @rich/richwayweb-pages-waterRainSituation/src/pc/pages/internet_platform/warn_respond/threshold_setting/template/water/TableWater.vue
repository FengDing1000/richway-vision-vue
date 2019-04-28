<template>
    <div>
        <DataTableStandard
            ref="dataList"
            :manualQuery="true"
            :config="listDataTable"/>
        <el-dialog
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
            width="1200"
            @open="opened"
            @closed="closed"
        >
            <div
                slot="title"
                class="dialog-title">
				<span v-if="title.length>0">
					<span class="select_span_items_title">
						当前测站:
					</span>
					<span
                        v-for="(item,index) in title"
                        :key="index"
                        class="select_span_items"
                    >{{ item.stnm }}</span>
				</span>
                <span v-else>
					<span class="select_span_items_title">
						当前测站:
					</span>
					<span>
						请点击列表选择
					</span>
				</span>
            </div>
            <AddPage
                v-if="showContent"
                ref="AddPage"
                :areaid="adcd[1]?adcd[1].id:''"
                @headCallBack="setTitle"
            />
            <span
                slot="footer"
                class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button
                    type="primary"
                    @click="upAdd">确 定</el-button>
			</span>
        </el-dialog>
        <el-dialog
            :visible.sync="EditDialogVisible"
            :modal-append-to-body="false"
            title="编辑信息"
            width="500"
            @open="EditContent=true"
            @closed="EditContent=false"
        >
            <EditTable
                v-if="EditContent"
                ref="EditTable"
                :EditRow="EditRow"
            />
            <span
                slot="footer"
                class="dialog-footer">
				<el-button
                    @click="EditDialogVisible = false"
                >取 消</el-button>
				<el-button
                    type="primary"
                    @click="EditFuc"
                >确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>
<script>
    import RichWayWebComponents from '@rich/richwayweb-components';

    const AddPage = r => require.ensure([], () => r(require(`../water/AddPage`)), `components/pagesWaterRain/thresholdSetting`);
    const EditTable = r => require.ensure([], () => r(require(`../water/EditTable`)), `components/pagesWaterRain/thresholdSetting`);
    const {DataTableStandard} = RichWayWebComponents;

    export default {
        name: `TableRain`,
        components: {
            DataTableStandard,
            AddPage,
            EditTable
        },
        props: {
            params: {
                type: String,
                default: null
            },
            adcd: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                initParams: {},
                showContent: true,
                centerDialogVisible: false,
                EditDialogVisible: false,
                EditContent: true,
                EditRow: {},
                title: [],
                listDataTable: {
                    noQuery: true,
                    table: {
                        btnList: [
                            {
                                label: `添加`,
                                icon: `el-icon-edit`,
                                btnType: `primary`,
                                handleClick: this.handleAdd
                            },
                            {
                                label: `删除`,
                                icon: `el-icon-delete`,
                                btnType: `danger`,
                                handleClick: this.handleDelete
                            }
                        ],
                        fieldList: [
                            {
                                key: `stnm`,
                                label: `测站名称`
                            },
                            {
                                key: `warnGradeNm`,
                                label: `预警等级`
                            },
                            {
                                key: `Z`,
                                label: `水位(m)`,
                                render: {
                                    type: `html`,
                                    data: row => {
                                        if (row.Z === null || row.Z === undefined || row.Z === ``) {
                                            return ``;
                                        }
                                        return Number(row.Z).toFixed(2);
                                    }
                                }

                            },
                            {
                                key: `Q`,
                                label: `流量(m³/s)`,
                                render: {
                                    type: `html`,
                                    data: row => {
                                        if (row.Q === null || row.Q === undefined || row.Q === ``) {
                                            return ``;
                                        }
                                        return Number(row.Q).toFixed(3);
                                    }
                                }
                            },
                            {
                                label: `操作`,
                                width: `165`,
                                fixed: `right`,
                                render: {
                                    type: `btn`,
                                    list: [
                                        {
                                            label: `编辑`,
                                            btnType: `primary`,
                                            icon: `icon-bar`,
                                            handleClick: this.handleEditRow
                                        },
                                        {
                                            label: `删除`,
                                            btnType: `warning`,
                                            icon: `icon-bar`,
                                            handleClick: this.handleDeleteRow
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    getDataFun: `WaterThreshold`
                }
            };
        },
        mounted() {

        },
        methods: {
            opened() {
                this.showContent = true;
            },
            closed() {
                this.showContent = false;
                this.title = [];
            },
            query(params) {
                this.initParams = params;
                this.$refs.dataList.pagingQuery(params);
            },
            handleAdd() {
                if (this.adcd.length === 0) {
                    this.$message({
                        message: `请选择政区`,
                        type: `warning`
                    });
                    return;
                }
                this.centerDialogVisible = true;
            },
            handleDelete(row) {
                if (this.adcd.length === 0) {
                    this.$message({
                        message: `请选择政区`,
                        type: `warning`
                    });
                    return;
                }
                if (row.length === 0) {
                    this.$message({
                        message: `至少选中一项条目`,
                        type: `warning`
                    });
                    return;
                }
                this.$confirm(`此操作将删除该条目, 是否继续?`, `提示`, {
                    confirmButtonText: `确定`,
                    cancelButtonText: `取消`,
                    type: `warning`
                }).then(() => {
                    const arr = row.map(item => ({
                        areaid: item.areaId,
                        stcd: item.stcd,
                        warnGradeId: item.warnGrade
                    }));
                    this.$getData.DeleteRainStation({list: arr, type: `Z,Q`}).then(() => {
                        // this.$message({
                        //     type: `success`,
                        //     message: `删除成功!`
                        // });
                        this.$refs.dataList.pagingQuery(this.initParams);
                    });
                });
            },
            upAdd() {
                this.$refs.AddPage.upLoad().then(() => {
                    this.$notify({
                        title: `恭喜`,
                        message: `修改成功`,
                        type: `success`
                    });
                    this.centerDialogVisible = false;
                    this.$refs.dataList.pagingQuery(this.initParams);
                }).catch(error => {
                    console.log(error);
                    this.$notify({
                        title: `警告`,
                        message: `修改出错`,
                        type: `warning`
                    });
                });
            },
            setTitle(name) {
                this.title = name;
            },
            handleEditRow(index, row) {
                this.EditRow = row;
                console.log(this.EditRow);
                this.EditDialogVisible = true;
            },
            handleDeleteRow(index, row) {
                this.$confirm(`此操作将删除该条目, 是否继续?`, `提示`, {
                    confirmButtonText: `确定`,
                    cancelButtonText: `取消`,
                    type: `warning`
                }).then(() => {
                    this.$getData.DeleteOneRain({
                        dandid: row.areaId,
                        stcd: row.stcd,
                        warnGradeId: row.warnGrade,
                        type: `Z,Q`
                    }).then(() => {
                        // this.$message({
                        //     type: `success`,
                        //     message: `删除成功!`
                        // });
                        this.$refs.dataList.pagingQuery(this.initParams);
                    });
                });
            },
            EditFuc() {
                this.$refs.EditTable.upLoad().then(() => {
                    this.$notify({
                        title: `恭喜`,
                        message: `修改成功`,
                        type: `success`
                    });
                    this.EditDialogVisible = false;
                    this.$refs.dataList.pagingQuery(this.initParams);
                }).catch(error => {
                    console.log(error);
                    this.$notify({
                        title: `警告`,
                        message: `修改出错`,
                        type: `warning`
                    });
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .dialog-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
            display: flex;
            flex-wrap: wrap;

            .select_span_items_title {
                padding: 5px 0;
                margin: 5px 10px;
                color: black;
            }

            .select_span_items {
                padding: 5px;
                margin: 5px;
                border-radius: 5px;
                color: #fff;
                background-color: #e8bb74;
            }

            span {
                padding: 5px 0;
                margin: 5px 0;
                color: #e8bb74;
            }
        }
    }
</style>
