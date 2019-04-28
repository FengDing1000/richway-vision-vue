import img from '../images/sluiceSite.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `闸泵站`,
    className: `legend-sluice-site`,
    img
});
