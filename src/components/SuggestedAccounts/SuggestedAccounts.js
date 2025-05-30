import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import suggest from '~/services/accountSuggestService';
import following from '~/services/accountFollowingService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, isFollow = false }) {
  const INIT_PAGE = 1;
  const [accounts, setAccounts] = useState([]);
  const [seeMoreBtn, setSeeMoreBtn] = useState(false);
  const [endPage, setEndPage] = useState(5);

  useEffect(() => {
    const fetchApi = async () => {
      let result;
      if (isFollow) {
        result = await following(INIT_PAGE, endPage);
      } else {
        result = await suggest(INIT_PAGE, endPage);
      }
      setAccounts(result);
    };
    fetchApi();
  }, [endPage, isFollow]);

  const handleClickMore = () => {
    setSeeMoreBtn(!seeMoreBtn);
    if (seeMoreBtn) {
      setEndPage(5);
    } else {
      setEndPage(10);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>
      {accounts.map((e) => {
        return (
          <Link to={`/@${e.nickname}`} key={e.id}>
            <AccountItem isFollow={isFollow} {...e} />
          </Link>
        );
      })}

      <p onClick={handleClickMore} className={cx('more-btn')}>
        {seeMoreBtn ? 'Less than' : 'See more'}
      </p>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  isFollow: PropTypes.bool,
};

export default SuggestedAccounts;
