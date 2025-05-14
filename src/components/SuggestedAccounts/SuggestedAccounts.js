import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import suggest from '~/services/accountSuggestService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, isFollow = false }) {
  const INIT_PAGE = 1;
  const [accounts, setAccounts] = useState([]);
  const [seeMoreBtn, setSeeMoreBtn] = useState(false);
  const [endPage, setEndPage] = useState(5);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await suggest(INIT_PAGE, endPage);
      setAccounts(result);
    };
    fetchApi();
  }, [endPage]);

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
      {accounts.map((e) => (
        <AccountItem key={e.id} isFollow={isFollow} {...e} />
      ))}

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
