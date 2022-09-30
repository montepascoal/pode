import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Alert from '../../../utils/Alert';
import { mascaraCPF } from '../../../utils/mask';
import { validaCPF } from '../../../utils/validate';
import { Decrypt } from '../../../utils/crypto';
import { hideEmail } from '../../../utils/others';
import api from '../../../services/api';
 
import Button from '../../../components/Button';
import ButtonOutline from '../../../components/ButtonOutline';
import Link from '../../../components/Link';
import Input from '../../../components/Input';

import bg_auth from '../../../assets/images/client/background-auth.jpg';
import bg_auth_tablet from '../../../assets/images/client/background-auth-tablet.jpg';
import bg_auth_mobile from '../../../assets/images/client/background-auth-mobile.jpg';
import logoName from '../../../assets/images/client/logo-name.svg';
import logoNameMono from '../../../assets/images/client/logo-name-mono.svg';

import { FaPhoneSquareAlt, FaInstagramSquare, FaWhatsappSquare } from "react-icons/fa";

import * as S from './styles';
import { useLoading } from '../../../hooks/useLoading';

export default function Login() {

  const history = useHistory();

  // System
  const [infoSystem, setInfoSystem] = useState();

  // Input
  const [isSuccessInput, setSuccessInput] = useState(false);
  const [isErrorInput, setErrorInput]     = useState(false);
  const [valueDocument, setValueDocument] = useState('');

  /* useEffect's */

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
    setValueDocument(Decrypt(localStorage.getItem('@pode/cpfSave')) ?? '');
  }, [history, setGlobalLoading]);

  /* Validacoes Inputs */
  useEffect(() => {
    if(valueDocument) {
      validateInput(valueDocument);
    }
  }, [valueDocument]);
  
  const validateInput = (text) => {
    const validateCPF = validaCPF(text);
    setValueDocument(text.replace(/[^\d]+/g, ''));
    setSuccessInput(validateCPF);
    setErrorInput(!validateCPF);
  }

  const validateBlurInput = (text) => {
    const validateCPF = validaCPF(text);
    if(text.length === 0) {
      setSuccessInput(false);
      setErrorInput(false);
    } else {
      setSuccessInput(false);
      setErrorInput(!validateCPF);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(valueDocument === '') {
      Alert('warning', 'Atenção', 'Preencha os dados para continuar.')
    } else if(isErrorInput) {
      Alert('warning', 'CPF inválido', 'Insira um CPF válido para continuar.')
    } else {
      try {
        setGlobalLoading(true);
        const response = await api.get("/auth");

        if(valueDocument === response.data.cpf) {
          const email   = hideEmail(response.data.email);
          const message = `Enviamos para seu email ${email} um link para redefinir a senha`;
          Alert('success', 'Sucesso', message)

          history.push('/login');
        } else {
          Alert('error', 'Ops!', 'Nenhuma conta encontrada para esse CPF.')
        }
      } catch(error) {
        Alert('error', 'Ops!', 'Ocorreu um erro. Tente novamente mais tarde.')
        console.error('ERROR API [GET] /login: ' + error)
      } finally {
        setGlobalLoading(false);
      }
    }
  }
  
  const buttonBackLogin = () => {
    history.push('/login');
  };

  document.title = 'Redefinir senha | Monte Pascoal';

  return (
    <S.Container>
      <S.WrapperImage>
        <S.Image src={bg_auth} />
        <S.ImageTablet src={bg_auth_tablet} />
        <S.ImageMobile src={bg_auth_mobile} />

        <S.WrapperBullets>
          <S.Bullet/>
          <S.Bullet/>
          <S.BulletActive/>
        </S.WrapperBullets>
      </S.WrapperImage>

      <S.WrapperForm>
        <S.Title>REDEFINIR SENHA</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <Input
            type="text"
            inputMode="numeric"
            label="Insira seu CPF para redefinir o acesso a conta."
            placeholder="CPF" 
            value={mascaraCPF(valueDocument)}
            name="document"
            maxLength="14"
            onFocus={(e) => { validateInput(e.target.value) }}
            onBlur={(e) => { validateBlurInput(e.target.value) }}
            onChange={(e) => { setValueDocument(e.target.value) }}
            success={isSuccessInput}
            error={isErrorInput} 
          />

          <S.ContainerButtons>
            <ButtonOutline type="submit" text="VOLTAR" action={buttonBackLogin} />
            <Button type="submit" text="REDEFINIR" />
          </S.ContainerButtons>
          
        </S.Form>
      </S.WrapperForm>

      <S.WrapperContactSocial>
        <S.WrapperContact>
          <Link link={`tel:+55${infoSystem?.phone_1}`}>
            <S.ContainerPhone>
                <FaPhoneSquareAlt/><S.LabelPhone>{ infoSystem?.phone_1 }</S.LabelPhone>
              </S.ContainerPhone>
          </Link>
          <Link link={`tel:+55${infoSystem?.phone_2}`}>
              <S.ContainerPhone>
                <FaPhoneSquareAlt/><S.LabelPhone>{ infoSystem?.phone_2 }</S.LabelPhone>
              </S.ContainerPhone>
          </Link>
        </S.WrapperContact>
        <S.WrapperSocial>
          <Link link={ infoSystem?.link_facebook }> 
            <S.IconFacebook />
          </Link>
          <Link link={ infoSystem?.link_instagram }>
            <FaInstagramSquare />
          </Link>
          <Link link={ infoSystem?.link_whatsapp }>
            <FaWhatsappSquare />
          </Link>
          <Link link={ infoSystem?.link_website }>
            <S.Container>
              <S.LogoSocial src={logoNameMono} />
              <S.LogoSocialMobile src={logoName} />
            </S.Container>
          </Link>
        </S.WrapperSocial>
      </S.WrapperContactSocial>
    
    </S.Container>
  );
}