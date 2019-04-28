<template>
	<div>
		<DataTableStandard
			ref="dataList"
			:config="userListDataTable" />
		<el-dialog
			:visible.sync="centerDialogVisible"
			:modal-append-to-body="false"
			title="编辑信息"
			width="40rem"
			class="rain_monitor-table-add-dialog">
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
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogUploadVisible"
			width="20rem"
			title="导入表格">
			<UpLoad
				url="/shzh/stInfo/impnei"
				@on-load-success="handleImportSuccess" />
		</el-dialog>
	</div>
</template>

<script>
import RichWayWebComponents from '@rich/richwayweb-components';
import RichwayWebUtils from '@rich/richwayweb-utils';

const AddInput = r => require.ensure([], () => r(require(`./AddInput`)), `components/pagesBasicInformation/stationBasicInformation`);
const { DataTableStandard, UpLoad } = RichWayWebComponents;
const { downloadFile } = RichwayWebUtils;

export default {
    name: `role-manage`,
    components: {
        DataTableStandard,
        AddInput,
        UpLoad
    },
    data() {
        return {
            title: ``,
            detail: false,
            dialogUploadVisible: false,
            detailData: [],
            centerDialogVisible: false,
            menuData: [],
            userListDataTable: {
                noQuery: true,
                table: {
                    btnList: [
                        {
                            label: `下载模板`,
                            icon: `icon-add`,
                            btnType: `primary`,
                            handleClick: this.handleDownload
                        },
                        {
                            label: `导入表格`,
                            icon: `icon-edit`,
                            btnType: `success`,
                            handleClick: this.handleUpload
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
                getDataFun: `GetNearbyStation`
            }
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        handleDownload() {
            // window.location.href = `http://testsh.rtongcloud.com:6688/shzh/shzh/stInfo/expTpl`;
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/shzh/stInfo/expTpl`);
        },
        handleUpload() {
            this.dialogUploadVisible = true;
        },
        // 导入成功，重新查询
        handleImportSuccess() {
            this.dialogUploadVisible = false;
            this.$refs.dataList.pagingQuery();
        },
        handleEdit(row, obj) {
            const data = obj;
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
        },
        handleChart(row, data) {
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
