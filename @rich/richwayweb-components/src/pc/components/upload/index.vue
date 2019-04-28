<template>
	<div class="upload-content">
		<el-upload
			ref="upload"
			:action="action"
			:data="actionData"
			:limit="limit"
			:auto-upload="autoUpload"
			:on-remove="handleRemove"
			:on-success="handleSuccess"
			:on-error="handleError"
			:on-exceed="handleExceed"
			class="upload-demo"
			drag>
			<i class="el-icon-upload" />
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div
				slot="tip"
				class="el-upload__tip">"{{ tips }}</div>
		</el-upload>
		<el-button
			class="richway-right upload-btn"
			size="small"
			type="success"
			@click="handleSubmit">{{ btnName }}</el-button>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `upLoad`,
    props: {
        autoUpload: {
            type: Boolean,
            default: false
        },
        tips: {
            type: String,
            default: `只能上传xls/xlsx文件，且不超过500kb，最多只能选择1个文件`
        },
        btnName: {
            type: String,
            default: `上传到服务器`
        },
        url: {
            type: String,
            default: ``
        },
        parameterInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            action: `/api/base/upLoad`,
            limit: 5
        };
    },
    computed: {
        actionData() {
            return Object.assign({
                url: this.url || ``
            }, this.parameterInfo);
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            this._log(file, fileList);
        },
        handleSuccess(response, file, fileList) {
            this._log(response, file, fileList);
            let count = 0;
            for (const item of fileList) {
                if ((item.response || {}).success === true) {
                    count++;
                }
            }
            if (count === fileList.length) {
                this.$refs.upload.clearFiles();
                const data = response.data || {};
                const mainfile = `.${data.fileExt}|${data.fileSize}|${data.fileUrl}|用户信息表.xls`;
                this.$emit(`on-load-success`, Object.assign({}, this.parameterInfo, {
                    main: `on`,
                    mainfile
                }));
            } else {
                this.$message({
                    showClose: true,
                    message: `文件上传失败！`,
                    type: `error`
                });
                this.$emit(`on-load-fail`);
            }
        },
        handleError() {
            this.$message({
                showClose: true,
                message: `文件上传失败！`,
                type: `error`
            });
        },
        handleExceed(files, fileList) {
            this.$message({
                showClose: true,
                message: `最多只能选择5个文件`,
                type: `warning`
            });
            this._log(files, fileList);
        }
    }
};
</script>

<style lang="scss" scoped>
    .upload-content {
        margin-bottom: 2.5rem;

        .upload-btn {
            margin-top: 1rem;
        }
    }
</style>
