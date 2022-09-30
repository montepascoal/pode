import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import Link from '../../../components/Link';
import Button from '../../../components/Button';

import element_left from '../../../assets/images/errors/404_left.png';
import element_right from '../../../assets/images/errors/404_right.png';
import logoName from '../../../assets/images/client/logo-name.svg';

import { FaPhoneSquareAlt, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";

import * as S from './styles';
import { useLoading } from '../../../hooks/useLoading';

export default function Error404 () {

  const history = useHistory();

  // System
  const [infoSystem, setInfoSystem] = useState();

  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    
    const handleInfoSystem = async () => {
      try {
        setGlobalLoading(true);

        const response = await api.get("/system");

        setInfoSystem(response.data);
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /system: ' + error)
      } finally {
        setGlobalLoading(false);
      }
    }

    handleInfoSystem();
  }, [history, setGlobalLoading]);

  const buttonBackHome = () => {
    history.push('/');
  };

  document.title = 'Error 404 | Monte Pascoal';

  return (
    <S.Container>
      <S.LeftSide>
        <S.Image src={element_left} />
      </S.LeftSide>
      <S.Content>

        <S.WrapperError>
          <S.Error>ERRO</S.Error>
          <S.CodeError>404</S.CodeError>
          <S.DescriptionError>Página não encontrada.</S.DescriptionError>
          <S.Text>Desculpe. A página que você está procurando não existe.</S.Text>
          <Button text="IR PARA PÁGINA INICIAL" action={buttonBackHome} />
        </S.WrapperError>

        <S.WrapperContactSocial>

          <S.ContainerLogo>
            <Link link={ infoSystem?.link_website }>
              <S.LogoSocial src={logoName} />
            </Link>
          </S.ContainerLogo>
          
          <S.ContainerSocial>
            <S.Social>
              <Link link={ infoSystem?.link_facebook }> 
                <S.IconFacebook />
              </Link>
              <Link link={ infoSystem?.link_instagram }>
                <FaInstagramSquare />
              </Link>
              <Link link={ infoSystem?.link_whatsapp }>
                <FaWhatsappSquare />
              </Link>
            </S.Social>
            <S.Phone>
              <Link link={`tel:+55${infoSystem?.phone_1}`}>
                <S.ContainerPhone>
                  <FaPhoneSquareAlt/><S.LabelPhone>{ infoSystem?.phone_1 }</S.LabelPhone>
                </S.ContainerPhone>
              </Link>
              <S.Line/>
              <Link link={`tel:+55${infoSystem?.phone_2}`}>
                <S.ContainerPhone>
                  <FaPhoneSquareAlt/><S.LabelPhone>{ infoSystem?.phone_2 }</S.LabelPhone>
                </S.ContainerPhone>
              </Link>
            </S.Phone>
          </S.ContainerSocial>

        </S.WrapperContactSocial>
      </S.Content>
      <S.RightSide>
        <S.Image src={element_right} />
      </S.RightSide>
    </S.Container>
  );
}