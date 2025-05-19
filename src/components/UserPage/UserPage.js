import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useLayoutEffect, useState } from 'react';
import GridVideos from '../GridVideos';
import user from '~/services/getUserService';

const cx = classNames.bind(styles);

function UserPage({ userName }) {
  const VIDEOS = 'videos';
  const LIKED_VIDEOS = 'liked';

  const [location, setLocation] = useState(VIDEOS);
  const [getUser, setGetUser] = useState(null);

  useLayoutEffect(() => {
    const fetchApi = async () => {
      const result = await user(userName);
      setGetUser(result);
    };
    fetchApi();
  }, [userName]);

  const handleActiveVideos = () => setLocation(VIDEOS);
  const handleActiveLiked = () => setLocation(LIKED_VIDEOS);

  if (!getUser) return null;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <div className={cx('header')}>
          <Image className={cx('avatar')} src={getUser.avatar} alt="" />
          <span className={cx('user-info')}>
            <p className={cx('name')}>
              {getUser.last_name} {getUser.first_name}
            </p>
            <p className={cx('nickname')}>{getUser.nickname}</p>
            <Button primary>Follow</Button>
          </span>
        </div>
        <div className={cx('popularity')}>
          <span className={cx('count')}>{getUser.followings_count}</span>
          <span className={cx('name-type')}>Followings</span>
          <span className={cx('count')}>{getUser.followers_count}</span>
          <span className={cx('name-type')}>Followers</span>
          <span className={cx('count')}>{getUser.likes_count}</span>
          <span className={cx('name-type')}>Likes</span>
        </div>
        <div className={cx('description')}>{getUser.bio}</div>

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
        <GridVideos data={getUser.videos} />
      </div>
    </div>
  );
}

export default UserPage;
