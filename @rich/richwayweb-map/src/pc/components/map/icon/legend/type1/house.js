import img from '../../images/type1/house.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `房屋`,
    className: `legend-house`,
    img
});
