import img from '../images/chemicalPlant.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `化工厂`,
    className: `legend-chemical-plant`,
    img
});
