import * as callPath from '../utils/httpRequest';

export const loginUser = async (email, password) => {
  try {
    const res = await callPath.post('/auth/login', {
      email,
      password,
    });

    return res.data;
  } catch (err) {
    return { errCode: err.response.status };
  }
};

export const logout = async () => {
  try {
    const res = await callPath.post('auth/logout', {});
    return res;
  } catch (err) {
    return { errorCode: err.response.status };
  }
};

// Thêm hàm mới dùng fetch
export async function loginUserFetch(email, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return res.json();
}
