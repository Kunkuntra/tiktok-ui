import * as callPath from '~/utils/httpRequest';

const videos = async (type, page /**token */) => {
  try {
    const res = await callPath.get('/videos', {
      params: {
        type,
        page,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default videos;
