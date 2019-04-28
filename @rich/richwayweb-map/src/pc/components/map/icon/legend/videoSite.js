import img from '../images/videoSite.png';
import template from './legendTemplate';

export default (o = {}) => template(o, {
    title: `视频监视站`,
    className: `legend-video-site`,
    img
});
