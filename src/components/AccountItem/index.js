import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                alt="avatar"
                src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg"
                className={cx('avatar')}
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyễn Văn A</span>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </h4>
                <span className={cx('user-name')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
