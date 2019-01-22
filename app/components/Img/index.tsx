/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ImgComponentFn } from './types';

const Img: ImgComponentFn = ({ className, alt, src }) => {
  return <img className={className} src={src} alt={alt} />;
};

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
