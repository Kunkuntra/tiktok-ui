import * as CallPath from '../utils/httpRequest';

const postComment = async (id, comment) => {
  try {
    const res = await CallPath.post(
      `videos/${id}/comments`,
      {
        comment,
      },
      {
        params: {},
      },
    );

    return res.data;
  } catch (err) {
    return { Error: err.response.status };
  }
};

export default postComment;
