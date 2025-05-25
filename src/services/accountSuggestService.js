import * as callPath from '../utils/httpRequest';

const suggest = async (numPage, perPage) => {
  try {
    // const res = await callPath.get(`/users/suggested?page=${numPage}&per_page=${perPage}`)
    const res = await callPath.get('/users/suggested', {
      params: {
        page: numPage,
        per_page: perPage,
      },
    });

    return res.data;
  } catch (err) {
    console.log('error in get accounts process: ', err);
  }
};

export default suggest;
