import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `水电站`,
    className: `legend-hydropower-station`,
    fonts: `richway-icon icon-power-station`
});
