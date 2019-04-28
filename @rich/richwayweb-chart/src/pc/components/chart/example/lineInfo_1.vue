<template>
    <Chart
            :option="optionInfo"
            :width="width"
            :height="height" />
</template>

<script type="text/ecmascript-6">
    const Chart = r => require.ensure([], () => r(require(`./../index.vue`)), `richway_chart`);

    export default {
        name: `lineInfo1`,
        components: {
            Chart
        },
        props: {
            // 图表的宽度
            width: {
                type: String,
                default: `28rem`
            },
            height: {
                type: String,
                default: `18rem`
            }
        },
        data() {
            return {
                optionInfo: require(`./../data/lineInfo_1.js`).default,
            };
        }
    };
</script>

<style lang="scss" scoped>

</style>
