import * as CallPath from '../utils/httpRequest';

export const likeVideo = async (id) => {
  try {
    const res = await CallPath.post(`videos/${id}/like`, {});

    return res.data;
  } catch (err) {
    return { Error: err.response.status };
  }
};

export const unLikeVideo = async (id) => {
  try {
    const res = await CallPath.post(`videos/${id}/unlike`, {});

    return res.data;
  } catch (err) {
    return { Error: err.response.status };
  }
};
