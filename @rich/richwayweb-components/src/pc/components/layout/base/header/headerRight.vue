<template>
	<div class="header-right">
		<div class="header-right-item">
			<UserPanel />
		</div>
		<!--<div-->
		<!--v-if="settingInfo.headerPosition==='left'"-->
		<!--class="header-toggle">-->
		<!--<el-tooltip-->
		<!--:disabled="!collapse"-->
		<!--effect="dark"-->
		<!--content="展开"-->
		<!--placement="right">-->
		<!--<div-->
		<!--class="header-right-item"-->
		<!--@click="handleClick">-->
		<!--<i-->
		<!--:class="[collapse? '' : 'left']"-->
		<!--class="richway-icon icon-sign-out" />-->
		<!--<span v-if="!collapse">收起</span>-->
		<!--</div>-->
		<!--</el-tooltip>-->
		<!--</div>-->
	</div>
</template>

<script type="text/ecmascript-6">
const { mapState, mapMutations } = require(`vuex`);
const UserPanel = r => require.ensure([], () => r(require(`../../../userPanel`)), `richway_components`);

export default {
    name: `headerRight`,
    components: {
        UserPanel
    },
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState([`hasLogin`, `settingInfo`]),
        collapse() {
            return this.settingInfo.headerTakeUp;
        }
    },
    methods: {
        ...mapMutations([`SET_SETTING_INFO`]),
        handleClick() {
            this.settingInfo.headerTakeUp = !this.settingInfo.headerTakeUp;
            this.SET_SETTING_INFO(this.settingInfo);
            this.$getData.UpdateLayout(this.settingInfo);
        }
    }
};
</script>

<style lang="scss" scoped>
    $h: 3rem;
    .header-right {
        float: right;
        display: inline-block;
        color: #fff;

        .header-right-item {
            float: left;
            display: inline-block;
            height: $h;
            padding: 0 1rem;
            font-weight: 600;
            font-size: 1rem;
            line-height: $h;
            cursor: pointer;

            &:hover {
                background-color: #4775ca;
            }
        }
    }
</style>
