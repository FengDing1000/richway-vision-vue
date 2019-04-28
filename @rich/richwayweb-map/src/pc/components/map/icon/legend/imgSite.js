import img from '../images/imgSite.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `图像站`,
    className: `legend-img-site`,
    img
});
