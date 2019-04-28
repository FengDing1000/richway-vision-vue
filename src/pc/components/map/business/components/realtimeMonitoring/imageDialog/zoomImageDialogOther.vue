<template>
<div class="zoom-image-dialog">
<Dialog :title="123356" @on-hide="handleHide" :config=config>
    1231462
</Dialog>
</div>
</template>

<script>
import Dialog from '../../commonDialog/dialog';
// 合并组件
const components = Object.assign({
    Dialog
});
export default {
    name: 'zoomImageDialog',
    components,
    data: function() {
        return {}
    },
    methods: {
        handleHide(){
            this.$emit(`on-hide`);
        }
    }
}
</script>

<style scoped>

</style>
