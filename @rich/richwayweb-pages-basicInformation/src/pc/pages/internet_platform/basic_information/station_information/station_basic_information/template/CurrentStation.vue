<template>
	<div>
		<DataTableStandard
			ref="dataList"
			:config="userListDataTable" />
		<el-dialog
			:visible.sync="centerDialogVisible"
			:modal-append-to-body="false"
			:title="title"
			width="40rem"
			class="rain_monitor-table-add-dialog"
			@closed="closed">
			<AddInput
				ref="AddInput"
				:menuData="menuData"
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
			:visible.sync="detail"
			:modal-append-to-body="false"
			title="测站基本信息"
			width="40rem"
			class="rain_monitor-table-add-dialog">
			<div class="el-dialog-content">
				<el-row
					v-for="(item,index) in detailData"
					:key="index"
					:style="{ backgroundColor:index%2==0?'#eeeeee':'white'}"
					type="flex"
					justify="space-between">
					<el-col :span="5">
						<div
							style="text-align: end;font-weight: bold;
">{{ item.label }}:
						</div>
					</el-col>
					<el-col :span="18">
						<div>{{ item.value }}</div>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import RichWayWebComponents from '@rich/richwayweb-components';

const AddInput = r => require.ensure([], () => r(require(`./AddInput`)), `components/pagesBasicInformation/stationBasicInformation`);
const { DataTableStandard } = RichWayWebComponents;

