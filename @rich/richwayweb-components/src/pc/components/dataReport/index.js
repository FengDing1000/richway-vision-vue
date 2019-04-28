import RichWayWebUtils from '@rich/richwayweb-utils';

const { deepClone } = RichWayWebUtils;

class DataReport {
    constructor(info) {
        this.noQuery = info.noQuery || false;

        this.getQuery = (info = {}) => {
            if (this.noQuery === true) {
                return {
                    query: {
                        fieldList: [],
                        btnList: []
                    },
                    queryInfo: {}
                };
            }
            const queryInfo = {};
            const query = {
                fieldList: [],
                btnList: [
                    {
                        label: `查询`,
                        type: `query`,
                        icon: `icon-search`,
                        btnType: `primary`
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

        const o = this.getQuery(info.query);
        this.queryInfoStatic = deepClone(o.queryInfo);
        this.query = o.query;
        this.queryInfo = o.queryInfo;

        // 加载状态
        this.loading = false;
    }
}

export default DataReport;
