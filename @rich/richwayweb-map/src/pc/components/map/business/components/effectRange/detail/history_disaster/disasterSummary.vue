<template>
	<el-table
		v-loading="loading"
		:data="tableData1"
		:max-height="tableMaxHeight"
		:detail-info="detailInfo"
		border
		style="width: 100%
">
		<el-table-column
			:width="140 * rem"
			prop="OTIME"
			label="灾害发生时间" />
		<el-table-column
			prop="DDSCRIB"
			label="灾情总结" />
	</el-table>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `disasterSummary`,
    components: {},
    props: {
        tableMaxHeight: {
            type: Number,
            default: 500
        },
        detailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            loading: false,
            tableData1: []
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    watch: {
        detailInfo: {
            handler() {
                this.handleQuery();
            },
            deep: true,
            immediate: false
        }
    },
    mounted() {
        this.handleQuery();
    },
    methods: {
        handleQuery() {
            const { WSCD } = this.detailInfo;
            if (WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_HSC_HSFWATER`,
                    wscd: WSCD
                }).then((res = {}) => {
                    this.tableData1 = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
