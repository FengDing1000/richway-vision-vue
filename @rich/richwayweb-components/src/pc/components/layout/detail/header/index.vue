<template>
	<header class="richway-header richway-shadow">
		<slot name="headerSlot" />
	</header>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `layoutHeader`
};
</script>

<style lang="scss">
    .richway-layout-base{
        .richway-header {
            position: relative;
            z-index: 5;
            height: 3rem;
            color: #fff;
            background-color: #108ee9;
            transition: background-color .3s, color .3s;

            .richway-icon {
                font-size: 1rem;
                color: #fff;
            }

            .header-content{
                height: 100%;
            }
        }
    }
</style>
