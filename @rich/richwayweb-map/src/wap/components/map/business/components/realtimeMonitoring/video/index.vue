<template>
    <div class="video-panel">
        <p>这里是video</p>
    </div>
</template>

<script type="text/ecmascript-6">
    const { mapState } = require(`vuex`);

    export default {
        name: `video`,
        components: {},
        props: {
            map: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {};
        },
        computed: {
            ...mapState([`rem`])
        }
    };
</script>

<style lang="scss">
    .video-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
