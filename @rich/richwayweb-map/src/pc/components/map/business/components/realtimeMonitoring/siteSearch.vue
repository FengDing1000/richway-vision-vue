<template>
	<div class="site-search">
		<el-input
			v-model="searchSiteName"
			:placeholder="placeholder"
			clearable
			@change="handleChange">
			<el-button
				slot="append"
				icon="el-icon-search"
				@click.stop="handleSearch" />
		</el-input>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `siteSearch`,
    props: {
        placeholder: {
            type: String,
            default: `请输入测站名称...`
        }
    },
    data() {
        return {
            searchSiteName: ``
        };
    },
    mounted() {},
    methods: {
        handleSearch() {
            this.$emit(`on-search`);
        },
        handleChange() {
            this.$emit(`on-change`, this.searchSiteName);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
