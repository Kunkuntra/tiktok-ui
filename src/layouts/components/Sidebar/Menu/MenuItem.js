import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, icon, to }) {
  return (
    <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
      {({ isActive }) => {
        const Icon = isActive ? icon.active : icon.nomal;
        return (
          <>
            <Icon />
            <span className={cx('title-item')}>{title}</span>
          </>
        );
      }}
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default MenuItem;
