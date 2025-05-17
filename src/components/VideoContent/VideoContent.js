import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './VideoContent.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import Video from '~/components/Video';
import { CommentIcon, FavouriteIcon, HeartIcon, ShareIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const VideoContent = forwardRef((props, ref) => {
  const { user, description, file_url, shares_count, comments_count, likes_count } = props;

  return (
    <div className={cx('wrapper')} ref={ref}>
      <header className={cx('header')}>
        <Image className={cx('avatar')} src={user.avatar} alt="" />
        <p className={cx('info')}>
          <span className={cx('info-name')}>
            {user.first_name} {user.last_name}
          </span>
          <span className={cx('desc-video')}>{description}</span>
        </p>
        <Button outline>Follow</Button>
      </header>
      <div className={cx('video-content')}>
        <Video linkvid={file_url} />
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
            <button className={cx('icon')}>
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
