import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Preview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Preview() {
  return (
    <div className={cx('preview')}>
      <header className={cx('header-preview')}>
        <img
          src="https://ampet.vn/wp-content/uploads/2022/09/Meo-anh-long-ngan-1-1200x1200.jpg"
          alt=""
          className={cx('avatar-preview')}
        />
        <Button primary>Follow</Button>
      </header>
      <div className={cx('preview-info')}>
        <p className={cx('nickname')}>
          <strong>NguyenvanA</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Nguyễn Văn A</p>
      </div>
      <div className={cx('achieve')}>
        <p className={cx('achieve-item')}>
          <span className={cx('quantity')}>6.7M</span>
          <span className={cx('name-achieve')}>Followers</span>
        </p>
        <p className={cx('achieve-item')}>
          <span className={cx('quantity')}>429.9M</span>
          <span className={cx('name-achieve')}>Likes</span>
        </p>
      </div>
    </div>
  );
}

export default Preview;
