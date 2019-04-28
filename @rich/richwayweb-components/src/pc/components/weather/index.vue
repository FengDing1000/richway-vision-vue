<template>
	<div class="date-weather-temperature">
		<span class="date">{{ date }}</span>
		<template v-if="!loading">
			<span class="city">{{ cityName }}</span>
			<span class="weather">{{ weather }}</span>
			<span class="temperature">{{ temperature }}<em>℃</em></span>
		</template>
	</div>
</template>

<script type="text/ecmascript-6">
import RichWayWebUtils from '@rich/richwayweb-utils';

const { jsLoad } = RichWayWebUtils;
const { mapState } = require(`vuex`);
const moment = require(`moment`);

// const AMap = require(`AMap`);
// const { AMap } = window;

export default {
    // 客户端所在地理位置的天气信息
    name: `weather`,
    props: {},
    data() {
        return {
            loading: false,
            cityName: ``,
            weather: ``,
            temperature: ``
        };
    },
    computed: {
        ...mapState([`userInfo`]),
        date() {
            let sWeek = moment().format(`dddd`);
            switch (sWeek) {
            case `Monday`: sWeek = `星期一`;
                break;
            case `Tuesday`: sWeek = `星期二`;
                break;
            case `Wednesday`: sWeek = `星期三`;
                break;
            case `Thursday`: sWeek = `星期四`;
                break;
            case `Friday`: sWeek = `星期五`;
                break;
            case `Saturday`: sWeek = `星期六`;
                break;
            case `Sunday`: sWeek = `星期日`;
                break;
            default:
                break;
            }
            return `${moment().format(`YYYY-MM-DD`)} ${sWeek}`;
        }
    },
    mounted() {
        this.jsCount = 0;
        this.locationInit();
    },
    methods: {
        locationInit() {
            this.loading = true;
            const _this = this;
            jsLoad(`https://webapi.amap.com/maps?v=1.4.0&key=c6d28420660bbb9beb5baee36e9add27`, ()=>{
                function weather(city = `北京市`) {
                    AMap.service(`AMap.Weather`, () => {
                        const weather = new AMap.Weather();
                        weather.getLive(city, (err, data) => {
                            // 定位城市
                            _this.cityName = data.city;
                            // 天气
                            _this.weather = data.weather;
                            // 温度
                            _this.temperature = data.temperature;
                            _this.loading = false;
                        });
                    });
                }

                // 解析定位结果成功时的回掉函数
                function onComplete(data) {
                    _this._log(`定位成功：`, data);
                    if (data) {
                        // 此时获取城市信息成功获取天气
                        weather((data.addressComponent || {}).city);
                    }
                }

                // 解析定位失败时的回掉函数
                function onError(data) {
                    _this._log(`定位异常:`, data.message);
                    // 定位异常 定位异常默认北京市
                    weather();
                }

                // 加载地图，调用浏览器定位服务
                const map = new AMap.Map(`container`, {
                    resizeEnable: true
                });
                map.plugin(`AMap.Geolocation`, () => {
                    const geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                        timeout: 100000, // 超过100秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        buttonPosition: `RB`
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, `complete`, onComplete);// 返回定位信息
                    AMap.event.addListener(geolocation, `error`, onError); // 返回定位出错信息
                });
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .date-weather-temperature {
        height: 100%;
        display: flex;
        align-items: center;
        > span {
            padding-right: 1rem;
        }
    }
</style>
