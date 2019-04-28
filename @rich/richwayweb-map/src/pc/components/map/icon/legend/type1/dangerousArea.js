import img from '../../images/type1/dangerousArea.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `危险区`,
    className: `legend-dangerous-area`,
    img
});