export default {
    name: `current-station`,
    components: {
        DataTableStandard,
        AddInput
    },
    data() {
        return {
            title: ``,
            detail: false,
            detailData: [],
            centerDialogVisible: false,
            menuData: [],
            userListDataTable: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `keywords`,
                                label: `关键字`,
                                value: ``,
                                type: `input`,
                                placeholder: `小流域/面积/河流/长度/位置/比降`
                            },
                            {
                                key: `sttp`,
                                label: `站类`,
                                value: ``,
                                type: `select`,
                                options: [{
                                    label: `雨量站`,
                                    value: `PP`
                                }, {
                                    label: `河道水位站`,
                                    value: `ZZ`
                                }, {
                                    label: `水库水位站`,
                                    value: `RR`
                                }, {
                                    label: `河道水位雨量站`,
                                    value: `ZQ`
                                }, {
                                    label: `水库水位雨量站`,
                                    value: `RQ`
                                }]
                            },
                            {
                                key: `addvcds`,
                                label: `政区列表`,
                                value: ``,
                                type: `select`,
                                options: []
                            }
                        ]
                    ]
                },
                table: {
                    btnList: [
                        {
                            label: `添加`,
                            type: `add`,
                            icon: `icon-add`,
                            btnType: `primary`,
                            handleClick: this.handleAdd
                        },
                        {
                            label: `编辑`,
                            type: `edit`,
                            icon: `icon-edit`,
                            btnType: `success`,
                            handleClick: this.handleEdit
                        },
                        {
                            label: `关联`,
                            type: `edit`,
                            icon: `icon-share`,
                            btnType: `success`,
                            handleClick: this.handleCorrelation
                        },
                        {
                            label: `删除`,
                            type: `delete`,
                            icon: `icon-close`,
                            btnType: `danger`,
                            handleClick: this.handleDelete
                        }
                    ],
                    fieldList: [
                        {
                            key: `stcd`,
                            label: `测站编码`
                        },
                        {
                            key: `stnm`,
                            label: `测站名称`
                        },
                        {
                            key: `rvnm`,
                            label: `河流名称`
                        },
                        {
                            key: `hnnm`,
                            label: `水系名称`
                        },
                        {
                            key: `bsnm`,
                            label: `流域名称`
                        },
                        {
                            key: `adnm`,
                            label: `所在乡镇`
                        },
                        {
                            key: `sttp`,
                            label: `站类`,
                            render: {
                                type: `html`,
                                data: row => {
                                    switch (row.sttp) {
                                    case `PP`:
                                        return `雨量站`;
                                    case `ZZ`:
                                        return `河道水位站`;
                                    case `RR`:
                                        return `水库水位站`;
                                    case `ZQ`:
                                        return `河道水位雨量站`;
                                    case `RQ`:
                                        return `水库水位雨量站`;
                                    default:
                                        return `--`;
                                    }
                                }
                            }
                        },
                        {
                            key: `admauth`,
                            label: `信息管理单位`
                        },
                        {
                            key: `locality`,
                            label: `交换管理单位`
                        },
                        {
                            key: `contact`,
                            label: `联系人`
                        },
                        {
                            key: `locality`,
                            label: `电话`
                        },
                        {
                            key: `lgtd`,
                            label: `经度`
                        },
                        {
                            key: `lttd`,
                            label: `纬度`
                        },
                        {
                            label: `操作`,
                            width: 180,
                            fixed: `right`,
                            render: {
                                type: `btn`,
                                list: [{
                                    label: `详情`,
                                    btnType: `primary`,
                                    handleClick: this.handleChart
                                },
                                {
                                    label: `修改`,
                                    btnType: `success`,
                                    handleClick: this.handleEdit
                                }]
                            }
                        }
                    ]
                },
                getDataFun: `GetStationBasic`
            }
        };
    },
    computed: {},
    mounted() {
        this.$getData.GetAdcdCity({ adcd: ``, flag: true }).then(res => {
            const arr = [];
            res.data.forEach(item => {
                arr.push({
                    label: item.adnm,
                    value: item.adcd
                });
            });
            this.$set(this.userListDataTable.query.fieldList[0], 2, {
                key: `addvcds`,
                label: `政区列表`,
                value: ``,
                type: `select`,
                options: arr
            });
        });
    },
    methods: {
        handleCorrelation(row) {
            const params = row.map(item => ({
                addvcd: item.addvcd,
                adnm: item.adnm,
                lgtd: item.lgtd,
                lttd: item.lttd,
                stcd: item.stcd,
                stnm: item.stnm
            }));
                // 当参数为数组的时候，应该添加list
            this.$getData.CorrelationStation({ list: params }).then(res => {
                this.$message({
                    message: res.message,
                    type: `success`
                });
            }).catch(() => {
                this.$message.error(`请求出错了`);
            });
        },
        handleAdd() {
            // window.location.href = `http://testsh.rtongcloud.com:6688/shzh/shzh/stInfo/expTpl`;
            this.title = `添加信息`;
            this.menuData = [
                { key: `stcd`, label: `测站编码`, important: true },
                { key: `stnm`, label: `测站名称`, important: true },
                { key: `rvnm`, label: `河流名称` },
                { key: `hnnm`, label: `水系名称` },
                { key: `bsnm`, label: `流域名称` },
                { key: `lgtd`, label: `经度` },
                { key: `lttd`, label: `纬度` },
                { key: `stlc`, label: `站址` },
                {
                    key: `sttp`,
                    label: `站类`,
                    options: [{
                        label: `雨量站`,
                        value: `PP`
                    }, {
                        label: `河道水位站`,
                        value: `ZZ`
                    }, {
                        label: `水库水位站`,
                        value: `RR`
                    }, {
                        label: `河道水位雨量站`,
                        value: `ZQ`
                    }, {
                        label: `水库水位雨量站`,
                        value: `RQ`
                    }]
                },
                {
                    key: `stcdtype`,
                    label: `来源`,
                    options: [{
                        label: `水文站`,
                        value: `1`
                    }, {
                        label: `山洪站`,
                        value: `2`
                    }, {
                        label: `气象站`,
                        value: `3`
                    }]
                },
                { key: `admauth`, label: `信息管理单位` },
                { key: `locality`, label: `交换管理单位` },
                { key: `contact`, label: `联系人` },
                { key: `telephone`, label: `电话` }
            ];
            this.centerDialogVisible = true;
        },
        handleEdit(row, obj) {
            if (row instanceof Array && row.length > 1) {
                this.$message({
                    message: `只能选择一个修改条目`,
                    type: `warning`
                });
            } else {
                this.title = `编辑信息`;
                let data;
                if (row instanceof Array) {
                    [data] = row;
                } else {
                    data = obj;
                }
                this.menuData = [
                    { key: `stcd`, label: `测站编码`, show: `no`, value: data.stcd },
                    { key: `stnm`, label: `测站名称`, important: true, value: data.stnm },
                    { key: `rvnm`, label: `河流名称`, value: data.rvnm },
                    { key: `hnnm`, label: `水系名称`, value: data.hnnm },
                    { key: `bsnm`, label: `流域名称`, value: data.bsnm },
                    { key: `lgtd`, label: `经度`, value: data.lgtd },
                    { key: `lttd`, label: `纬度`, value: data.lttd },
                    { key: `stlc`, label: `站址`, value: data.stlc },
                    {
                        key: `sttp`,
                        label: `站类`,
                        options: [{
                            label: `雨量站`,
                            value: `PP`
                        }, {
                            label: `河道水位站`,
                            value: `ZZ`
                        }, {
                            label: `水库水位站`,
                            value: `RR`
                        }, {
                            label: `河道水位雨量站`,
                            value: `ZQ`
                        }, {
                            label: `水库水位雨量站`,
                            value: `RQ`
                        }],
                        value: data.sttp
                    },
                    {
                        key: `stcdtype`,
                        label: `来源`,
                        options: [{
                            label: `水文站`,
                            value: `1`
                        }, {
                            label: `山洪站`,
                            value: `2`
                        }, {
                            label: `气象站`,
                            value: `3`
                        }],
                        value: data.stcdtype
                    },
                    { key: `admauth`, label: `信息管理单位`, value: data.admauth },
                    { key: `locality`, label: `交换管理单位`, value: data.locality },
                    { key: `contact`, label: `联系人`, value: data.contact },
                    { key: `telephone`, label: `电话`, value: data.telephone },
                    { key: `addvcd`, label: ``, show: `no`, value: data.addvcd }
                ];
                this.centerDialogVisible = true;
            }
        },
        handleChart(row, data) {
            console.log(row);
            const arr = [{ label: `测站编码`, value: data.stcd },
                { label: `测站名称`, value: data.stnm },
                { label: `行政区划名称`, value: data.adnm },
                { label: `行政区划码`, value: data.addvcd },
                { label: `河流名称`, value: data.rvnm },
                { label: `水系名称`, value: data.hnnm },
                { label: `流域名称`, value: data.bsnm },
                { label: `经度`, value: data.lgtd },
                { label: `纬度`, value: data.lttd },
                { label: `站址`, value: data.stlc }];
            this.detailData = arr;
            this.detail = true;
        },
        upAdd() {
            const bool = this.$refs.AddInput.checkValidate();
            debugger;
            if (!bool) {
                return;
            }
            if (this.title === `添加信息`) {
                const obj = this.$refs.AddInput.objComputed;
                obj.addvcd = window._RichWay.$map.currentRegionInfo.code.substr(0, 6);
                this.$getData.UpAdd(obj).then(res => {
                    this.$message({
                        message: res.message,
                        type: `success`
                    });
                    this.centerDialogVisible = false;
                    this.$refs.dataList.pagingQuery();
                }).catch(error => {
                    this.$message.error(error.message);
                });
            } else {
                this.$getData.ReviseMessage(this.$refs.AddInput.objComputed).then(res => {
                    this.$message({
                        message: res.message,
                        type: `success`
                    });
                    this.centerDialogVisible = false;
                    this.$refs.dataList.pagingQuery();
                }).catch(error => {
                    this.$message.error(error.message);
                });
            }
        },
        handleDelete(row) {
            this.$confirm(`此操作将永久删除该文件, 是否继续?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const arr = row.map(item => (item.stcd));
                this.$getData.DeleteMessage({ deleteNum: arr.join() }).then(res => {
                    this.$message({
                        type: `success`,
                        message: res.message
                    });
                    this.$refs.dataList.pagingQuery();
                }).catch(error => {
                    this.$message({
                        type: `success`,
                        message: error.message
                    });
                });
            });
        },
        closed() {
            this.$refs.AddInput.resetDom();
        }
    }
};
</script>

<style lang="scss" scoped>
    .el-dialog-content {
        height: 500px;
        overflow-y: scroll;

        .el-row {
            .el-col {
                div {
                    line-height: 50px;
                }
            }
        }
    }
</style>
