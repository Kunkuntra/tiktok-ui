import * as callPath from '../utils/httpRequest';

const getAVideo = async (id) => {
  try {
    const res = await callPath.get(`videos/${id}`);

    return res.data;
  } catch (err) {
    return { errCode: err.response.status };
  }
};

export default getAVideo;
