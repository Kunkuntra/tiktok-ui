// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper-item')}>
      <img
        className={cx('avatar')}
        src="https://ampet.vn/wp-content/uploads/2022/09/Meo-anh-long-ngan-1-1200x1200.jpg"
        alt="avatar"
      />
      <div className={cx('item-info')}>
        <p className={cx('nickname')}>
          <strong>NguyenvanA</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>Nguyễn Văn A</p>
      </div>
    </div>
  );
}

AccountItem.propTypes = {};

export default AccountItem;
