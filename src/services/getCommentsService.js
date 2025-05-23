import * as callPath from '../utils/httpRequest';

const comments = async (id) => {
  try {
    const res = await callPath.get(`videos/${id}/comments`);
    return res.data;
  } catch (err) {
    return { errorCode: err.response.status };
  }
};

export default comments;
