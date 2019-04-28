<template>
    <div class="weather-panel">
        <p>这里是weather</p>
    </div>
</template>

<script type="text/ecmascript-6">
    const { mapState } = require(`vuex`);

    export default {
        name: `weather`,
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
    .weather-panel {
        >p{
            text-align: center;
            padding: .5rem;
        }
    }

</style>
