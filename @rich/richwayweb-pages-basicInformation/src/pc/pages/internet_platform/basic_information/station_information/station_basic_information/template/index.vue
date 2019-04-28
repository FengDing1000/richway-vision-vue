<template>
	<div class="content content-station-basic_information">
		<el-tabs>
			<el-tab-pane label="本县山洪站点">
				<CurrentStation />
			</el-tab-pane>
			<el-tab-pane label="本县气象水文">
				<CurrentWeather />
			</el-tab-pane>
			<el-tab-pane label="邻县站点">
				<NearbyStation />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/ecmascript-6">
const CurrentStation = r => require.ensure([], () => r(require(`./CurrentStation`)), `components/pagesBasicInformation/stationBasicInformation`);
const CurrentWeather = r => require.ensure([], () => r(require(`./CurrentWeather`)), `components/pagesBasicInformation/stationBasicInformation`);
const NearbyStation = r => require.ensure([], () => r(require(`./NearbyStation`)), `components/pagesBasicInformation/stationBasicInformation`);

export default {
    components: {
        CurrentStation, CurrentWeather, NearbyStation
    },
    data() {
    },
    computed: {},
    mounted() {
        this._log(`small_watershed_basic_information has mounted`);
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
    .content-station-basic_information {
        position: relative;
    }
</style>
