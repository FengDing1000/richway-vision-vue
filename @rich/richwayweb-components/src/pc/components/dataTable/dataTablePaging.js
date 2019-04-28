import RichWayWebUtils from '@rich/richwayweb-utils';

const { deepClone } = RichWayWebUtils;

function doTableFields(list = []) {
    for (const item of list) {
        if ((item.list || []).length) {
            item.list = doTableFields(item.list);
        } else {
            item.width = item.width || ``;
            item.fixed = item.fixed || false;
        }
    }
    return list;
}

class DataTablePaging {
    constructor(info) {
        this.noQuery = info.noQuery || false;
        this.getQueryInfoFuns = [];

        this.getQuery = (info = {}) => {
            if (this.noQuery === true) {
                return {
                    query: {
                        fieldList: [],
                        btnList: []
                    },
                    queryInfo: info.hiddenInfo || {}
                };
            }
            const queryInfo = Object.assign({}, info.hiddenInfo);
            const query = {
                fieldList: [],
                btnList: [
                    {
                        label: `查询`,
                        type: `query`,
                        icon: `icon-search`,
                        btnType: `primary`
                    },
                    {
                        label: `重置`,
                        type: `reset`,
                        icon: `icon-return`
                    }
                ]
            };
            if (Array.isArray(info.fieldList)) {
                query.fieldList = deepClone(info.fieldList);
            }
            if (query.fieldList.length === 0) {
                query.fieldList.push([
                    {
                        key: `keyword`,
                        label: `关键字`,
                        value: ``,
                        type: `input`
                    }
                ]);
            }
            if (query.fieldList.length === 1) {
                query.fieldList.push([{}]);
            }

            this.getQueryInfoFuns = [];
            for (const item of query.fieldList) {
                for (const subItem of (item || [])) {
                    subItem.visibility = subItem.visibility || true;
                    subItem.type = subItem.type || `input`;
                    subItem.placeholder = (subItem.placeholder || `请输入${subItem.label}`).replace(/(&emsp;)|(&ensp;)|(&nbsp;)/g, ``);
                    subItem.maxlength = subItem.maxlength || 30;
                    if (subItem.type === `date`) {
                        subItem.pickerType = subItem.pickerType || `date`;
                        subItem.format = subItem.format || `yyyy-MM-dd`;
                        subItem.valueFormat = subItem.valueFormat || `yyyy-MM-dd`;
                        subItem.defaultValue = subItem.value || (subItem.pickerType.includes(`range`) ? [] : ``);
                        subItem.startPlaceholder = subItem.startPlaceholder || `开始时间`;
                        subItem.endPlaceholder = subItem.endPlaceholder || `结束时间`;

                        if (subItem.pickerType.indexOf(`range`) > -1 && (subItem.fieldKeys || []).length > 1) {
                            for (let a = 0, a1 = subItem.fieldKeys.length; a < a1; a++) {
                                const str = subItem.fieldKeys[a];
                                queryInfo[str] = ``;
                                this.getQueryInfoFuns.push({
                                    fieldKey: str,
                                    dataFieldKey: subItem.key,
                                    index: a
                                });
                            }
                        }
                    }

                    subItem.value = (this.queryInfoStatic || {})[subItem.key] === subItem.value ? (this.queryInfo || {})[subItem.key] : subItem.value;
                    queryInfo[subItem.key] = subItem.value;
                }
            }


            for (const item of (query.btnList || [])) {
                item.icon = item.icon || `icon-tree`;
            }

            return {
                query,
                queryInfo
            };
        };

        this.getTable = (info = {}) => {
            const table = {
                fieldList: [],
                btnList: []
            };
            if (Array.isArray(info.fieldList)) {
                table.fieldList = deepClone(doTableFields(info.fieldList));
            }

            if (Array.isArray(info.btnList)) {
                table.btnList = info.btnList;
            }
            for (const item of (table.btnList || [])) {
                item.icon = item.icon || `icon-tree`;
            }

            return table;
        };

        const o = this.getQuery(info.query);
        this.queryInfoStatic = deepClone(o.queryInfo);
        this.query = o.query;
        this.queryInfo = o.queryInfo;

        this.table = this.getTable(info.table);

        // 每页显示几条，取rowsList里面的某一个值
        this.rows = info.rows || 20;
        // 每页显示几条的下拉框
        this.rowsList = info.rowsList || [10, 20, 50, 100];
        // 当前是第几页，从1开始
        this.page = 1;
        // 总共有几条数据
        this.total = 0;
        // 总共有几页
        this.pages = 0;
        // 加载状态
        this.loading = false;

        this.dataList = info.dataList || [];

        this.selectedList = [];

        this.getDataFun = info.getDataFun || null;

        this.tableMaxH = info.tableMaxH || 500;

        this.queryFun = (params = {}) => new Promise((resolve, reject) => {
            // 判断加载状态
            if (this.loading) {
                return false;
            }

            if (typeof (this.getDataFun) === `function`) {
                // 加锁
                this.loading = true;

                const queryInfo = Object.assign({}, this.queryInfo, params);
                // if (!params) {
                //     queryInfo = deepClone(this.queryInfo);
                // } else {
                //     queryInfo = deepClone(params);
                // }
                for (const item of this.getQueryInfoFuns) {
                    queryInfo[item.fieldKey] = (queryInfo[item.dataFieldKey] || [])[item.index || 0];
                }
                queryInfo.rows = this.rows;
                queryInfo.page = this.page;
                this.getDataFun(queryInfo).then((res = {}) => {
                    if (res.success === true) {
                        this.dataList = res.data;
                        this.total = res.total;
                        this.pages = Math.ceil(this.total / this.rows);
                        if (this.page > this.pages) {
                            this.page = this.pages;
                        }
                    }
                    resolve(this.dataList);
                }).catch((err = {}) => {
                    this.dataList = [];
                    reject(err);
                }).always(() => {
                    this.loading = false;
                });
            }

            return true;
        });


        this.getConfigByKey = (key, value) => {
            let config = {};
            for (const item of (this.query.fieldList || [])) {
                for (const subItem of (item || [])) {
                    if (key === subItem.key) {
                        config = subItem;
                        break;
                    } else if (subItem.key === undefined) {
                        let bl = false;
                        for (const o of (subItem.list || [])) {
                            if (o.key === key) {
                                bl = true;
                                break;
                            }
                        }
                        if (bl) {
                            config = subItem;
                            break;
                        }
                    }
                }
            }
            config.label = (config.label || ``).replace(/(&emsp;)|(&ensp;)|(&nbsp;)/g, ``);
            config.filterValue = value;
            if (config.type === `select` || config.type === `radio`) {
                for (const o of (config.options || [])) {
                    if (o.value === value) {
                        config.filterValue = o.label;
                        break;
                    }
                }
            } else if (config.type === `checkbox`) {
                const arr = [];
                for (const o of (config.options || [])) {
                    if ((value || []).indexOf(o.value) > -1) {
                        arr.push(o.label);
                    }
                }
                config.filterValue = arr.join(`,`);
            } else if (config.type === `date` && config.pickerType.includes(`range`)) {
                config.filterValue = (value || []).join(` 到 `);
            }
            return config;
        };
    }
}

export default DataTablePaging;
