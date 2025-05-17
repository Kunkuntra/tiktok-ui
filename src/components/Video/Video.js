import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ linkvid }) {
  const [isPlay, setIsPlay] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const videoRef = useRef();

  const handlePause = () => {
    if (isPlay) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
          setIsPlay(true);
        } else {
          video.pause();
          setIsPlay(false);
        }
      },
      {
        threshold: 0.75,
      },
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return (
    <div className={cx('video-wrapper')}>
      <video ref={videoRef} className={cx('video')} playsInline>
        <source src={linkvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <span onClick={handlePause} className={cx('action-pause')}>
        {isPlay ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
      </span>
      <span onClick={handleMute} className={cx('action-mute')}>
        {isMute ? <FontAwesomeIcon icon={faVolumeXmark} /> : <FontAwesomeIcon icon={faVolumeHigh} />}
      </span>
    </div>
  );
}

export default Video;
