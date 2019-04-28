<template>
    <div>
        <DataTableStandard
            ref="dataList"
            :manualQuery="true"
            :config="listDataTable"
            @on-query="handleQuery"/>
        <el-dialog
            :visible.sync="centerDialogVisible"
            :modal-append-to-body="false"
            :show-close="false"
            top="50px"
            width="1600px"
            style="color: #f7f7f7;"
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
                <el-button @click="openChildDialog">编辑时段</el-button>
            </div>
            <AddPage
                v-if="showContent"
                ref="AddPage"
                :timeRanger="timeRanger"
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
            width="1100px"
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
        <el-dialog
            :visible.sync="dialogTimeRangerVisible"
            :modal-append-to-body="false"
            title="自定义时段"
            width="40%"
            @open="TimeRangerContent=true"
            @closed="TimeRangerContent=false"
        >
            <TimeRanger
                v-if="TimeRangerContent"
                ref="TimeRanger"
                :selected="selected"
            />
            <span
                slot="footer"
                class="dialog-footer">
				<el-button @click="dialogTimeRangerVisible = false">取 消</el-button>
				<el-button
                    type="primary"
                    @click="customSure">确 定</el-button>
			</span>
        </el-dialog>
    </div>
</template>
<script>
    import RichWayWebComponents from '@rich/richwayweb-components';

    const AddPage = r => require.ensure([], () => r(require(`./AddPage`)), `components/pagesWaterRain/thresholdSetting`);
    const EditTable = r => require.ensure([], () => r(require(`./EditTable`)), `components/pagesWaterRain/thresholdSetting`);
    const TimeRanger = r => require.ensure([], () => r(require(`./TimeRanger`)), `components/pagesWaterRain/thresholdSetting`);
    const {DataTableStandard} = RichWayWebComponents;

    export default {
        name: `TableRain`,
        components: {
            DataTableStandard,
            AddPage,
            EditTable,
            TimeRanger
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
                dialogTimeRangerVisible: false,
                centerDialogVisible: false,
                EditDialogVisible: false,
                TimeRangerContent: true,
                EditContent: true,
                EditRow: {},
                title: [],
                timeRanger: [],
                selected: [],
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
                            }
                        ]
                    },
                    getDataFun: `StationsThreshold`
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
                    this.$getData.DeleteRainStation({list: arr, type: `R`}).then(() => {
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
                        type: `R`
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
            },
            handleQuery({dataList}) {
                const [row] = dataList;
                const timeArr = [];
                for (const key in row) {
                    if (Object.prototype.hasOwnProperty.call(row, key)) {
                        if (key.indexOf(`stthreshold_`) === 0) {
                            let label;
                            const num = parseInt(key.slice(12), 10);
                            if (num >= 60) {
                                label = `${num / 60}小时`;
                            } else {
                                label = `${num}分钟`;
                            }
                            timeArr.push({
                                key,
                                label
                            });
                        }
                    }
                }
                timeArr.sort((obj1, obj2) => {
                    const num1 = parseInt(obj1.key.slice(12), 10);
                    const num2 = parseInt(obj2.key.slice(12), 10);
                    return num1 - num2;
                });
                this.timeRanger = timeArr;
                // 插入字段名
                const arr = [{
                    key: `stnm`,
                    label: `测站名称`
                },
                    {
                        key: `warnGradeNm`,
                        label: `预警等级`
                    }];
                timeArr.forEach(item => {
                    arr.push({
                        key: item.key,
                        label: item.label,
                        render: {
                            type: `html`,
                            data: row => {
                                if (row[item.key] === null || row[item.key] === undefined || row[item.key] === ``) {
                                    return ``;
                                }
                                return Number(row[item.key]).toFixed(1);
                            }
                        }
                    });
                });

                arr.push({
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
                });
                this.$set(this.listDataTable.table, `fieldList`, arr);
            },
            openChildDialog() {
                const arr = this.$refs.AddPage.callback().map(item => parseInt(item.stdt, 10));
                this.selected = arr;
                this.dialogTimeRangerVisible = true;
            },
            // 点击字dialog的确定按钮
            customSure() {
                const arr = this.$refs.TimeRanger.callback();
                this.timeRanger = arr;
                this.$refs.AddPage.initParams();
                this.dialogTimeRangerVisible = false;
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
