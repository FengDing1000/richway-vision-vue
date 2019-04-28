<template>
	<div>
		<el-table
			v-loading="loading"
			:data="tableData1"
			:max-height="tableMaxHeight"
			:detail-info="detailInfo"
			border
			style="width: 100%
">
			<el-table-column
				width="150px"
				fixed
				prop="NAME"
				label="山洪沟名称">
				<template slot-scope="scope">
					<p :title="scope.row.NAME">{{ scope.row.NAME | _filterStlc(10) }}</p>
				</template>
			</el-table-column>
			<el-table-column
				prop="TOWNS"
				width="100px"
				align="center"
				label="受影响乡镇(个)" />
			<el-table-column
				prop="XZC"
				width="100px"
				align="center"
				label="受影响行政村(个)" />
			<el-table-column
				prop="ZRC"
				width="100px"
				align="center"
				label="受影响自然村(个)" />
			<el-table-column
				prop="PCOUNT"
				width="100px"
				align="center"
				label="影响人口(人)" />
			<el-table-column
				prop="LAND"
				width="100px"
				align="center"
				label="影响耕地(亩)" />
			<el-table-column
				width="80px"
				align="center"
				prop="PFCOUNT"
				label="影响设施(座)" />
			<el-table-column
				width="110px"
				prop="FCOUNT"
				align="center"
				label="建国以来山洪发生次数(次)" />
			<el-table-column
				width="130px"
				prop="FCOUNT"
				align="center"
				label="建国以来死亡(失踪)人数(人)" />

			<el-table-column
				prop="CAREA"
				width="80px"
				align="center"
				label="集水面积(km²)" />
			<el-table-column
				prop="CHLENGTH"
				width="80px"
				align="center"
				label="沟道长度(km)" />
			<el-table-column
				prop="CHPERCENT"
				align="center"
				width="80px"
				label="沟道比降(‰)" />
			<el-table-column
				prop="FCATION"
				align="center"
				width="60px"
				label="有无设防">
				<template slot-scope="scope">
					<p>{{ scope.row.FCATION | _filterIs }}</p>
				</template>
			</el-table-column>
			<el-table-column
				width="80px"
				prop="FSTAND"
				label="现状防洪标准(年)" />
			<el-table-column
				width="150px"
				prop="CPROGRAM"
				label="治理措施" />

			<el-table-column
				:width="150 * rem"
				label="横纵断面图">
				<template slot-scope="scope">
					<viewer
						:images="[scope.row.imgSrc1, scope.row.imgSrc2]"
						class="viewer-img">
						<img :src="scope.row.imgSrc1">
						<img :src="scope.row.imgSrc2">
					</viewer>
				</template>
			</el-table-column>
		</el-table>
	</div>

</template>

<script type="text/ecmascript-6">
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';

const { mapState } = require(`vuex`);

export default {
    name: `mountainInfo`,
    components: {},
    filters: {
        _filterStlc,
        _filterIs: value => {
            if (value === `0`) return `是`;
            if (value === `1`) return `否`;
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
                    tableName: `IA_WRC_GULLY`,
                    wscd: WSCD
                }).then((res = {}) => {
                    this.tableData1 = res.data || [];
                }).always(() => {
                    this.loading = false;
                });
            }
        },
        handleLookImg(item) {
            this._log(item);
        }
    }
};
</script>

<style lang="scss" scoped>
		.viewer-img{
			img {
				width: 2.5rem;
				height: 1.2rem;
				cursor: pointer;

				&:hover{
					border: 1px solid #eee;
				}
			}
		}
</style>
