import img from '../images/warehouse.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `仓库`,
    className: `legend-warehouse`,
    img
});
