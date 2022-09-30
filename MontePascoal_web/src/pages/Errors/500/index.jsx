import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import Link from '../../../components/Link';
import Button from '../../../components/Button';

import element_right from '../../../assets/images/errors/500.png';
import logoName from '../../../assets/images/client/logo-name.svg';

import { FaPhoneSquareAlt, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";

import * as S from './styles';

export default function Error500 () {

  const history = useHistory();

  // System
  const [infoSystem, setInfoSystem] = useState();

  useEffect(() => {
    
    const handleInfoSystem = async () => {
      try {
        const response = await api.get("/system");
        setInfoSystem(response.data);
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /system: ' + error)
      }
    }

    handleInfoSystem();
  }, [history]);

  const buttonBackPage = () => {
    history.goBack();
  };

  document.title = 'Error 500 | Monte Pascoal';

  return (
    <S.Container>
      <S.Content>

        <S.WrapperError>
          <S.CodeError>500</S.CodeError>
          <S.Error>Oops! Ocorreu um erro!</S.Error>
          <S.Text>Fique tranquilo, estamos cientes e trabalhando na correção</S.Text>
          <Button text="VOLTAR PARA PÁGINA ANTERIOR" action={buttonBackPage} />
        </S.WrapperError>

        <S.WrapperContactSocial>
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

        <S.ContainerLogo>
          <Link link={ infoSystem?.link_website }>
            <S.Logo src={logoName} />
          </Link>
        </S.ContainerLogo>

      </S.RightSide>
    </S.Container>
  );
}