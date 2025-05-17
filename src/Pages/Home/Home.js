import { useEffect, useState, useRef } from 'react';
import VideoContent from '~/components/VideoContent';
import videos from '~/services/listVideos';

function Home() {
  const [page, setPage] = useState(1);
  const [listVideos, setListVideos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchApi = async () => {
      setIsFetching(true);
      const result = await videos('for-you', page);
      if (result.length === 0) {
        setHasMore(false); // Không còn dữ liệu nữa
      } else {
        setListVideos((prev) => [...prev, ...result]);
      }
      setIsFetching(false);
    };

    if (hasMore) {
      fetchApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching && hasMore) {
          console.log('run load page');
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5, // Tăng độ nhạy
      },
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [isFetching, hasMore, listVideos]);

  return (
    <>
      {listVideos.map((e, index) => (
        <VideoContent key={index} {...e} />
      ))}

      {hasMore && <div ref={loadMoreRef} style={{ height: '40px', background: 'transparent' }} />}
    </>
  );
}

export default Home;
