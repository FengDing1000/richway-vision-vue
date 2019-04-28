<template>
    <div class="message-notification">
        <el-popover
            :width="400 * rem"
            placement="bottom"
            popper-class="message-notification-panel"
            trigger="click">
            <div class="message-notification-content">
                <ul v-if="tipsData.length">
                    <li
                        v-for="(item, index) in tipsData"
                        :class="[item.state===0?'':'has-ready']"
                        @click="handleClick(item)"
                        :key="index">
                        <div class="tips-type">
							<span
                                :style="{ backgroundColor: item.backgroundColor }"
                                :class="[item.icon, item.type]"
                                class="icon" />
                            <span class="text">{{ item.title }}</span>
                        </div>
                        <div class="tips-info">
                            <p>{{ item.content }}</p>
                            <div class="tips-time">{{ item.time }}</div>
                        </div>
                        <span class="state" v-if="item.state===1">已读</span>
                    </li>
                </ul>
                <p v-else>暂时没有消息通知</p>
            </div>
            <el-badge
                slot="reference"
                :value="nonReadyCount"
                :max="99">
                <i class="el-icon-bell" />
            </el-badge>
        </el-popover>
    </div>
</template>

<script type="text/ecmascript-6">
    const { mapState } = require(`vuex`);

    class MessageNotification{
        constructor(info = {}){
            this.id = info.id || ``;
            this.title = info.title || ``;
            this.type = info.type || 1;
            this.state = info.state || 0;
            this.content = info.content || ``;
            this.time = info.time || info.tm || ``;

            const iocnAndColorInfo = this.getIocnAndColor();
            this.icon = iocnAndColorInfo.icon;
            this.backgroundColor = iocnAndColorInfo.backgroundColor;
        }

        getIocnAndColor() {
            if (this.type === 1) {
                return {
                    icon: `icon-warn`,
                    backgroundColor: `#fbafa3`
                };
            } else if (this.type === 2) {
                return {
                    icon: `icon-email`,
                    backgroundColor: `#4cabeb`
                };
            } else if (this.type === 3) {
                return {
                    icon: `icon-folder`,
                    backgroundColor: `#ffb930`
                };
            }
        }
    }

    export default {
        name: `messageNotification`,
        components: {},
        props: {},
        data() {
            return {
                nonReadyCount: 0,
                dataList: [],
                tipsData: []
            };
        },
        sockets: {
            connect() {
                // 与socket.io连接后回调
                this._log(`socket connect...`);
            },
            disconnect() {
                // 与socket.io断开连接后回调
                this._log(`socket disconnect...`);
            },
            messageNotification(data) {
                this._log(`socket messageNotification...`, data);

                if (data.data.type === `update`) {
                    this.handleSearch();
                } else {
                    this.dataList = data.data || [];
                    this.filterTipsData();
                }
            }
        },
        computed: {
            ...mapState([`rem`])
        },
        mounted() {
            this.$socket.emit(`messageNotification`, {});
        },
        methods: {
            handleSearch() {
                this.$getData.GetMessageNotificationList().then((res = {}) => {
                    this.dataList = res.data || [];
                    this.filterTipsData();
                });
            },
            handleClick(item) {
                item.state = 1;
                this.nonReadyCount--;
                this.$getData.SetMessageNotificationInfo(item);
            },
            filterTipsData() {
                this.nonReadyCount = 0;
                this.tipsData = [];
                for (const item of this.dataList) {
                    const exp = new MessageNotification(item);
                    this.tipsData.push(exp);
                    if (exp.state === 0) {
                        this.nonReadyCount++;
                    }
                }
            }
        }
    };
</script>

<style lang="scss">
    .message-notification{
        .el-icon-bell {
            position: relative;
            top: .2rem;
            font-size: 1.5rem !important;
        }
        .el-badge__content{
            top: 1.4rem;
        }
    }

    .message-notification-panel{
        padding: .3rem;
        .message-notification-content{
            max-height: 30rem;
            overflow-x: hidden;
            overflow-y: auto;
            font-size: .8rem;
            >p{
                padding: 1rem 0;
                text-align: center;
            }
            li {
                position: relative;
                padding: 0 .3rem;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                &:last-child{
                    border-bottom: none;
                }
                &:hover{
                    background-color: rgba(0,0,0,.1);
                }
                .state{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: .3rem;
                    top: .4rem;
                    width: 1.6rem;
                    height: 1.6rem;
                    background-color: #133797;
                    color:#fff;
                    border-radius: 50%;
                    font-size: .6rem;
                }
            }
            .has-ready{
                background-color: rgba(0,0,0,.05);
                .icon {
                    background-color: #fff !important;
                    color: #333 !important;
                }
            }
            .tips-type{
                display: flex;
                align-items: center;
                padding: .4rem 0;
                .icon {
                    width: 1.6rem;
                    height: 1.6rem;
                    line-height: 1.6rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 1rem;
                    color: #fff;
                }

                .text{
                    padding-left: .4rem;
                    font-weight: 600;
                }
            }
            .tips-info{
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                >p {
                    line-height: 1.4;
                }
                .tips-time{
                    padding: .4rem 0;
                    text-align: right;
                }
            }
        }
    }
</style>
