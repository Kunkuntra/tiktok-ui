import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GridVideos.module.scss';

const cx = classNames.bind(styles);

function GridVideos({ data }) {
  return (
    <div className={cx('gird')}>
      {data.map((e) => (
        <div key={e.id} className={cx('wrapper')}>
          <Link to={`/video/${e.id}`}>
            <video className={cx('video')} playsInline>
              <source src={e.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Link>
          <p className={cx('name')}>{e.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GridVideos;
