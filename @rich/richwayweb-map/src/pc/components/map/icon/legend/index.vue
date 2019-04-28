<template>
	<div
		class="legend-panel">
		<div class="legend-header">
			<span>{{ title }}</span>
			<i
				v-if="showClose"
				class="richway-icon icon-down-arrow toggle-btn"
				@click="handleHide" />
		</div>
		<div
			:class="[colColumn, type]"
			class="legend-content">
			<ul
				v-if="list.length"
				class="richway-clear">
				<li
					v-for="(item, index) in list"
					:key="index"
					:class="[item.visibility ? 'active' : '']"
					@click="changeLegend(item)">
					<span
						:class="[item.icon.className]"
						class="legend-icon"
						v-html="item.icon.legend || item.icon.html" />
					<span class="legend-title richway-elip">{{ item.icon.title }}</span>
				</li>
			</ul>
			<p v-else>暂时没有图例</p>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
export default {
    name: `Legend`,
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
        },
        showClose: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: `transverse`
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
    },
    methods: {
        handleHide() {
            this.$emit(`on-hide`);
        },
        changeLegend(item = {}) {
            this.$emit(`on-click`, item);
        }
    }
};
</script>

<style lang="scss">
    .legend-panel {
        user-select: none;
        display: inline-block;
        background: #fff;

        .legend-header {
            padding: .3rem .6rem;

            .toggle-btn {
                float: right;
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
                line-height: 1.2rem;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background: rgba(0, 0, 0, .1);
                }
            }
        }

        .legend-content {
            > p {
                padding: .5rem 0 1rem;
                text-align: center;
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                padding: .3rem;

                li {
                    float: left;
                    margin: .2rem 0;
                    display: flex;
                    opacity: .5;
                    align-items: center;
                    cursor: pointer;
                    .legend-icon {
                        width: 2rem;
                        text-align: center;
                        margin-right: .2rem;
                    }
                    &:hover {
                        background-color: rgba(0, 0, 0, .1);
                    }
                }

                .active {
                    opacity: 1;
                }
            }

            .map-marker-panel:after{
                display: none;
            }
        }

        .col-column-3 {
            width: 15.6rem;

            li {
                width: 33.3%;
            }
        }

        .col-column-4 {
            width: 23.7rem;

            li {
                width: 25%;
            }
        }

        .vertical{
            width: 10rem !important;
            li {
                width: 100% !important;
            }
        }

        .taxonomy-2 {
            width: 15rem !important;

            li {
                width: 50% !important;
            }

            .legend-icon{
                width: 1rem !important;
                height: 1rem;
            }
            .map-marker-icon{
                font-size: .8rem !important;
            }
        }
    }
</style>
