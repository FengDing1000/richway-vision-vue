<template>
	<div
		class="header-logo"
		@click="handleClick">
		<img
			:src="logoSrc"
			class="header-logo-img">
		<span class="header-logo-title">{{ appName }}</span>
	</div>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `headerLogo`,
    props: {},
    data() {
        return {};
    },
    computed: {
        ...mapState([`settingInfo`, `userInfo`]),
        logoSrc() {
            return `${this.$base.path.nodeStaticResourcesHost}${this.settingInfo.logo || `/images/logo.png`}`;
        },
        appName() {
            return this.userInfo.appName || this.settingInfo.title || ``;
        }
    },
    methods: {
        handleClick() {
            this.$router.push(`/`);
        }
    }
};
</script>

<style lang="scss" scoped>
		.header-logo {
			position: relative;
			float: left;
			display: inline-block;
			padding: 0 1rem;
		}

		.header-logo-img {
			display: inline-block;
			height: 2rem;
			margin: .5rem;
			cursor: pointer;
		}

		.header-logo-title {
			display: inline-block;
			height: 3rem;
			padding: .75rem;
			line-height: 1.5rem;
		}
</style>
