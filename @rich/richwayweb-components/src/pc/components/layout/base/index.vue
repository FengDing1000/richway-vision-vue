<template>
    <Layout>
        <Header slot="header"></Header>
        <Footer slot="footer"></Footer>
    </Layout>
</template>

<script type="text/ecmascript-6">
    const Layout = r => require.ensure([], () => r(require(`../index.vue`)), `components/layout/base`);
    const Header = r => require.ensure([], () => r(require(`./header`)), `components/layout/base`);
    const Footer = r => require.ensure([], () => r(require(`./footer`)), `components/layout/base`);

    export default {
        name: `layoutBase`,
        components: {
            Layout,
            Header,
            Footer
        },
        // Vue 实例的数据对象
        data() {
            return {};
        },
        // 计算属性
        computed: {}
    };
</script>

<style lang="scss">

</style>
