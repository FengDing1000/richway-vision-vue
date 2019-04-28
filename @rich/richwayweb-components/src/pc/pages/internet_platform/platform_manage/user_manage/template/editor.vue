<template>
	<div class="editor-content">
		<div class="editor-container">
			<RichTextEditor
				ref="ue"
				:defaultMsg="defaultMsg"
				:config="config" />
		</div>
		<div class="editor-footer richway-right">
			<el-button
				type="primary"
				round
				@click="getUEContent()">保存</el-button>
			<el-button
				round
				@click="$router.back()">返回</el-button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import RichTextEditor from '../../../../../components/richTextEditor';

export default {
    components: {
        // BuildPanel,
        RichTextEditor
    },
    data() {
        return {
            defaultMsg: `这里是UE测试`,
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            }
        };
    },
    computed: {},
    mounted() {
        this._log(`county_country_information has mounted`);
    },
    methods: {
        getUEContent() {
            const content = this.$refs.ue.getUEContent();
            this.$notify({
                title: `获取成功，可在控制台查看！`,
                message: content,
                type: `success`
            });
            console.log(content);
        }
    }
};
</script>

<style lang="scss" scoped>
    .editor-content{
        position: absolute;
        top: .5rem;
        left: 1.2rem;
        right: 1.2rem;
        bottom: 1rem;
        background-color: #f2f7fa;
        z-index: 9;

        .editor-container{
            min-height: 3rem;
            margin-bottom: 1rem;
            background-color: #fff;
        }
        .editor-footer{

        }
    }
</style>
