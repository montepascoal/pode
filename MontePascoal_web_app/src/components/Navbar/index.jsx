import React from 'react';
import PropTypes from 'prop-types';

import { itens } from '../../config/navbar.js';

import NavbarGroup from '../NavbarGroup'; 

import * as S from './styles';

export default function Navbar ({ expand }) {

  return (
    <S.Container expand={expand}>
      {
          itens.map((p, i) => {
            let { label, icon, link, items } = p;

            return (
              <NavbarGroup 
                key={i}

                label={label}
                icon={icon}
                link={link}
                items={items}

                expand={expand}
              />
            );
          })
        }
      
    </S.Container>
  );
}

Navbar.propTypes = {
  expand : PropTypes.bool,
}

Navbar.defaultProps = {
  expand : false,
}