import React from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';

import * as S from './styles';

export default function NavbarItem ({ showItems, expand, items }) {

  return (
    <S.Container showItems={showItems} expand={expand}>
      <S.List>
        {
          items.map((p, i) => {
            let { label, link } = p;

            return (
              <S.Item key={i}>
                <Link link={link}>
                  {label}
                </Link>
              </S.Item>
            );
          })
        }
      </S.List>
    </S.Container>
  );
}

NavbarItem.propTypes = {
  showItems : PropTypes.bool,
  expand    : PropTypes.bool,
  items     : PropTypes.array,
}

NavbarItem.defaultProps = {
  showItems : false,
  expand    : false,
  items     : [],
}