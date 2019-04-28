<template>
	<dcpjImageView :picUrls="picUrls" />
</template>

<script type="text/ecmascript-6">
import dcpjImageView from './dcpjImageView';

export default {
    name: `LjRainPic`,
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
            const adcd = this.detailInfo.ADCD;
            this.picUrls = [`${this.$base.path.imageServiceHost}/pic/pic/${adcd}-3.jpg`];
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
