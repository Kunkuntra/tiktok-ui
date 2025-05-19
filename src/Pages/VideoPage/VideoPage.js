import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './VideoPage.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { CommentIcon, FavouriteIcon, HeartIcon } from '~/components/Icons';
import getAVideo from '~/services/getAVideo';

const cx = classNames.bind(styles);

function VideoPage() {
  const { id } = useParams();
  console.log(id);

  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const videoRef = useRef();

  const [getVideo, setGetVideo] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAVideo(id);
      // console.log(result);
      setGetVideo(result);
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
              <Button primary>Follow</Button>
            </div>
            <p className={cx('description')}> {getVideo.description} </p>
            <span className={cx('music')}>
              <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
              Âm thanh trong video!
            </span>
          </div>

          <div className={cx('actions')}>
            <span className={cx('icon-action')}>
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
          <div className={cx('comment-display')}></div>
          <div className={cx('wrap-input')}>
            <input className={cx('input')}></input>
            <Button small>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
