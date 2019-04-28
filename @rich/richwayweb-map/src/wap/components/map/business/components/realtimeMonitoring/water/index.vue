<template>
    <div class="water-panel">
        <p>这里是water</p>
    </div>
</template>

<script type="text/ecmascript-6">
    const { mapState } = require(`vuex`);

    export default {
        name: `water`,
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
    .water-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
