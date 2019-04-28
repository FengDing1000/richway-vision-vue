<template>
	<div class="water-chart-table-panel">
		<div class="water-chart-panel">
			<slot name="chart" />
		</div>
		<div
			v-if="value"
			class="water-table-panel">
			<slot name="table" />
		</div>
		<div
			class="toggle"
			@click="handleToggle">{{ toggleTitle }}</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
    // 水库库容关系
    name: `chartTablePanel`,
    props: {
        value: {
            type: Boolean,
            default: false
        },
        showTable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            table: false
        };
    },
    computed: {
        toggleTitle() {
            return this.showTable ? `隐藏表格` : `显示表格`;
        }
    },
    methods: {
        handleToggle() {
            this.$emit(`input`, !this.value);
        }
    }
};
</script>

<style lang="scss" scoped>
		.water-chart-table-panel{
			position: relative;

			.toggle {
				position: absolute;
				bottom: 0;
				right: 0;
				display: inline-block;
				width: 1.6rem;
				padding: .3rem;
				border-radius: 1.2rem;
				text-align: center;
				color: #fff;
				background-color: rgba(0,0,0,.5);
				cursor: pointer;
			}

			.water-chart-panel{
				display: inline-block;
				width: 66%;
				border-right: 1px solid #eee;
			}

			.water-table-panel{
				float: right;
				display: inline-block;
				width: 33%;
			}
		}
</style>
