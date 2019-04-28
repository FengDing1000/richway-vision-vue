import img from '../images/gasSite.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `加油站`,
    className: `legend-gas-site`,
    img
});
