<template>
    <div class="cascader-segion">
        <el-input v-model="inputV" readonly v-show="inputV">
            <i
                class="el-icon-arrow-down"
                slot="suffix">
            </i>
        </el-input>
        <el-cascader
            :size="size"
            :props="setting"
            :options="options"
            v-model="selected"
            :change-on-select="changeOnSelect"
            filterable
            clearable
            placeholder="请选择行政区划"
            @change="handleChange"
            @active-item-change="handleItemChange" />
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: `cascaderSegion`,
        props: {
            value: {
                type: String,
                default: ``
            },
            selectedOptions: {
                type: Array,
                default: () => [``, ``, ``]
            },
            changeOnSelect: {
                type: Boolean,
                default: false
            },
            regionInfo: {
                type: Object,
                default: () => ({})
            },
            size: {
                type: String,
                default: `medium`
            },
            defaultValue: {
                type: String,
                default: ``
            }
        },
        data() {
            return {
                setting: {
                    value: `adCd`,
                    label: `adNm`,
                    children: `children`
                },
                options: [],
                inputV: ``
            };
        },
        computed: {
            selected: {
                get() {
                    return this.selectedOptions;
                },
                set() {
                }
            }
        },
        watch: {
            regionInfo: {
                handler() {
                    this.init();
                },
                deep: true,
                immediate: false
            },
            defaultValue(val) {
                this.inputV = val;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                // if ((this.regionInfo.code || ``).substring(4, 6) === `00`) {
                //     let dataFunName = `GetProvinceData`;
                //     if (this.regionInfo.code) {
                //         dataFunName = `GetSubRegionData`;
                //     }
                //     if (typeof (this.$getData[dataFunName]) === `function`) {
                //         this.$getData[dataFunName]({
                //             adCd: this.regionInfo.code
                //         }).then((res = {}) => {
                //             if (res.success === true) {
                //                 this.options = this.addChildren(res.data);
                //             }
                //         }).catch((err = {}) => {
                //             this._log(err);
                //         });
                //     }
                // } else {
                //     this.options = this.addChildren([
                //         {
                //             adCd: this.regionInfo.code,
                //             adNm: this.regionInfo.name
                //         }
                //     ]);
                // }
                // 如果code为空值或者为00，表示的是全国
                if (!this.regionInfo.code || ((this.regionInfo.code || ``).substring(0, 2) === `00`)) {
                    const dataFunName = `GetProvinceData`;
                    if (typeof (this.$getData[dataFunName]) === `function`) {
                        this.$getData[dataFunName]({
                            adCd: this.regionInfo.code
                        }).then((res = {}) => {
                            if (res.success === true) {
                                this.options = this.addChildren(res.data);
                            }
                        }).catch((err = {}) => {
                            this._log(err);
                        });
                    }
                } else {
                    if ((this.regionInfo.code || ``).substring(4, 6) === `00`) {
                        const dataFunName = `GetSubRegionData`;
                        // if (this.regionInfo.code) {
                        //     dataFunName = `GetSubRegionData`;
                        // }
                        if (typeof (this.$getData[dataFunName]) === `function`) {
                            this.$getData[dataFunName]({
                                adCd: this.regionInfo.code
                            }).then((res = {}) => {
                                if (res.success === true) {
                                    this.options = this.addChildren(res.data);
                                }
                            }).catch((err = {}) => {
                                this._log(err);
                            });
                        }
                    } else {
                        this.options = this.addChildren([
                            {
                                adCd: this.regionInfo.code,
                                adNm: this.regionInfo.name
                            }
                        ]);
                    }
                }
            },
            handleItemChange(value) {
                this._log(`handleItemChange`, value);
                const adCd = this.getCode(value);
                const num = (adCd || ``).substring(4, 6);
                let dataFunName = ``;
                if (num === `00`) {
                    dataFunName = `GetSubRegionData`;
                }
                if (typeof (this.$getData[dataFunName]) === `function`) {
                    this.$getData[dataFunName]({
                        adCd
                    }).then((res = {}) => {
                        if (res.success === true) {
                            this.setOptionsChildren(adCd, this.options, this.addChildren(res.data));
                        }
                    }).catch((err = {}) => {
                        this._log(err);
                        this.setOptionsChildren(adCd, this.options, this.addChildren([{
                            adNm: `没有数据`
                        }]));
                    });
                }
            },
            handleChange(value) {
                this._log(`handleChange`, value);

                this.inputV = ``;

                if (this.changeOnSelect === true) {
                    this.handleItemChange(value);
                }

                let arr = [];
                arr = this.getSegionName(this.options, value, arr);

                const info = {
                    adCdList: value,
                    adNmList: arr
                };
                this.$emit(`on-change`, JSON.parse(JSON.stringify(info)));

                let inputV = ``;
                for (let a = (value || []).length; a >= 0; a--) {
                    if (value[a]) {
                        inputV = value[a];
                        break;
                    }
                }
                this.$emit(`input`, inputV);
                this.$emit(`change`);
            },
            getCode(list) {
                let code = ``;
                for (const item of list) {
                    if (item) {
                        code = item;
                    }
                }
                return code;
            },
            addChildren(list = []) {
                for (const item of list) {
                    const num = (item.adCd || ``).substring(4, 6);
                    if (num === `00`) {
                        item.children = [];
                    }
                }
                return list;
            },
            setOptionsChildren(adCd, list = [], children) {
                for (const item of list) {
                    if (item.adCd === adCd) {
                        item.children = children;
                        break;
                    } else if ((item.children || []).length) {
                        this.setOptionsChildren(adCd, item.children, children);
                    }
                }
            },
            getSegionName(provinceList = [], selectedCodeList = [], selectedNameList = [], num = 0) {
                for (const item of (provinceList || [])) {
                    if (item.adCd === selectedCodeList[num]) {
                        selectedNameList.push(item.adNm);
                        if ((item.children || []).length > 0) {
                            num++;
                            this.getSegionName(item.children, selectedCodeList, selectedNameList, num);
                        }
                        break;
                    }
                }
                return selectedNameList;
            }
        }
    };
</script>

<style lang="scss">
    .cascader-segion{
        position: relative;
        >.el-input{
            position: absolute;
            pointer-events: none;
            z-index: 1;
        }
    }

</style>
