import classNames from 'classnames/bind';
import styles from './GridVideos.module.scss';

const cx = classNames.bind(styles);

function GridVideos() {
  return (
    <div className={cx('gird')}>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
      <div className={cx('wrapper')}>
        <video className={cx('video')} playsInline>
          <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/3562-6652e6ba09ff6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className={cx('name')}>Video 1</p>
      </div>
    </div>
  );
}

export default GridVideos;
