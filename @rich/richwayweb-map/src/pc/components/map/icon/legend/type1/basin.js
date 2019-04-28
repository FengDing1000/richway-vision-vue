import img from '../../images/type1/basin.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `小流域`,
    className: `legend-basin`,
    img
});
