import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { objectIsEmpty } from '../../utils/others';

import Link from '../Link';
import NavbarItem from '../NavbarItem';

import * as Icons from "react-icons/fa";
import * as S from './styles';

export default function NavbarGroup ({ label, icon, link, items, expand }) {  

  const [showItems, setShowItems] = useState(false);

  const { [icon]: Icon } = Icons;
  const hasItems = !objectIsEmpty(items);

  return (
    <S.Container expand={expand}>
      <S.Wrapper 
        showItems={showItems}
        onClick={() => setShowItems(!showItems)} 
      >
        <Link link={hasItems ? '#' : link}>
            <Icon />
            <S.WrapperExpand
              showItems={showItems}
              expand={expand}
            >
              <S.Label>{label}</S.Label>

              {hasItems &&
                <Icons.FaAngleRight />
              }
            </S.WrapperExpand>    
        </Link>
      </S.Wrapper>

      {hasItems &&
        <NavbarItem 
        showItems={showItems}
        expand={expand} 
        items={items} 
      />
      }
    </S.Container>
  );
}

NavbarGroup.propTypes = {
  label  : PropTypes.string,
  icon   : PropTypes.string,
  link   : PropTypes.string,
  items  : PropTypes.array,
  expand : PropTypes.bool,
}

NavbarGroup.defaultProps = {
  label  : '[undefined]',
  icon   : 'FaSpinner',
  link   : '#',
  items  : [],
  expand : false,
}