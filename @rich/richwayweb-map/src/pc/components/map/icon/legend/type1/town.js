import img from '../../images/type1/town.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `集镇`,
    className: `legend-town`,
    img
});
