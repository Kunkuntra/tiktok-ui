import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import GridVideos from '../GridVideos';
import user from '~/services/getUserService';
import { useAuth } from '~/Contexts/authContext';
import { followUser, unFollowUser } from '~/services/follow';

const cx = classNames.bind(styles);

function UserPage({ userName }) {
  const navigate = useNavigate();
  const VIDEOS = 'videos';
  const LIKED_VIDEOS = 'liked';

  const { token } = useAuth();
  console.log('token: ', token);

  const [location, setLocation] = useState(VIDEOS);
  const [getUser, setGetUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  console.log('user: ', user);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await user(userName); // token có thể null
      // console.log('token page: ', token);
      console.log('result: ', result);
      setGetUser(result);
      let follow = false;
      if (!!result.is_followed) follow = result.is_followed;
      setIsFollowing(follow);
    };
    fetchApi();
  }, [userName, token]);

  const handleActiveVideos = () => setLocation(VIDEOS);
  const handleActiveLiked = () => setLocation(LIKED_VIDEOS);

  const handleFollowToggle = async () => {
    try {
      if (!token) {
        alert('Bạn cần đăng nhập để theo dõi.');
        return navigate('/login');
      }

      if (isFollowing) {
        await unFollowUser(getUser.id, token);
        setIsFollowing(false);
        setGetUser((prev) => ({
          ...prev,
          followers_count: prev.followers_count - 1,
        }));
      } else {
        await followUser(getUser.id, token);
        setIsFollowing(true);
        setGetUser((prev) => ({
          ...prev,
          followers_count: prev.followers_count + 1,
        }));
      }
    } catch (error) {
      console.error('Follow/Unfollow failed:', error);
    }
  };

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
            <span onClick={handleFollowToggle}>
              {isFollowing ? <Button outline>Followed</Button> : <Button primary>Follow</Button>}
            </span>
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
