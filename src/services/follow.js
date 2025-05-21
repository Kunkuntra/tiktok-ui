import * as callPath from '../utils/httpRequest';

export const followUser = async (id) => {
  try {
    const res = await callPath.post(`users/${id}/follow`);
    return res.data;
  } catch (error) {
    console.error('Follow failed:', error.response?.data || error.message);
    return { Error: error.response?.status };
  }
};

export const unFollowUser = async (id) => {
  try {
    const res = await callPath.post(`users/${id}/unfollow`);
    return res.data;
  } catch (error) {
    console.error('Unfollow failed:', error.response?.data || error.message);
    return { Error: error.response?.status };
  }
};
