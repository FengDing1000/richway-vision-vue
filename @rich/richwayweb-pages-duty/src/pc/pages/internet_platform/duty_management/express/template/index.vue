<template>
	<div class="content content-express">
		<DataTableStandard
			v-if="isShow"
			ref="user_dt"
			:config="dutyFastReportList" />
		<IndexAdd
			v-if="!isShow"
			:currentInfo="currentInfo"
			@on-failed="handleAddCancel"
			@on-success="handleAddSuccess"
			@on-load-success="handleLoadSuccessContent" />
		<el-dialog
			:close-on-click-modal="!1"
			:close-on-press-escape="!1"
			:modal-append-to-body="!1"
			:visible.sync="dialogDetails"
			style="text-align:left"
			width="40%"
			title="值班快报详情">
			<div v-html="reportInfo" />
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';
import RichWayWebComponents from '@rich/richwayweb-components';

const IndexAdd = r => require.ensure([], () => r(require(`./indexAdd`)), `components/pagesDuty/dutyExpress`);
const moment = require(`moment`);

// 更改之后的IndexAdd
const _log = RichWayWebUtils.console.log;

const { UpLoad } = RichWayWebComponents;
const { DataTableStandard } = RichWayWebComponents;
const { downloadFile } = RichWayWebUtils;

export default {
    components: {
        UpLoad,
        DataTableStandard,
        IndexAdd
    },
    data() {
        return {
            isShow: true,
            dutyFastReportList: {
                query: {
                    fieldList: [
                        [
                            {
                                key: `adcd`,
                                label: `行政划区`,
                                value: ``,
                                type: `select`,
                                options: []
                            },
                            {
                                key: `dateRange`,
                                label: `时间范围`,
                                value: [
                                    moment().date(1).format(`YYYY-MM-DD HH:MM`),
                                    moment().format(`YYYY-MM-DD HH:MM`)
                                ],
                                type: `date`,
                                pickerType: `datetimerange`,
                                format: `yyyy-MM-dd HH:mm`,
                                valueFormat: `yyyy-MM-dd HH:mm`,
                                fieldKeys: [`stm`, `etm`]
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
                        }
                    ],
                    fieldList: [
                        {
                            key: `dutyLeader`,
                            label: `带班领导`
                        },
                        {
                            key: `dutyPerson`,
                            label: `值班人员`
                        },
                        {
                            key: `reportNm`,
                            label: `报表名称`
                        },
                        {
                            label: `操作`,
                            fixed: `right`,
                            width: 380,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `下载`,
                                        icon: `el-icon-download`,
                                        btnType: `info`,
                                        handleClick: this.handleDownload
                                    },
                                    {
                                        label: `详情`,
                                        icon: `icon-about`,
                                        btnType: `primary`,
                                        handleClick: this.handleDetails
                                    },
                                    {
                                        label: `编辑`,
                                        icon: `icon-edit`,
                                        btnType: `success`,
                                        handleClick: this.handleEdit
                                    },
                                    {
                                        label: `删除`,
                                        icon: `icon-close`,
                                        btnType: `warning`,
                                        handleClick: this.handleDelete
                                    }
                                ]
                            }
                        }

                    ]
                },
                getDataFun: `GetFastReport`
            },
            dialogUploadVisible: false,
            dialogFormVisibleAdd: false,
            dialogDetails: false,
            currentInfo: {},
            reportInfo: ``,
            currentDate: moment().format(`YYYY-MM-DD`)
        };
    },
    computed: {},
    mounted() {
        _log(`express has mounted`);
        this.GetAdcdCity();
    },
    methods: {
        // 上传成功回调方法
        handleLoadSuccessContent(info) {
            this._log(info);
        },
        // 点击添加
        handleAdd() {
            this.currentInfo = {
                reportNm: `防汛值班快报`,
                company: `省防汛抗旱指挥部办公室`,
                phase: ``,
                otherInfo: `无`,
                reportTime: moment().format(`YYYY-MM-DD`),
                dutyLeader: `李志伟`,
                dutyPerson: `胡思艳 方小军`
            };

            // this.dialogFormVisibleAdd = true;
            this.isShow = false;
            console.log(252525363636, this.currentDate);
        },
        // 点击下载
        handleDownload(index, row) {
            // console.log(row, index);
            // console.log(5555232626, downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/zhyj/busi/download`));
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/zhyj/busi/download&fastReportId=${row.fastReportId || ``}`);
        },
        // 点击详情
        handleDetails(index, row) {
            this.dialogDetails = true;
            this.reportInfo = row.reportInfo;
            console.log(252525363614, row.reportInfo);
        },
        // 点击编辑
        handleEdit(index, row) {
            this.currentInfo = row;
            this.isShow = false;
        },
        // 确定之后的回调方法
        handleAddSuccess() {
            this.isShow = true;
            this.$refs.user_dt.paging.queryFun();
        },
        // 取消添加之后的回调方法
        handleAddCancel() {
            this.isShow = true;
        },
        // 请求省份
        GetAdcdCity() {
            const info = {
                adcd: window._RichWay.$map.currentRegionInfo.code.substr(0, 6),
                flag: `parent`,
                isadnmall: `false`
            };
            this.$getData.GetAdcdCity(info).then(res => {
                this.adcdCity = res.data;
                const adcdCityFmt = [];
                for (const item of (this.adcdCity || [])) {
                    adcdCityFmt.push({ label: item.adnm, value: item.adcd });
                }
                adcdCityFmt.unshift({ label: `全部`, value: `` });
                this.$set(this.dutyFastReportList.query.fieldList[0], 0, {
                    key: `adcd`,
                    label: `政区`,
                    value: ``,
                    type: `select`,
                    options: adcdCityFmt
                });
            }).catch(err => {
                this.$emit(`on-failed`, err);
            });
        },
        // 点击删除
        handleDelete(index, row) {
            this.$confirm(`确定删除此报文吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                const info = {
                    fastReportId: row.fastReportId
                };
                this.$getData.ReportDelete(info).then(() => {
                    this.$refs.user_dt.paging.queryFun();
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }).then((res = {}) => {
                this._log(res);
            }).catch((err = {}) => {
                this._log(err);
            });
        }
    }

};
</script>

<style lang="scss" scoped>
    .content-express {
        position: relative;
    }
</style>
