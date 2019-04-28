import * as bType from "../../../../constants/broadcastType";

export default () => {
    const broadcastMapLayersFun = {};
    for (const key in bType) {
        if (Object.hasOwnProperty.call(bType, key)) {
            const broadcastFunName = `${key.replace(`Key`, ``)}Fun`;
            broadcastMapLayersFun[broadcastFunName] = info => {
                window._Subscribe.create(key).trigger(`data`, info);
            };

            const listenFunName = `${key.replace(`BroadcastKey`, ``)}ListenFun`;
            broadcastMapLayersFun[listenFunName] = callback => {
                window._Subscribe.create(key).listen(`data`, callback);
            };
        }
    }
    // return {
    //     created: function () {
    //         this.$mapLayersFun = broadcastMapLayersFun;
    //     }
    // };
    return broadcastMapLayersFun;
};
