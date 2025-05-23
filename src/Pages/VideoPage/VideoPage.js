import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './VideoPage.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { CommentIcon, FavouriteIcon, HeartIcon } from '~/components/Icons';
import getAVideo from '~/services/getAVideo';
import { useAuth } from '~/Contexts/authContext';
import { likeVideo, unLikeVideo } from '~/services/likeVideo';
import GetCommentsVideo from './GetCommentsVideo';
import postComment from '~/services/postComment';
import user from '~/services/getUserService';
import { followUser, unFollowUser } from '~/services/follow';

const cx = classNames.bind(styles);

function VideoPage() {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [content, setContent] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const videoRef = useRef();
  const inputRef = useRef();
  const { token } = useAuth();

  const [getVideo, setGetVideo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await getAVideo(id);
        setGetVideo(result);
        setIsLike(result.is_liked);
      } catch (err) {
        console.error('getAVideo error:', err);
      }
    };
    fetchApi();
  }, [id]);

  const handlePause = () => {
    if (isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setIsMute(false);
    }
    setIsPlay(!isPlay);
  };

  const handleMute = () => {
    if (videoRef.current) {
      const newMute = !isMute;
      videoRef.current.muted = newMute;
      setIsMute(newMute);
    }
  };
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
  const handlePostComment = async () => {
    try {
      if (!token || token === '') {
        alert('Bạn cần đăng nhập để thả tim.');
        return navigate('/login');
      }
      await postComment(id, content, token);
      setContent('');
    } catch (error) {
      console.log('comment failed: ', error);
    }
  };

  useEffect(() => {
    if (!token || token === '' || !getVideo || !getVideo.user?.nickname) return;

    const fetchApi = async () => {
      try {
        const result = await user(getVideo.user.nickname, token);
        setIsFollowing(!!result.is_followed);
      } catch (err) {
        console.error('Failed to fetch follow status:', err);
      }
    };

    fetchApi();
  }, [getVideo, token]);
  const handleFollowToggle = async () => {
    if (!token || token === '') {
      alert('Bạn cần đăng nhập để theo dõi.');
      return navigate('/login');
    }

    try {
      if (isFollowing) {
        await unFollowUser(getVideo.user.id, token);
        setIsFollowing(false);
      } else {
        await followUser(getVideo.user.id, token);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Follow/Unfollow failed:', error);
    }
  };

  if (!getVideo) return null;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('wrapper-video')}>
        <div className={cx('video')}>
          <video onClick={handlePause} ref={videoRef} className={cx('video-item')} playsInline>
            <source src={getVideo.file_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span onClick={handleMute} className={cx('action-mute')}>
            {isMute ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
          </span>
        </div>
      </div>
      <div className={cx('wrapper-public')}>
        <div className={cx('video-desc')}>
          <div className={cx('header')}>
            <div className={cx('user-info')}>
              <Image className={cx('user-avatar')} src={getVideo.user.avatar} alt="" />
              <div className={cx('upload-desc')}>
                <p className={cx('user-name')}>
                  {getVideo.user.last_name} {getVideo.user.first_name}
                </p>
                <span className={cx('day-upload')}>{getVideo.published_at}</span>
              </div>
              {isFollowing ? (
                <Button outline onClick={handleFollowToggle}>
                  Followed
                </Button>
              ) : (
                <Button primary onClick={handleFollowToggle}>
                  Follow
                </Button>
              )}
            </div>
            <p className={cx('description')}> {getVideo.description} </p>
            <span className={cx('music')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              Âm thanh trong video!
            </span>
          </div>

          <div className={cx('actions')}>
            <span onClick={handleLikeVD} className={cx('icon-action', { active: isLike })}>
              <HeartIcon height="20px" width="20px" />
            </span>
            <p className={cx('count-action')}>{getVideo.likes_count}</p>
            <span className={cx('icon-action')}>
              <CommentIcon height="20px" width="20px" />
            </span>
            <p className={cx('count-action')}>{getVideo.comments_count}</p>
            <span className={cx('icon-action')}>
              <FavouriteIcon height="20px" width="20px" />
            </span>
            <p className={cx('count-action')}>21</p>
          </div>
        </div>
        <div className={cx('comment')}>
          <div className={cx('comment-display')}>
            <GetCommentsVideo id={getVideo.id} />
          </div>
          <div className={cx('wrap-input')}>
            <input
              ref={inputRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={cx('input')}
            />
            <Button onClick={handlePostComment} small>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
