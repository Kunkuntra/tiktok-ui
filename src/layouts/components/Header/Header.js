import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faGlobe,
  faCircleQuestion,
  faKeyboard,
  faUser,
  faGear,
  faCoins,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '~/Contexts/authContext';
import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { ActivityIcon, MessagesIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

// Static menu
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        { code: 'en', title: 'English' },
        { code: 'vi', title: 'Vietnamese' },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const { user, logout, isLoadingUser } = useAuth();
  const navigate = useNavigate();

  if (isLoadingUser) return <Loading />;

  const currentUser = !!user;

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: `/@${user?.nickname || 'user'}`,
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Setting',
      to: '/setting',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
      title: 'Log out',
      separate: true,
    },
  ];

  const handleMenuChange = (menuItem) => {
    if (menuItem.title === 'Log out') {
      logout();
      navigate('/');
    } else if (menuItem.to) {
      navigate(menuItem.to);
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link className={cx('logo')} to={config.routes.root}>
          <img src={images.logo} alt="Logo" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <>
              <Tippy delay={[0, 200]} content="Upload" placement="bottom">
                <button className={cx('action-btn')}>
                  <UploadIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Messages" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessagesIcon />
                </button>
              </Tippy>
              <Tippy delay={[0, 200]} content="Activity" placement="bottom">
                <button className={cx('action-btn', { noticeCount: true })}>
                  <ActivityIcon />
                  <span className={cx('activ-notice')}>
                    <sup className={cx('wrapper-activ-notice')}>
                      <p className={cx('activ-notice-content')}>2</p>
                    </sup>
                  </span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text>Upload</Button>
              <Link to="/login">
                <Button primary>Log in</Button>
              </Link>
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                src={user?.avatar || 'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-cute-2.jpg'}
                className={cx('user-avatar')}
                alt={user?.nickname || 'User'}
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
