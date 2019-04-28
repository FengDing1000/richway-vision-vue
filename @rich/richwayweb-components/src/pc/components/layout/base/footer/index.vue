<template>
    <p class="copyright">
        <span style="text-align: center;">© 版权所有 |</span>
        <a href="http://www.richwaytec.com">江河瑞通（北京）技术有限公司 |</a>
        <a href="http://www.richwaytec.com">京ICP备17058539号</a>
    </p>
</template>

<script type="text/ecmascript-6">
    export default {
        name: `footer`,
        data() {
            return {};
        }
    };
</script>

<style lang="scss" scoped>
    .copyright {
        height: 1rem;
        padding: .25rem 0;
        margin: 0 1rem;
        font-size: .8rem;
        line-height: 1rem;
        color: #fff;

        > a {
            color: #fff;
        }
    }
</style>
