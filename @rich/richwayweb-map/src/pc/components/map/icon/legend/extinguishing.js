import img from '../images/extinguishing.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `灭火药剂`,
    className: `legend-extinguishing`,
    img
});
