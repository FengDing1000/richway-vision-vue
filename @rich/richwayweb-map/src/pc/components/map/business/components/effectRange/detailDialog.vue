<template>
	<Dialog
		:title="title"
		@on-hide="handleHide">
		<div
			slot="content"
			class="range-dialog-content">
			<el-tabs
				v-model="activeName"
				stretch
				@tab-click="handleTabsClick">
				<el-tab-pane
					v-for="(item, index) in currentTabList"
					:label="item.title"
					:name="item.code"
					:key="index"
					lazy>
					<keep-alive>
						<component
							:is="item.componentName"
							:table-max-height="tableMaxH"
							:detail-info="detailInfo"
							:wscd="wscd"
						/>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</div>
	</Dialog>
</template>

<script type="text/ecmascript-6">
import DetailComponents from './detail';
import moreListData from './moreList';

const { mapState } = require(`vuex`);

const Dialog = r => require.ensure([], () => r(require(`../dialog`)), `components/map/business/index`);
const components = Object.assign({ Dialog }, DetailComponents);

export default {
    name: `detailDialog`,
    components,
    props: {
        detailInfo: {
            type: Object,
            default: () => {}
        },
        type: {
            type: String,
            default: ``
        },
        title: {
            type: String,
            default: ``
        },
        wscd: {
            type: String,
            default: ``
        }
    },
    data() {
        return {
            list: [
                {
                    type: `safe_transfer`,
                    tabList: [
                        {
                            code: `baseInformation`,
                            title: `基本信息`,
                            componentName: `BaseInformation`
                        },
                        {
                            code: `WarnIndicators`,
                            title: `预警指标`,
                            componentName: `WarnIndicators`
                        },
                        {
                            code: `villageDweller`,
                            title: `重要沿河村落居民户`,
                            componentName: `VillageDweller`
                        },
                        {
                            code: `towner`,
                            title: `重要城（集）镇居民`,
                            componentName: `Towner`
                        },
                        {
                            code: `publicInstitution`,
                            title: `企事业单位`,
                            componentName: `PublicInstitution`
                        },
                        {
                            code: `zqrelPic`,
                            title: `水位-流量-人口关系图`,
                            componentName: `ZqRelPic`
                        },
                        {
                            code: `fhxzPic`,
                            title: `防洪现状评价图`,
                            componentName: `FhxzPic`
                        },
                        {
                            code: `danadPic`,
                            title: `危险区示意图`,
                            componentName: `DanadPic`
                        },
                        {
                            code: `ljRainPic`,
                            title: `临界雨量图`,
                            componentName: `LjRainPic`
                        },
                        {
                            code: `pictureOther`,
                            title: `照片`,
                            componentName: `pictureOther`
                        }

                    ]
                },
                {
                    type: `history_disaster`,
                    title: `历史山洪灾害`,
                    tabList: [
                        {
                            code: `disasterStatistics`,
                            title: `灾情统计`,
                            componentName: `DisasterStatistics`
                        },
                        {
                            code: `disasterSummary`,
                            title: `灾情总结`,
                            componentName: `DisasterSummary`
                        },
                        {
                            code: `floodMarkData`,
                            title: `洪痕资料`,
                            componentName: `FloodMarkData`
                        }
                    ]
                },
                {
                    type: `mountain`,
                    title: `需要治理的山洪沟`,
                    tabList: [
                        {
                            code: `mountainInfo`,
                            title: `山洪沟信息`,
                            componentName: `MountainInfo`
                        }
                    ]
                },
                {
                    type: `more`,
                    title: `更多`,
                    tabList: moreListData
                }
            ]
        };
    },
    computed: {
        ...mapState([`rem`]),
        tableMaxH() {
            return this.rem * 500;
        },
        currentTabList() {
            const arr = (this.list.find(item => item.type === this.type) || {}).tabList || [];
            return arr;
        },
        activeName: {
            get() {
                let name = ((this.currentTabList || [])[0] || {}).code;
                if (this.type === `more`) {
                    name = this.detailInfo.code;
                }
                return name;
            },
            set() {

            }
        }
    },
    watch: {
        detailInfo: {
            immediate: true,
            deep: true,
            handler() {
                // this.showDetail(this.workDetailLists[0]);
            }
        }
    },
    mounted() {},
    methods: {
        handleHide() {
            this.$emit(`on-hide`);
        },
        handleTabsClick() {

        }
    }
};
</script>

<style lang="scss" scoped>
		.range-dialog-content {
			height: 30rem;
			overflow: hidden;
		}
</style>
