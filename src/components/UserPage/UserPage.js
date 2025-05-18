import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useState } from 'react';
import GridVideos from '../GridVideos';

const cx = classNames.bind(styles);

function UserPage() {
  const VIDEOS = 'videos';
  const LIKED_VIDEOS = 'liked';

  const [location, setLocation] = useState(VIDEOS);

  const handleActiveVideos = () => {
    setLocation(VIDEOS);
  };
  const handleActiveLiked = () => {
    setLocation(LIKED_VIDEOS);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <div className={cx('header')}>
          <Image
            className={cx('avatar')}
            src="https://i.pinimg.com/736x/d6/38/0c/d6380cde0192eb4fd7d25d7cdd63912d.jpg"
            alt=""
          />
          <span className={cx('user-info')}>
            <p className={cx('name')}>gang4clone</p>
            <p className={cx('nickname')}>DuyJKA Thinhk</p>
            <Button primary>Follow</Button>
          </span>
        </div>
        <div className={cx('popularity')}>
          <span className={cx('count')}>26</span>
          <span className={cx('name-type')}>Following</span>
          <span className={cx('count')}>12</span>
          <span className={cx('name-type')}>Follower</span>
          <span className={cx('count')}>17</span>
          <span className={cx('name-type')}>Likes</span>
        </div>
        <div className={cx('description')}>
          ✨ 1998 ✨ Vietnam 🇻🇳 ĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !
        </div>

        <div className={cx('wrapper-videos')}>
          <div className={cx('menu-items')}>
            <p
              onClick={handleActiveVideos}
              className={cx('item-select', {
                active: location === VIDEOS,
              })}
            >
              Videos
            </p>
            <p
              onClick={handleActiveLiked}
              className={cx('item-select', {
                active: location === LIKED_VIDEOS,
              })}
            >
              Liked
            </p>
          </div>
        </div>
      </div>
      <div className={cx('video-user')}>
        <GridVideos />
      </div>
    </div>
  );
}
export default UserPage;
