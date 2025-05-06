import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchService from '~/apiServices/searchServices';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showResultt, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchText, 500);

    const inputRef = useRef();

    const handleClickClear = () => {
        setSearchText('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounce);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounce]);

    return (
        <HeadlessTippy
            interactive
            visible={searchResult.length > 0 && showResultt}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <label className={cx('search-title')}>Accounts</label>
                        {searchResult.map((e) => {
                            return <AccountItem key={e.id} data={e} />;
                        })}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={() => setShowResult(true)}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                />
                {!!searchText && !loading && (
                    <button className={cx('clear-btn')} onClick={handleClickClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
