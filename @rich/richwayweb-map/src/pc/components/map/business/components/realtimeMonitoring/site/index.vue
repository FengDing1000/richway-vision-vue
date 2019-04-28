<template>
	<el-tabs
		v-model="activeName"
		stretch
		@tab-click="handleClick">
		<el-tab-pane name="all">
			<span slot="label"><i class="el-icon-menu" /> 全部</span>
			<keep-alive>
				<SiteListPanel
					:current-type="activeName"
					:map="map"
					:sub-components="subComponents"
					type="all" />
			</keep-alive>
		</el-tab-pane>
		<el-tab-pane
			name="abnormal"
			lazy>
			<span slot="label"><i class="richway-icon icon-warn" /> 异常</span>
			<keep-alive>
				<SiteListPanel
					:current-type="activeName"
					:map="map"
					:sub-components="subComponents"
					type="abnormal" />
			</keep-alive>
		</el-tab-pane>
		<el-tab-pane
			name="collection"
			lazy>
			<span slot="label"><i class="el-icon-star-on" /> 收藏</span>
			<keep-alive>
				<SiteListPanel
					:current-type="activeName"
					:map="map"
					:sub-components="subComponents"
					type="collection" />
			</keep-alive>
		</el-tab-pane>
		<el-tab-pane
			name="more"
			lazy>
			<span slot="label"><i class="el-icon-more" /> 更多</span>
			<div class="site-info-content site-more">
				更多
			</div>
		</el-tab-pane>
	</el-tabs>
</template>

<script type="text/ecmascript-6">
import SiteListPanel from './siteListPanel.vue';

export default {
    name: `SiteMonitorBox`,
    components: {
        SiteListPanel
    },
    props: {
        map: {
            type: Object,
            default: () => {
            }
        },
        subComponents: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            activeName: `all`
        };
    },
    computed: {},
    methods: {
        handleClick(tab, event) {
            this._log(tab.name, this.activeName, event);
        }
    }
};
</script>

<style lang="scss">

</style>
