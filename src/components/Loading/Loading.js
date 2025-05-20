import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ message = 'Loading...' }) {
  return (
    <div className={cx('loading-wrapper')}>
      <div className={cx('spinner')} />
      <p className={cx('loading-text')}>{message}</p>
    </div>
  );
}

export default Loading;
