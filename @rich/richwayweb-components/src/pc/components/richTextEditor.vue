<template>
	<div class="rich-text-editor">
		<script
			id="editor"
			type="text/plain" />
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const { loadAll } = RichWayWebUtils;

export default {
    // 富文本编辑器
    name: `richTextEditor`,
    props: {
        defaultMsg: {
            type: String,
            default: ``
        },
        config: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    },
    computed: {},
    destroyed() {
        this.editor.destroy();
    },
    mounted() {
        this._log(`richTextEditor has mounted`);

        const jsList = [
            `${this.$base.path.nodeStaticResourcesHost}/js/ue/ueditor.config.js`,
            `${this.$base.path.nodeStaticResourcesHost}/js/ue/ueditor.all.min.js`
        ];
        loadAll(jsList, this.init);
    },
    methods: {
        init() {
            // 初始化UE
            this.editor = window.UE.getEditor(`editor`, this.config);
            this.editor.addListener(`ready`, () => {
                // 确保UE加载完成后，放入内容。
                this.editor.setContent(this.defaultMsg);
                this.$emit(`on-load`);
            });
            this.editor.addListener(`contentChange`, () => {
                this.$emit(`on-change`, this.editor.getContent());
            });
        },
        // 获取内容方法
        getUEContent() {
            return this.editor.getContent();
        }
    }
};
</script>

<style lang="scss" scoped>
    .rich-text-editor{
        position: relative;
    }
</style>
