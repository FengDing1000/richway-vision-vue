import img from '../images/pipeNetwork.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `管网站`,
    className: `legend-pipe-network`,
    img
});
