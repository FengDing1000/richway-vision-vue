<template>
	<div class="header-right">
		<div class="header-right-item">
			<UserPanel />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';

    const { UserPanel } = RichWayWebComponents;

export default {
    name: `headerRight`,
    components: {
        UserPanel
    }
};
</script>

<style lang="scss">
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
