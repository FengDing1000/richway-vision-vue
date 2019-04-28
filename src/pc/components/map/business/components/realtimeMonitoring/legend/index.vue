<template>
	<div
		v-if="list.length"
		class="legend">
		<LegendPanel
			v-if="showContent"
			:show-close="true"
			:list="list"
			:column="column"
			class="monitoring-legend-panel richway-shadow"
			@on-hide="showContent=false" />
		<div
			v-else
			class="legend-btn"
			@click="showContent=true">
			<i class="richway-icon icon-warn" />
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
import LegendPanel from '@rich/richwayweb-map/src/pc/components/map/icon/legend';

export default {
    name: `Legend`,
    components: {
        LegendPanel
    },
    props: {
        title: {
            type: String,
            default: `图例`
        },
        list: {
            type: Array,
            default: () => []
        },
        column: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            showContent: true
        };
    },
    computed: {
        colColumn() {
            return `col-column-${this.column}`;
        }
    }
};
</script>

<style lang="scss" scoped>
		.legend {
			position: absolute;
			bottom: 1.5rem;
			left: -3rem;
			display: inline-block;
			background: #fff;

			.legend-btn {
				position: relative;
				display: table;
				width: 2.15rem;
				height: 2.15rem;
				border: 1px solid #666;
				border-radius: 3px;
				background: #fff;

				.richway-icon {
					display: table-cell;
					font-size: 1.7rem;
					text-align: center;
					vertical-align: middle;
				}
			}

			.monitoring-legend-panel{
				position: absolute;
				bottom: 0;
				left: -22rem;
			}
		}

</style>
