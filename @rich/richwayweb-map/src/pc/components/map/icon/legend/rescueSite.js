import img from '../images/rescueSite.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `救援力量`,
    className: `legend-rescue-site`,
    img
});
