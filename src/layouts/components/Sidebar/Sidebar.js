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

const cx = classNames.bind(styles);

function Sidebar() {
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
    </aside>
  );
}

export default Sidebar;
