import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Preview from '~/components/SuggestedAccounts/Preview';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem({ isFollow = false, ...e }) {
  const renderPreview = (attrs) => (
    <div className={cx('')} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        <Preview {...e} />
      </PopperWrapper>
    </div>
  );
  if (isFollow) {
    return (
      <div className={cx('wrapper-item')}>
        <Image className={cx('avatar')} src={e.avatar} alt="avatar" />
        <div className={cx('item-info')}>
          <p className={cx('nickname')}>
            <strong>{e.nickname}</strong>
            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
          </p>
          <p className={cx('name')}>
            {e.first_name} {e.last_name}
          </p>
        </div>
      </div>
    );
  }
  return (
    <span>
      <Tippy placement="bottom-start" interactive delay={[1000, 0]} render={renderPreview}>
        <div className={cx('wrapper-item')}>
          <Image className={cx('avatar')} src={e.avatar} alt="avatar" />
          <div className={cx('item-info')}>
            <p className={cx('nickname')}>
              <strong>{e.nickname}</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </p>
            <p className={cx('name')}>
              {e.first_name} {e.last_name}
            </p>
          </div>
        </div>
      </Tippy>
    </span>
  );
}

AccountItem.propTypes = {
  isFollow: PropTypes.bool,
};

export default AccountItem;
