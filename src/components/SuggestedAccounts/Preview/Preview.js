import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Preview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Preview({ ...e }) {
  return (
    <div className={cx('preview')}>
      <header className={cx('header-preview')}>
        <img src={e.avatar} alt="" className={cx('avatar-preview')} />
        <Button primary>Follow</Button>
      </header>
      <div className={cx('preview-info')}>
        <p className={cx('nickname')}>
          <strong>{e.nickname}</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>
          {e.first_name} {e.last_name}
        </p>
      </div>
      <div className={cx('achieve')}>
        <p className={cx('achieve-item')}>
          <span className={cx('quantity')}>{e.followers_count}</span>
          <span className={cx('name-achieve')}>Followers</span>
        </p>
        <p className={cx('achieve-item')}>
          <span className={cx('quantity')}>{e.likes_count}</span>
          <span className={cx('name-achieve')}>Likes</span>
        </p>
      </div>
    </div>
  );
}

export default Preview;
