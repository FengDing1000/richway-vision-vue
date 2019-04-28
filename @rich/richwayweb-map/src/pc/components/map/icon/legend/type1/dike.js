import img from '../../images/type1/dike.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `堤防`,
    className: `legend-dike`,
    img
});
