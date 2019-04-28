<template>
	<div
		:style="{height: imgMaxHeight+'px'}"
		class="image-view">
		<viewer
			:images="picUrls"
			class="viewer-img">
			<img
				v-for="(pic,index) in picUrls"
				:style="{width:picUrls.length > 1 ? '47%' : '95%'}"
				:key="index"
				:src="pic">
		</viewer>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: `DcpjImageView`,
    props: {
        picUrls: {
            type: Array,
            default: () => []
        },
        imgMaxHeight: {
            type: Number,
            default: 500
        }
    },
    data() {
        return {

        };
    }
};
</script>

<style lang="scss" scoped="">
		.image-view{
			width: 100%;
			overflow: auto;
		}

		.viewer-img{
			img {
				height: 480px;
				margin: 10px;
				cursor: pointer;

				&:hover{
					border: 1px solid #eee;
				}
			}
		}
</style>
