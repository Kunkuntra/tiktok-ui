import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Video from '~/components/Video';
import { CommentIcon, FavouriteIcon, HeartIcon, ShareIcon } from '~/components/Icons';
import { useAuth } from '~/Contexts/authContext';
import { followUser, unFollowUser } from '~/services/follow';
// import { getUser } from '~/services/getUserService';
import { likeVideo, unLikeVideo } from '~/services/likeVideo';
import getAVideo from '~/services/getAVideo';

const cx = classNames.bind(styles);

const VideoContent = forwardRef((props, ref) => {
  const { id, user, description, file_url, shares_count, comments_count, likes_count } = props;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();
  // console.log('token: ', token);
  // console.log('user nickname: ', props.user.nickname);

  const handleFollowToggle = async () => {
    try {
      if (!token || token === '') {
        alert('Bạn cần đăng nhập để theo dõi.');
        return navigate('/login');
      }

      if (isFollowing) {
        await unFollowUser(user.id, token);
        setIsFollowing(false);
      } else {
        await followUser(user.id, token);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow/Unfollow failed:', error);
    }
  };

  // useEffect(() => {
  //   if (!user?.nickname) return;

  //   const fetchApi = async () => {
  //     console.log('user : ', user.nickname);
  //     const result = await getUser(user.nickname);
  //     console.log('result: ', result);
  //     // setIsFollowing(result.is_followed);
  //   };
  //   fetchApi();
  // }, [user.nickname]);

  useEffect(() => {
    if (!id) return;
    const fetApi = async () => {
      const result = await getAVideo(id);
      const like = result.is_liked;
      // console.log('result: ', result);
      setIsLike(like);
    };
    fetApi();
  }, [id]);

  const handleLikeVD = async () => {
    try {
      if (!token || token === '') {
        alert('Bạn cần đăng nhập để thả tim.');
        return navigate('/login');
      }
      if (isLike) {
        await unLikeVideo(id, token);
        setIsLike(false);
      } else {
        await likeVideo(id, token);
        setIsLike(true);
      }
    } catch (error) {
      console.log('Like/Unlike failed: ', error);
    }
  };

  return (
    <div className={cx('wrapper')} ref={ref}>
      <header className={cx('header')}>
        <Image className={cx('avatar')} src={user.avatar} alt="" />
        <p className={cx('info')}>
          <Link to={`/@${user.nickname}`} className={cx('info-name')}>
            {user.first_name} {user.last_name}
          </Link>
          <span className={cx('desc-video')}>{description}</span>
        </p>
        <span onClick={handleFollowToggle}>
          {isFollowing ? <Button outline>Followed</Button> : <Button outline>Follow</Button>}
        </span>
      </header>
      <div className={cx('video-content')}>
        <Video idVideo={id} linkvid={file_url} />
        <div className={cx('list-actions')}>
          <span className={cx('item-action')}>
            <button className={cx('icon')}>
              <ShareIcon />
            </button>
            <p className={cx('count')}>{shares_count}</p>
          </span>
          <span className={cx('item-action')}>
            <button className={cx('icon')}>
              <FavouriteIcon />
            </button>
            <p className={cx('count')}>20</p>
          </span>
          <span className={cx('item-action')}>
            <button className={cx('icon')}>
              <CommentIcon />
            </button>
            <p className={cx('count')}>{comments_count}</p>
          </span>
          <span className={cx('item-action')}>
            <button onClick={handleLikeVD} className={cx('icon', { active: isLike })}>
              <HeartIcon />
            </button>
            <p className={cx('count')}>{likes_count}</p>
          </span>
        </div>
      </div>
    </div>
  );
});

export default VideoContent;
