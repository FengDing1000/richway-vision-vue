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
			prop="FCD"
			label="洪水编码" />
		<el-table-column
			:width="110 * rem"
			prop="OTIME"
			label="洪水发生时间" />
		<el-table-column
			prop="ADDRESS"
			label="洪水发生位置">
			<template slot-scope="scope">
				<p :title="scope.row.ADDRESS">{{ scope.row.ADDRESS | _filterStlc(9) }}</p>
			</template>
		</el-table-column>
		<el-table-column
			:width="80 * rem"
			prop="ELEVATION"
			label="高程" />
		<el-table-column
			prop="FVISIT"
			label="洪水访问情况" />
		<el-table-column
			prop="SUNIT"
			label="调查单位" />
		<el-table-column
			:width="100 * rem"
			prop="STIME"
			label="调查时间" />
		<el-table-column
			:width="110 * rem"
			label="洪痕图像资料">
			<template slot-scope="scope">
				<viewer
					:images="[scope.row.imgSrc1]"
					class="viewer-img">
					<img :src="scope.row.imgSrc1">
				</viewer>
			</template>
		</el-table-column>
	</el-table>
</template>

<script type="text/ecmascript-6">
import { _filterStlc } from '@rich/richwayweb-utils/lib/filter/filterStation';

const { mapState } = require(`vuex`);

export default {
    name: `floodMarkData`,
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
                    tableName: `IA_HSC_HFDFTS`,
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
