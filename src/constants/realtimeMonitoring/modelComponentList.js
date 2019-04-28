const modelComponentList = [{
        id: `BusinessModelCompare`,
        modelList: [`viw_model_compare`],
        componentName: `Map-Business-Model-Compare`,
        config: {
            title: `综合监视`
        },
        active: true
    },
    {
        id: `BusinessModelGaugelen`,
        modelList: [`viw_water_gauge`],
        componentName: `Map-Business-Model-Gaugelen`,
        config: {
            title: `水尺详情信息`
        }
    },
    {
        id: `BusinessModelSluicegauge`,
        modelList: [`viw_sluice_gauge`],
        componentName: `Map-Business-Model-Sluicegauge`,
        config: {
            title: `水闸详情信息`
        },
        active: true
    },
    {
        id: `BusinessModelWaterarea`,
        modelList: [`viw_water_seg`,`viw_water_area`],
        componentName: `Map-Business-Model-Waterarea`,
        config: {
            title: `水域详情信息`
        }
    }
]
export default modelComponentList;
