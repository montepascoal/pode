import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Link({ link, children, color}) {

  const isExternal = () => {
    const re    = new RegExp("^((?:tel|https?|mailto):.*?)$", "i");
    const match = re.test(link);
    return match;
  };

  return (
    (isExternal()) ?
      <S.Anchor href={link} target="_blank" rel="noopener noreferrer" color={color}>
        {children}
      </S.Anchor>
    :
      <S.Link to={link} color={color}>
        {children}
      </S.Link>
  );
}

Link.propTypes = {
  children : PropTypes.node,
  link     : PropTypes.string,
  color    : PropTypes.string
}

Link.defaultProps = {
  link     : '#',
  color    : 'primary'
}