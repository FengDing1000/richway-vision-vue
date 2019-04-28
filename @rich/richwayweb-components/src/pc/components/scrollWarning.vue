<template>
	<div class="scroll-warnig">
		<div class="scroll-warnig-icon">
			<el-popover
				:width="400 * rem"
				placement="bottom-start"
				popper-class="scroll-warnig-panel"
				trigger="click">
				<div class="scroll-warnig-ontent">
					<ul v-if="warnList.length">
						<li
							v-for="(item, index) of warnList"
							:key="index">
							<p class="time"><b>{{ index+1 }}. {{ item.warnStm }}</b></p>
							<p class="desc">{{ item.warnDesc }}</p>
						</li>
					</ul>
					<p v-else>暂时没有预警信息</p>
				</div>
				<i
					slot="reference"
					class="icon-warn" />
			</el-popover>
		</div>
		<InfiniteRoll :content-list="noticeList" :color="color" :icon="icon" />
	</div>
</template>

<script type="text/ecmascript-6">
import InfiniteRoll from "./banner/infiniteRoll";

const { mapState } = require(`vuex`);

export default {
    name: `scrollWarnig`,
    components: {
        InfiniteRoll
    },
    props: {
        color:{
            type: String,
            default: `#fff`
        },
        icon:{
            type: String,
            default: `icon-radio-check`
        }
    },
    data() {
        return {
            warnList: [],
            noticeList: [],
            setTimeOutId: null
        };
    },
    computed: {
        ...mapState([`rem`])
    },
    mounted() {
        this.publishWarn();
    },
    destroyed() {
        clearTimeout(this.setTimeOutId);
    },
    methods: {
        publishWarn() {
            this.$getData.ScrollWarningMonitor().then(res => {
                this.warnList = res.data.shzhWarn || [];
                for (const item of this.warnList) {
                    this.noticeList.push({
                        id: item.dandId,
                        content: item.warnDesc
                    });
                }
            }).always(() => {
                // 1分钟一次轮询
                this.setTimeOutId = setTimeout(() => {
                    this.publishWarn();
                }, 60 * 1000);
            });
        }
    }
};
</script>

<style lang="scss">
    .scroll-warnig{
        display: flex;
        .scroll-warnig-icon{
            width: 2rem;
            height: 100%;
            margin-left: .5rem;
            .icon-warn{
                display: inline-block;
                width: 2rem;
                height: 2rem;
                line-height: 2rem;
                text-align: center;
                font-size: 1.3rem;
                cursor: pointer;
                &:hover{
                    background-color: rgba(0,0,0,.1);
                }
            }
        }
    }
    .scroll-warnig-panel{
        padding: .3rem !important;
    }
    .scroll-warnig-ontent{
        min-height: 5rem;
        max-height: 20rem;
        overflow-y: auto;
        font-size: .8rem;
        >p{
            padding: 1rem 0;
            text-align: center;
        }
        li{
            padding: .4rem;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            &:last-child{
                border-bottom: none;
            }
            &:hover{
                background-color: rgba(0,0,0,.1);
            }

        }
    }
</style>
