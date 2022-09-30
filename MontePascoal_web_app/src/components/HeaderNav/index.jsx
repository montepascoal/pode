import React, { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';

import Link from '../../components/Link';
import HeaderNavUser from '../../components/HeaderNavUser';

import avatar from '../../assets/images/client/avatar.png';

import { FaEnvelopeOpen, FaComments, FaDollarSign, FaAngleDown } from "react-icons/fa";
import * as S from './styles';

export default function HeaderNav () {

  const { user } = useAuth();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <S.Container>
      <S.WrapperShortcuts>
          <Link>
            <S.Shortcut>
              <FaEnvelopeOpen />
            </S.Shortcut>
          </Link>
          <Link>
            <S.Shortcut>
              <FaComments />
            </S.Shortcut>
          </Link>
          <Link>
            <S.Shortcut>
              <FaDollarSign />
            </S.Shortcut>
          </Link>
        </S.WrapperShortcuts>
        <S.Line />
        <S.WrapperAcount onClick={() => setMenuToggle(!menuToggle)}>
          <S.User>
            <S.WrapperAvatar>
              <S.Avatar src={avatar} />
            </S.WrapperAvatar>
            <S.WrapperUserInfo>
              <S.NameUser>{user.username}</S.NameUser>
              <S.CPFUser>{user.cpf}</S.CPFUser>
            </S.WrapperUserInfo>
          </S.User>
          <S.AngleUserMenu>
            <FaAngleDown />
          </S.AngleUserMenu>

          {/* Componente - HeaderNavUser */}
          <HeaderNavUser isOpen={menuToggle} />
          {/* Componente - HeaderNavUser */}

        </S.WrapperAcount>
    </S.Container>
  );
}