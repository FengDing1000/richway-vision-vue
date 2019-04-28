<template>
	<div class="richway-bread-crumb">
		<div class="richway-bread-crumb-active">
			<i
				:class="[currentPage.icon]"
				class="richway-icon" />
			<span>{{ currentPage.menuName }}</span>
		</div>
		<el-breadcrumb
			separator-class="el-icon-arrow-right"
			class="richway-right">
			<template v-for="(item, index) in breadCrumb">
				<el-breadcrumb-item
					v-if="item.url"
					:key="index"
					:to="{ path: item.url }">{{ item.menuName }}</el-breadcrumb-item>
				<el-breadcrumb-item
					v-else
					:key="index">{{ item.menuName }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `MenuBreadcrumb`,
    props: {
        breadCrumb: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    },
    computed: {
        currentPage() {
            const lastPage = this.breadCrumb[this.breadCrumb.length - 1] || {};
            return {
                menuName: lastPage.menuName,
                icon: lastPage.icon || `icon-network`
            };
        }
    }
};
</script>

<style lang="scss" scoped>
		.richway-bread-crumb {
			padding-bottom: .2rem;
			margin: 1rem 1.2rem 0;
			border-bottom: 1px solid #ccc;
		}

		.richway-bread-crumb-active {
			position: relative;
			top: -.3rem;
			display: inline-block;
			font-weight: 600;
			font-size: .9rem;
		}
</style>
