import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Video from '~/components/Video';
import { CommentIcon, FavouriteIcon, HeartIcon, ShareIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoContent() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <Image
          className={cx('avatar')}
          src="https://tse2.mm.bing.net/th?id=OIP.5X5mJHdAdVpngropYGuKVQHaHa&pid=Api&P=0&h=220"
          alt=""
        />
        <p className={cx('info')}>
          <span className={cx('info-name')}>Nguyen Van A</span>
          <span className={cx('desc-video')}>adu</span>
        </p>
        <Button outline>Follow</Button>
      </header>
      <div className={cx('video-content')}>
        <Video />
        <div className={cx('list-actions')}>
          <span className={cx('item-action')}>
            <button className={cx('icon')}>
              <ShareIcon />
            </button>
            <p className={cx('count')}>19</p>
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
            <p className={cx('count')}>20</p>
          </span>
          <span className={cx('item-action')}>
            <button className={cx('icon')}>
              <HeartIcon />
            </button>
            <p className={cx('count')}>20</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
