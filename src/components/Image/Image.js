import PropTypes from 'prop-types';
import { useState, forwardRef, useEffect } from 'react';
import images from '~/assets/images';
import classNames from 'classnames';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, className, fallback, alt, ...props }, ref) => {
  const [_fallbackSrc, setFallbackSrc] = useState('');

  // Khi src thay đổi mà rỗng => đặt ảnh fallback ngay
  useEffect(() => {
    if (!src) {
      setFallbackSrc(fallback || images.noImage);
    } else {
      setFallbackSrc('');
    }
  }, [src, fallback]);

  const handleError = () => {
    setFallbackSrc(fallback || images.noImage);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      ref={ref}
      src={_fallbackSrc || src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
});

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
  alt: PropTypes.string,
};

export default Image;
