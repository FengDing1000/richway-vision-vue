<template>
    <div class="header-content">
        <HeaderLogo />
        <HeaderFirstMenu />
        <HeaderRight />
    </div>
</template>

<script type="text/ecmascript-6">
    const { mapState } = require(`vuex`);
    const HeaderLogo = r => require.ensure([], () => r(require(`./headerLogo`)), `components/layout/base`);
    const HeaderFirstMenu = r => require.ensure([], () => r(require(`./headerFirstMenu`)), `components/layout/base`);
    const HeaderRight = r => require.ensure([], () => r(require(`./headerRight`)), `components/layout/base`);

    export default {
        name: `footer`,
        components: {
            HeaderLogo, HeaderFirstMenu, HeaderRight
        },
        data() {
            return {};
        },
        computed: {
            ...mapState([`userInfo`, `settingInfo`])
        },
        methods: {}
    };
</script>

<style lang="scss">

</style>
