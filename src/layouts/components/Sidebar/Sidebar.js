import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Menu, MenuItem } from './Menu';
import config from '~/config';
import {
  FollowingIcon,
  FollowingIconActive,
  HomeIcon,
  HomeIconActive,
  LiveIcon,
  LiveIconActive,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Sidebar() {
  const currentUser = true;
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You" icon={{ nomal: HomeIcon, active: HomeIconActive }} to={config.routes.root} />
        <MenuItem
          title="Following"
          icon={{ nomal: FollowingIcon, active: FollowingIconActive }}
          to={config.routes.following}
        />
        <MenuItem title="LIVE" icon={{ nomal: LiveIcon, active: LiveIconActive }} to={config.routes.live} />
      </Menu>
      {currentUser ? (
        <>
          <SuggestedAccounts label="Suggested Account" />
          <SuggestedAccounts label="Following Account" isFollow />
        </>
      ) : (
        <div className={cx('suggested-login')}>
          <h4 className={cx('title-login')}>Đăng nhập để follow các tác giả, thích và xem các bình luận</h4>
          <Button full large outline>
            Log in
          </Button>
        </div>
      )}
      <div className={cx('footer-sidebar')}>
        <p className={cx('footer-line')}>
          <span className={cx('footer-element')}>About</span>
          <span className={cx('footer-element')}>Newsroom</span>
          <span className={cx('footer-element')}>Contact</span>
          <span className={cx('footer-element')}>Careers</span>
        </p>
        <p className={cx('footer-line')}>
          <span className={cx('footer-element')}>Tiktok for good</span>
          <span className={cx('footer-element')}>Advertise</span>
          <span className={cx('footer-element')}>Developer</span>
          <span className={cx('footer-element')}>Transparency</span>
          <span className={cx('footer-element')}>Tiktok rewards</span>
          <span className={cx('footer-element')}>Tiktok embeds</span>
        </p>
        <p className={cx('footer-line')}>
          <span className={cx('footer-element')}>Help</span>
          <span className={cx('footer-element')}>Safety</span>
          <span className={cx('footer-element')}>Terms</span>
          <span className={cx('footer-element')}>Privacy</span>
          <span className={cx('footer-element')}>Creator potal</span>
          <span className={cx('footer-element')}>Community</span>
          <span className={cx('footer-element')}>Guidelines</span>
        </p>
        <p className={cx('footer-line')}>
          <span className={cx('footer-element')}>See more</span>
        </p>
        <p className={cx('footer-line')}>
          <span className={cx('footer-element')}>2025 Tiktok</span>
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
