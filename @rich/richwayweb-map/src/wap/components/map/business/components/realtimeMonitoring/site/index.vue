<template>
	<div class="site-panel">
		<p>这里是site</p>
	</div>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `site`,
    components: {},
    props: {
        map: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapState([`rem`])
    }
};
</script>

<style lang="scss">
    .site-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
