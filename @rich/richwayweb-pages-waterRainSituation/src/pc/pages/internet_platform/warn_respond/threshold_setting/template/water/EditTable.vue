<template>
    <div>
        <table>
            <tr
                bgcolor="#f7f7f7"
                class="tr_title_text_color">
                <th/>
                <th
                    v-for="(item,index) in data"
                    v-if="item.haskey"
                    :key="index">{{ item.label }}
                </th>
            </tr>
            <tr>
                <th>{{ EditRow.warnGradeNm }}</th>
                <th
                    v-for="(item,index) in data"
                    v-if="item.haskey"
                    :key="index">
                    <input
                        v-model="item.value"
                        type="number">
                </th>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: `EditTable`,
        props: {
            EditRow: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                data: []
            };
        },
        beforeMount() {
            this.setData();
        },
        methods: {
            setData() {
                const keysArr = [{
                    key: `Z`,
                    label: `水位(m)`
                }, {
                    key: `Q`,
                    label: `流量(m³/s)`
                }];
                const obj = this.EditRow;
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        keysArr.map(item => {
                            if (key === item.key) {
                                item.haskey = true;
                                item.value = obj[item.key];
                            }
                            return item;
                        });
                    }
                }
                this.data = keysArr;
            },
            upLoad() {
                const arr = [];
                this.data.forEach(item => {
                    if (item.haskey) {
                        arr.push({
                            app_id: `96c79dd7f08f46e3a1f5458809a330b6`,
                            areaid: this.EditRow.areaId,
                            stcd: this.EditRow.stcd,
                            stindex: item.key,
                            stindexunit: item.key === `Q` ? `m3/s` : `m`,
                            stthreshold: item.value,
                            warngradeid: this.EditRow.warnGrade,
                            warntypeid: `10`
                        });
                    }
                });
                const _this = this.$getData;
                return new Promise((resolve, reject) => {
                    _this.ChangeDangerArea({list: arr}).then(res => {
                        resolve(res);
                    }).catch(error => {
                        reject(error);
                    });
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    div {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 10px 0;
        overflow-x: scroll;

        table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid #ddd;

            tr {
                th {
                    min-width: 4rem;
                    height: 2.25rem;
                    border: 1px solid #ddd;
                    line-height: 2.25rem;

                    input {
                        width: 3rem;
                        height: 1.5rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        line-height: 1.9rem;
                        text-align: center;
                    }
                }
            }
        }
    }

    .tr_title_text_color {
        th {
            color: #0d47a1;
        }
    }
</style>
