<template>
	<el-table
		v-loading="loading"
		:max-height="tableMaxHeight"
		:data="tableData1"
		:detail-info="detailInfo"
		align="center"
		border
		style="width: 100%
">
		<el-table-column
			prop="VNAME"
			label="城（集）镇名称">
			<template slot-scope="scope">
				<p :title="scope.row.VNAME">{{ scope.row.VNAME | _filterStlc(20) }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="ADDRESS"
			label="地址（门牌号）" />
		<el-table-column
			prop="PTCOUNT"
			width="120px"
			align="center"
			label="总人数(人)" />
		<el-table-column
			prop="AREA"
			width="120px"
			align="center"
			label="建筑面积(m²)" />
		<el-table-column
			prop="BTYPE"
			width="150px"
			align="center"
			label="建筑类型">
			<template slot-scope="scope">
				<p>{{ scope.row.BTYPE | _filterBtype }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="BWATER"
			width="80px"
			align="center"
			label="临水">
			<template slot-scope="scope">
				<p>{{ scope.row.BWATER | _filterIs }}</p>
			</template>
		</el-table-column>
		<el-table-column
			prop="BHILL"
			align="center"
			width="80px"
			label="切坡">
			<template slot-scope="scope">
				<p>{{ scope.row.BHILL | _filterIs }}</p>
			</template>
		</el-table-column>
	</el-table>
</template>

<script type="text/ecmascript-6">
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';

export default {
    name: `baseInformation`,
    components: {},
    filters: {
        _filterStlc,
        _filterBtype: value => {
            if (value === `1`) return `一层住宅`;
            if (value === `2`) return `二层住宅`;
            if (value === `3`) return `三层住宅`;
            if (value === `4`) return `三层以上住宅`;
            return value;
        },
        _filterIs: value => {
            if (value === 0) return `是`;
            if (value === 1) return `否`;
            return value;
        }
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
            const { ADCD } = this.detailInfo;
            const { WSCD } = this.detailInfo;
            if (ADCD && WSCD) {
                this.loading = true;
                this.$getData.GetRangeDetail({
                    tableName: `IA_ECC_DTRESIDENT`,
                    wscd: WSCD,
                    adcd: ADCD
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
		th>div{
			text-align:center!important;
		}
</style>
