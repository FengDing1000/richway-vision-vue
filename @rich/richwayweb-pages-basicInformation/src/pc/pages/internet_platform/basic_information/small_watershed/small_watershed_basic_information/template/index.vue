<template>
	<div class="content content-small-watershed_basic_information">
		<DataTableStandard
			:config="userListDataTable" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebComponents from '@rich/richwayweb-components';

const { DataTableStandard } = RichWayWebComponents;

export default {
    components: {
        DataTableStandard
    },
    data() {
        return {
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
                            label: `删除`,
                            type: `delete`,
                            icon: `icon-close`,
                            btnType: `danger`,
                            handleClick: this.handleDelete
                        }
                    ],
                    fieldList: [
                        {
                            key: `canm`,
                            label: `小流域名称`
                        },
                        {
                            key: `country`,
                            label: `所在区县`
                        },
                        {
                            key: `caarea`,
                            label: `流域面积（平方千米）`
                        },
                        {
                            key: `river`,
                            label: `上级河流`
                        },
                        {
                            key: `rvlen`,
                            label: `河长`
                        },
                        {
                            key: `gradient`,
                            label: `河道比降`
                        },
                        {
                            key: `rvhead`,
                            label: `河源位置`
                        },
                        {
                            key: `rvmouth`,
                            label: `河口位置`
                        },
                        {
                            key: `remark`,
                            label: `备注`
                        },
                        {
                            label: `操作`,
                            render: {
                                type: `btn`,
                                list: [
                                    {
                                        label: `详情`,
                                        btnType: `primary`,
                                        handleClick: this.handleChart
                                    },
                                    {
                                        label: `修改`,
                                        btnType: `success`,
                                        handleClick: this.handleChart
                                    }
                                ]
                            }
                        }
                    ]
                },
                getDataFun: `GetSmallList`
            }
        };
    },
    computed: {},
    mounted() {
        this._log(`small_watershed_basic_information has mounted`);
    },
    methods: {}

};
</script>

<style lang="scss" scoped>
    .content-small-watershed_basic_information {
        position: relative;
    }
</style>
