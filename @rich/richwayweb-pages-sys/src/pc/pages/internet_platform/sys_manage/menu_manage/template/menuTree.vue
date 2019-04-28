<template>
	<div
		v-loading="menuLoading"
		class="menu-tree-panel">
		<el-tree
			:data="menuList"
			:props="defaultProps"
			highlight-current
			check-on-click-node
			accordion
			empty-text="暂无菜单"
			@node-click="handleNodeClick">
			<span
				slot-scope="{ node, data }"
				class="menu-tree-item">
				<i
					:class="[data.icon]"
					class="richway-icon" />
				<span>{{ node.label }}</span>
				<i
					class="richway-icon icon-close"
					@click.stop="() => handleRemove(data)" />
				<i
                    v-if="data.menuType === 'label'"
					class="richway-icon icon-plus"
					@click.stop="() => handleAppend(node, data)" />
			</span>
		</el-tree>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `MenuTree`,
    props: {
        menuList: {
            type: Array,
            default: () => []
        },
        menuLoading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            defaultProps: {
                children: `children`,
                label: `menuName`
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            this.$emit(`on-click`, data);
        },
        handleAppend(data) {
            this.$emit(`on-append`, data);
        },
        handleRemove(data) {
            this.$confirm(`确定要删除该节点吗?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                this.$emit(`on-remove`, data);
            });
        }
    }
};
</script>

<style lang="scss">
    .menu-tree-panel {
        min-height: 10rem;
        padding: .5rem 0;
        margin-top: 1rem;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
        overflow: hidden;
        background-color: #bbb;

        .el-tree-node__content {
            height: 2rem !important;
        }

        .menu-tree-item {
            position: relative;
            display: inline-block;
            width: 100%;
            padding: .5rem .5rem .5rem 2rem;

            .richway-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 2rem;
                height: 2rem;
                font-size: 1rem;
                line-height: 2rem;
                text-align: center;
            }

            .icon-close {
                right: 0;
            }

            .icon-plus {
                right: 2rem;
            }

            .icon-close,
            .icon-plus {
                left: auto;

                &:hover {
                    background-color: rgba(0, 0, 0, .2);
                }
            }
        }
    }
</style>
