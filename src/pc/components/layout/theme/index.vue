<template>
    <Layout>
        <Header slot="header"></Header>
        <Footer slot="footer"></Footer>
    </Layout>
</template>

<script type="text/ecmascript-6">
    import RichWayWebComponents from '@rich/richwayweb-components';
    const Header = r => require.ensure([], () => r(require(`./header`)), `components/layout/theme`);
    const Footer = r => require.ensure([], () => r(require(`./footer`)), `components/layout/theme`);
    const { Layout } = RichWayWebComponents;

    export default {
        name: `layoutBase`,
        components: {
            Layout,
            Header,
            Footer
        },
        data() {
            return {};
        },
        // 计算属性
        computed: {}
    };
</script>

<style lang="scss">

</style>
