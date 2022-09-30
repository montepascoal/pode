import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

import * as S from './styles';

export default function NewsItem ({title, resume, text, author, image, link}) {

  return (
    <S.Container>
      <Link link={link}>
      <S.Author>{author}</S.Author>
      <S.Content>
        <S.Image src={image} />
        <S.Resume>{resume}</S.Resume>
      </S.Content>
      </Link>
    </S.Container>
  );
}

NewsItem.propTypes = {
  title  : PropTypes.string,
  resume : PropTypes.string,
  text   : PropTypes.string,
  author : PropTypes.string,
  image  : PropTypes.string,
  link   : PropTypes.string,
}

NewsItem.defaultProps = {
  title  : '',
  resume : '',
  text   : '',
  author : '',
  image  : '',
  link   : '#',
}