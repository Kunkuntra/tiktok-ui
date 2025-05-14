import { memo } from 'react';
import AccountItem from '~/components/AccountItem';

function ListSearchs({ data, clearSearch }) {
  return data.map((e) => {
    return <AccountItem key={e.id} data={e} onClick={clearSearch} />;
  });
}

export default memo(ListSearchs);
