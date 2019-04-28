<template>
	<dcpjImageView :picUrls="picUrls" />
</template>

<script type="text/ecmascript-6">
import dcpjImageView from './dcpjImageView';

export default {
    name: `PictureOther`,
    components: {
        dcpjImageView
    },
    props: {
        detailInfo: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            picUrls: []
        };
    },
    watch: {
        detailInfo: {
            handler() {
                this.query();
            },
            deep: true,
            immediate: false
        }
    },
    mounted() {
        this.query();
    },
    methods: {
        query() {
            // const adcd = this.detailInfo.ADCD;
            // 先写死，关系还需要梳理
            const path = this.$base.path.imageServiceHost;
            this.picUrls = [`${path}/pic/other/5223260010000005e001G.jpg`, `${path}/pic/other/201604300102232930909.jpg`, `${path}/pic/other/52232600000000008810006.jpg`, `${path}/pic/other/52232610320510081000T.jpg`];
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
