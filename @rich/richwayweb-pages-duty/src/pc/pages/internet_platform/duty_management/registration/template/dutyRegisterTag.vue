<template>
	<div>
		<div
			v-for="item in dutyRegisterTagInfo"
			:key="item"
			class="tag">
			<diV class="elTagDivOne">
				<span>{{ item.crtBy }}</span>
				<span class="lastChild">{{ item.recordTime }}</span>
				<i
					v-if="closable"
					class="el-icon-close"
					@click="handleDelete(item.id)" />
			</diV>
			<div class="elTagDivTwo">{{ item.content }}</div>
			<div
				v-if="item.fileCd!==''"
				class="elTagDivThree"
				@click="handleDownload(item.fileCd)">下载<i class="el-icon-download" /></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from "@rich/richwayweb-utils";

const { downloadFile } = RichWayWebUtils;
export default {
    name: `DutyRegisterTag`,
    props: {
        dutyRegisterTagInfo: {
            type: Object,
            default: () => {
            }
        },
        closable: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: `info`
        }
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {

    },
    methods: {
        handleDelete(tag) {
            this.$confirm(`确定删除此记录?`, `提示`, {
                confirmButtonText: `确定`,
                cancelButtonText: `取消`,
                type: `warning`
            }).then(() => {
                this.$getData.DeleteDutyRecord({ id: tag }).then(() => {
                    this.$emit(`delete-success`, true);
                }).catch(err => {
                    this.$emit(`on-failed`, err);
                });
            }).catch(() => {
                this.$message({
                    type: `info`,
                    message: `已取消删除`
                });
            });
        },
        // 下载
        handleDownload(fileCd) {
            downloadFile(`${this.$base.path.nodeServiceHost}/downLoad?url=/base/api/file/downFile/${fileCd}`);
        }
    }
};
</script>

<style lang="scss">
		// 标签的样式1
		.tag {
			position: relative !important;
			width: 100%;
			padding: .4rem;
			margin-bottom: .5rem;
			border: 1px solid rgba(144, 147, 153, .2);
			border-radius: .4rem;
			overflow: hidden;

			.elTagDivOne {
				width: 100%;
				height: 1.5rem;
				border-bottom: 1px solid rgba(144, 147, 153, .2);

				.lastChild {
					margin-left: 1.5rem;
					font-size: .6rem;
					color: #777;
				}
			}

			.elTagDivTwo {
				width: 100%;
				height: 3rem;
				overflow: auto;
			}

			.elTagDivThree {
				position: absolute !important;
				bottom: .5rem;
				right: .5rem;
				height: 1rem;
				cursor: pointer;
			}

			.el-icon-close {
				position: absolute !important;
				top: .1rem !important;
				right: .2rem !important;
				width: 1rem !important;
				height: 1rem !important;
				font-size: 1rem;
				color: #777;
			}
		}
</style>
