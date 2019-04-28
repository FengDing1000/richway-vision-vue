<template>
	<dcpjImageView :picUrls="picUrls" />
</template>

<script type="text/ecmascript-6">
import dcpjImageView from './dcpjImageView';

export default {
    name: `ZqRelPic`,
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
            this.picUrls = [`${this.$base.path.imageServiceHost}/pic/person/001.jpg`];
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
