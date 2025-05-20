import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import * as authService from '~/services/authService';
import Button from '~/components/Button';
import { useAuth } from '~/Contexts/authContext';

const cx = classNames.bind(styles);

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await authService.loginUser(formData.email, formData.password);
      console.log('response: ', response);
      console.log('response meta: ', response.meta);
      const token = response.meta.token;
      console.log('token: ', token);
      login({ token, data: response.data });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('form')} onSubmit={handleSubmit}>
        <h2 className={cx('header')}>Đăng nhập</h2>

        <div className={cx('wrapper-input')}>
          <label className={cx('label')} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            className={cx('input')}
            required
          />
        </div>

        <div className={cx('wrapper-input')}>
          <label className={cx('label')} htmlFor="password">
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            className={cx('input')}
            required
          />
        </div>

        {error && <p className={cx('error')}>{error}</p>}

        <Button primary type="submit" className={cx('submit-btn')}>
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default Login;
