<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"

		border
		style="width: 100%
">
		<el-table-column
			prop="NAME"
			align="center"
			label="危险区名称">
			<template slot-scope="scope">
				<p :title="scope.row.NAME">{{ scope.row.NAME | _filterStlc(4) }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="PTCOUNT"
			align="center"
			label="危险区人口（人）" />
		<el-table-column
			prop="ETCOUNT"
			align="center"
			label="危险区内总户数（户）" />
		<el-table-column
			prop="ECOUNT1"
			align="center"
			label="危险区内Ⅰ类经济户数（户）" />
		<el-table-column
			prop="ECOUNT2"
			align="center"
			label="危险区内Ⅱ类经济户数（户）" />
		<el-table-column
			prop="ECOUNT3"
			align="center"
			label="危险区内Ⅲ类经济户数（户）" />
		<el-table-column
			prop="ECOUNT4"
			align="center"
			label="危险区内Ⅳ类经济户数（户）" />
		<el-table-column
			prop="HTCOUNT"
			label="危险区内总房屋数（座）" />
		<el-table-column
			prop="HCOUNT1"
			align="center"
			label="危险区内Ⅰ类房屋数（座）" />
		<el-table-column
			prop="HCOUNT2"
			label="危险区内Ⅱ类房屋数（座）" />
		<el-table-column
			prop="HCOUNT3"
			align="center"
			label="危险区内Ⅲ类房屋数（座）" />
		<el-table-column
			prop="HCOUNT4"
			align="center"
			label="危险区内Ⅳ类房屋数（座）" />
	</el-table>
</template>

<script type="text/ecmascript-6">
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';

export default {
    name: `baseInformation`,
    components: {},
    filters: {
        _filterStlc
    },
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
            const { PID, WSCD } = this.detailInfo;
            if (PID && WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_ADC_DANAD`,
                    pid: PID,
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
