<template>
    <div class="container-el-transfer">
        <el-transfer
            v-model="value"
            :titles="['时间段列表', '已选择列表·']"
            :button-texts="['到左边', '到右边']"
            :data="data"/>
    </div>
</template>
<script>
    export default {
        name: `time-ranger`,
        props: {
            selected: {
                type: Array,
                default: () => []
            }
        },
        data() {
            const generateData = () => {
                const data = [{
                    key: 5,
                    label: `5分钟`
                }, {
                    key: 30,
                    label: `30分钟`
                }];
                for (let i = 1; i <= 24; i++) {
                    data.push({
                        key: i * 60,
                        label: `${i}小时`
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: this.selected
            };
        },
        methods: {
            callback() {
                const timeArr = [];
                this.value.sort((a, b) => a - b).forEach(num => {
                    let label;
                    if (num >= 60) {
                        label = `${num / 60}小时`;
                    } else {
                        label = `${num}分钟`;
                    }
                    timeArr.push({
                        key: `stthreshold_${num}`,
                        label
                    });
                });
                return timeArr;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container-el-transfer {
        display: flex;
        justify-content: center;
    }
</style>
