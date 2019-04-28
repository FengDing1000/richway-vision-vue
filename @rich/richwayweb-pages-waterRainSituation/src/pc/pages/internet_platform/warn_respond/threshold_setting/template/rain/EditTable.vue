<template>
    <div>
        <table>
            <tr
                bgcolor="#f7f7f7"
                class="tr_title_text_color">
                <th/>
                <th
                    v-for="(item,index) in data"
                    :key="index">{{ item.label }}
                </th>
            </tr>
            <tr>
                <th>{{ EditRow.warnGradeNm }}</th>
                <th
                    v-for="(item,index) in data"
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
                const keysArr = [];
                const obj = this.EditRow;
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        if (key.indexOf(`stthreshold_`) === 0) {
                            let label;
                            const num = parseInt(key.slice(12), 10);
                            if (num >= 60) {
                                label = `${num / 60}小时`;
                            } else {
                                label = `${num}分钟`;
                            }
                            keysArr.push({
                                key,
                                label,
                                value: obj[key],
                                stthreshold: num
                            });
                        }
                    }
                }
                this.data = keysArr.sort((obj1, obj2) => {
                    const num1 = parseInt(obj1.key.slice(12), 10);
                    const num2 = parseInt(obj2.key.slice(12), 10);
                    return num1 - num2;
                });
            },
            upLoad() {
                const arr = [];
                this.data.forEach(item => {
                    arr.push({
                        app_id: `96c79dd7f08f46e3a1f5458809a330b6`,
                        areaid: this.EditRow.areaId,
                        areatype: 1,
                        stcd: this.EditRow.stcd,
                        stdt: item.stthreshold,
                        stindex: `R`,
                        stindexunit: `mm`,
                        stthreshold: item.value,
                        warngradeid: this.EditRow.warnGrade,
                        warntypeid: 9
                    });
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
