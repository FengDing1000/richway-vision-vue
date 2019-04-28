import img from '../../images/type1/floodTrace.png';
import template from '../legendTemplate';

export default (o = {}) => template(o, {
    title: `历史洪痕`,
    className: `legend-flood-trace`,
    img
});
