import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);
function Video() {
  return (
    <div className={cx('video-wrapper')}>
      <video className={cx('video')}>
        <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3564-6654a35735e94.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <span className={cx('action-pause')}>
        <FontAwesomeIcon icon={faPlay} />
        <FontAwesomeIcon icon={faPause} />
      </span>
      <span className={cx('action-mute')}>
        <FontAwesomeIcon icon={faVolumeHigh} />
        <FontAwesomeIcon icon={faVolumeXmark} />
      </span>
    </div>
  );
}

export default Video;
