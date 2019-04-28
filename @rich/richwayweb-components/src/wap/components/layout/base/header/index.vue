<template>
	<header
		class="richway-header richway-shadow">
		444444444
	</header>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `headerContainer`,
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapState([`userInfo`, `settingInfo`])
    },
    methods: {}
};
</script>

<style lang="scss">
    .richway-layout-wap-base {
        .richway-header {
            position: absolute;
            z-index: 5;
            top: 0;
            height: 3rem;
            color: #fff;
            background-color: #108ee9;
            transition: background-color .3s, color .3s;

            .richway-icon {
                font-size: 1rem;
            }
        }
    }
</style>
