import img from '../images/fireHydrant.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `消防栓`,
    className: `legend-fire-hydrant`,
    img
});
