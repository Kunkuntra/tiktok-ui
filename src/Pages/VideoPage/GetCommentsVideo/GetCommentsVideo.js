import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './GetCommentsVideo.module.scss';
import Image from '~/components/Image';
import comments from '~/services/getCommentsService';
import { useAuth } from '~/Contexts/authContext';
import { likeComment, unLikeComment } from '~/services/commentActions';

const cx = classNames.bind(styles);

function GetCommentsVideo({ id }) {
  const [datas, setDatas] = useState([]);
  const { token } = useAuth();

  console.log('token: ', token);
  useEffect(() => {
    if (!id) return;

    const fetchApi = async () => {
      try {
        const result = await comments(id);
        const safeArray = Array.isArray(result) ? result : Array.isArray(result?.data) ? result.data : [];
        // console.log('safeArray: ', safeArray);
        // console.log('result: ', result);
        // console.log('id: ', id);
        setDatas(safeArray);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        setDatas([]);
      }
    };

    fetchApi();
  }, [id, token]);

  const handleLikeToggle = async (commentId) => {
    if (!token || token === '') {
      alert('Bạn cần đăng nhập để thả tim.');
      return;
    }

    setDatas((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const isLikedNow = !comment.is_liked;
          return {
            ...comment,
            is_liked: isLikedNow,
            likes_count: isLikedNow ? comment.likes_count + 1 : comment.likes_count - 1,
          };
        }
        return comment;
      }),
    );

    try {
      const comment = datas.find((c) => c.id === commentId);
      if (comment?.is_liked) {
        await unLikeComment(commentId, token);
      } else {
        await likeComment(commentId, token);
      }
    } catch (error) {
      console.error('Toggle like failed:', error);
    }
  };

  if (!Array.isArray(datas) || datas.length === 0) return null;

  return (
    <>
      {datas.map((data) => (
        <div key={data.id} className={cx('wrapper')}>
          <Image src={data.user?.avatar} alt="avatar" className={cx('avatar')} />
          <div className={cx('info')}>
            <h4 className={cx('name')}>
              {data.user?.last_name} {data.user?.first_name}
            </h4>
            <p className={cx('content')}>{data.comment}</p>
            <span className={cx('time')}>{data.created_at}</span>
          </div>
          <div className={cx('like')}>
            <p className={cx('icon')} onClick={() => handleLikeToggle(data.id)}>
              <img
                className={cx('icon-icon')}
                src={
                  data.is_liked
                    ? 'https://mytiktok-clone.vercel.app/static/media/heartActive.20192d32174846f50c578c9cf664163c.svg'
                    : 'https://mytiktok-clone.vercel.app/static/media/heartcomment.645f39047c32553efc98ecc8518b938d.svg'
                }
                alt="icon"
              />
            </p>
            <span className={cx('count')}>{data.likes_count}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default GetCommentsVideo;
