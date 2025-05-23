import * as callPath from '../utils/httpRequest';

export const getUser = async (nickname) => {
  try {
    const res = await callPath.get(`/users/${nickname}`);
    return res.data;
  } catch (err) {
    console.error('getUser error:', err?.response || err);
    return null;
  }
};

const user = async (nickname) => {
  try {
    // const res = await callPath.get(`/users/${nickname}?headers=`)
    const res = await callPath.get(`/users/${nickname}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default user;
