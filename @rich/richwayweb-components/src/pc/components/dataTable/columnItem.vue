<template>
	<el-table-column
		v-if="columnItem.render"
		:label="columnItem.label"
		:fixed="columnItem.fixed"
		:width="columnItem.width ? columnItem.width * rem : ''"
		:sortable="columnItem.sortable">
		<template
			slot-scope="scope">
			<template v-if="columnItem.render.type === 'html'">
                <div
                    v-html="columnItem.render.data(scope.row)"
                    @click.stop="columnItem.render.handleClick && columnItem.render.handleClick(scope.$index, scope.row)" />
            </template>

			<template v-else-if="columnItem.render.type === 'tag'">
				<el-tag
					:type="columnItem.render.data(scope.row).type"
                    @click.stop="columnItem.render.handleClick && columnItem.render.handleClick(scope.$index, scope.row)"
					round>{{ columnItem.render.data(scope.row).text }}
				</el-tag>
			</template>

			<template v-else-if="columnItem.render.type === 'elip'">
				<el-popover
					placement="right-start"
					title="描述"
					width="400"
					trigger="hover">
					<div
						class="table-elip-popover"
						v-html="columnItem.render.data(scope.row)" />
					<span
						slot="reference"
						class="richway-elip">{{ columnItem.render.data(scope.row) }}</span>
				</el-popover>
			</template>

			<template v-else-if="columnItem.render.type === 'btn'">
				<el-button
					v-for="(subItem, subIndex) in columnItem.render.list"
					:key="subIndex"
					:type="subItem.btnType"
					size="mini"
					@click="subItem.handleClick(scope.$index, scope.row)">
					<i
						:class="[subItem.icon]"
						class="richway-icon" />
					<span>{{ subItem.formatFun ? subItem.formatFun(scope.$index, scope.row) : subItem.label }}</span>
				</el-button>
			</template>

			<template v-else-if="columnItem.render.type === 'popover_btn'">
				<el-popover
					placement="top"
					trigger="hover">
					<el-button-group>
						<el-button
							v-for="(subItem, subIndex) in columnItem.render.list"
							:key="subIndex"
							:type="subItem.btnType"
							size="mini"
							@click="subItem.handleClick(scope.$index, scope.row)">
							<i class="richway-icon icon-auth" />
							<span>{{ subItem.formatFun ? subItem.formatFun(scope.$index, scope.row) : subItem.label }}</span>
						</el-button>
					</el-button-group>
					<div
						slot="reference"
						class="name-wrapper">
						<el-button
							type="primary"
							size="mini"
							circle>
						<i class="richway-icon icon-tool" /></el-button>
					</div>
				</el-popover>
			</template>
		</template>
	</el-table-column>
</template>

<script type="text/ecmascript-6">
const { mapState } = require(`vuex`);

export default {
    name: `columnItem`,
    props: {
        columnItem: {
            type: Object,
            default: () => {
            }
        }
    },
    computed: {
        ...mapState([`rem`])
    }
};
</script>

<style lang="scss">
    .table-elip-popover{
        word-wrap:break-word ;
    }

</style>
