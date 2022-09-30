import React, { useState, useEffect } from 'react';

import Alert from '../../utils/Alert';

import Button from '../../components/Button';
import ButtonOutline from '../../components/ButtonOutline';
import Link from '../../components/Link';
import Input from '../../components/Input';
import OptionSelect from '../../components/OptionSelect';
import Checkbox from '../../components/Checkbox';
import Radio from '../../components/Radio';

import cover from '../../assets/images/cover.jpg';

import { FaAddressCard, FaAddressBook, FaAngleDoubleDown, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDoubleUp, FaAngleLeft, FaAngleRight, FaAngleDown, FaAngleUp, FaBarcode, FaBars, FaBan, FaPiggyBank, FaBell, FaBellSlash, FaBookmark, FaBook, FaBookReader, FaBookOpen, FaBookMedical, FaBookDead, FaCalendarAlt, FaCalendarCheck, FaCalendarDay, FaCalendarMinus, FaCalendarPlus, FaCalendarTimes, FaCalendarWeek, FaCalendar, FaChartLine, FaChartArea, FaChartBar, FaChartPie, FaCheck, FaCheckCircle, FaCheckDouble, FaCheckSquare, FaClock, FaUserClock, FaUserCog, FaUserFriends, FaUserGraduate, FaUserInjured, FaUserLock, FaUserMd, FaUserMinus, FaUserPlus, FaUserShield, FaUserSlash, FaUserTag, FaUserTie, FaUserTimes, FaUsersCog, FaUsers, FaCommentAlt, FaComments, FaCommentDollar, FaCommentDots, FaCommentMedical, FaCommentSlash, FaDownload, FaFileDownload, FaCloudDownloadAlt, FaEdit, FaEnvelope, FaEnvelopeOpen, FaEnvelopeOpenText, FaEnvelopeSquare, FaExclamationCircle, FaExclamationTriangle, FaExclamation, FaFacebookSquare, FaFolder, FaFolderOpen, FaFolderMinus, FaFolderPlus, FaInstagram, FaWhatsapp, FaUndoAlt, FaReply, FaReplyAll, FaExternalLinkAlt, FaShareSquare, FaPhoneSquareAlt, FaPhoneAlt, FaMobileAlt, FaMapMarkerAlt, FaGlobe, FaDollarSign, FaKey, FaPowerOff, FaAdjust, FaLightbulb, FaUserEdit, FaPen, FaCog } from "react-icons/fa";
import * as S from './styles';

export default function Demo () {

  // Input
  const [isSuccessInput, setSuccessInput] = useState(false),
        [isErrorInput, setErrorInput]     = useState(false),
        [valueSimple, setValueSimple]     = useState(''),
        [valueValidate, setValueValidate] = useState('');

  // Radio
  const [radioR, setRadioR] = useState('optionA'),
        [radioB, setRadioB] = useState('optionD'),
        [radio, setRadio]   = useState('optionF');

  // Checkbox
  const [checkROne, setCheckedRedOne] = useState(true),
        [checkRTwo, setCheckedRedTwo] = useState(false);

  const [checkBOne, setCheckedBlueOne] = useState(false),
        [checkBTwo, setCheckedBlueTwo] = useState(true);

  const [checkOne, setCheckedOne] = useState(true),
        [checkTwo, setCheckedTwo] = useState(false);

  /* Validacoes Inputs */
  useEffect(() => {
    if(valueValidate) {
      validateInput(valueValidate);
    }
  }, [valueValidate]);

  const actionButtonSuccess = (props) => {
    console.log(props.target.outerText);
    Alert('success', null, props.target.outerText);
  };

  const actionButtonError = (props) => {
    console.log(props.target.outerText);
    Alert('error', null, props.target.outerText);
  };

  const actionButtonWarning = (props) => {
    console.log(props.target.outerText);
    Alert('warning', null, props.target.outerText);
  };

  const validateInput = (text) => {
    console.log('TESTE Validado: ' + text);
    setValueValidate(text);
    setSuccessInput(text.length === 5 ? true : false);
    setErrorInput(text.length === 5 ? false : true);
  }

  const validateBlurInput = (text) => {
    if(text.length === 0) {
      setSuccessInput(false);
      setErrorInput(false);
    } else {
      setSuccessInput(text.length === 5 ? false : false);
      setErrorInput(text.length === 5 ? false : true);
    }
  }

  /* Options Select */
  const options = [
    { value: 'Exemplo de texto 1', label: 'Exemplo de texto 1' },
    { value: 'Exemplo de texto 2', label: 'Exemplo de texto 2' },
    { value: 'Exemplo de texto 3', label: 'Exemplo de texto 3' }
  ];

  const handleAlertSuccess = () => {
    Alert('success', null, 'Dados atualizados com sucesso!');
  }
  const handleAlertError = () => {
    Alert('error', undefined, 'Ocorreu um erro ao processar sua solicitação');
  }
  const handleAlertWarn = () => {
    Alert('warning', 'Atenção', 'Preencha todos os campos para continuar');
  }

  document.title = 'Demo | Monte Pascoal';

  return (
      <S.Container>
        <S.Image src={cover}/>

        <S.Topics>01. TIPOGRAFIA</S.Topics>
        <S.ContainerTypography>
          <S.BoxTypography>
            <S.h6Typography><S.IconArrowRight style={{color: "var(--red)"}}/>BARLOW CONDENSED</S.h6Typography>
            <S.spanTypography>Ultilizado para todos os titulos</S.spanTypography>
            <S.BoxTypographyBackground style={{background: "var(--red)"}}>
              <S.TitleH1>BOLD <S.sizeTypography>60px</S.sizeTypography></S.TitleH1>
              <S.TitleH2>BOLD <S.sizeTypography>45px</S.sizeTypography></S.TitleH2>
              <S.TitleH3>BOLD <S.sizeTypography>30px</S.sizeTypography></S.TitleH3>
            </S.BoxTypographyBackground>

            <S.BigTitle>Aa</S.BigTitle>
          </S.BoxTypography>
          <S.BoxTypography>
            <S.h6Typography><S.IconArrowRight style={{color: "var(--red)"}}/>ROBOTO</S.h6Typography>
            <S.spanTypography>Ultilizado para todos os textos corridos</S.spanTypography>
            <S.BoxTypographyBackground style={{background: "var(--red)"}}>
              <S.TitleH1>REGULAR <S.sizeTypography>20px</S.sizeTypography></S.TitleH1>
              <S.TitleH2>LIGHT <S.sizeTypography>12px</S.sizeTypography></S.TitleH2>
              <S.TitleH3>THIN <S.sizeTypography>8px</S.sizeTypography></S.TitleH3>
            </S.BoxTypographyBackground>

            <S.BigText>Aa</S.BigText>
          </S.BoxTypography>
          <S.BoxTypography>
            <h1>H1 - Titulo</h1>
            <h2>H2 - Titulo</h2>
            <h3>H3 - Titulo</h3>
            <h4>H4 - Titulo</h4>
            <h5>H5 - Titulo</h5>
            <h6>H6 - Titulo</h6>
            <label>Label - Texto simples</label>
            <p></p>
            <span>Span - Texto simples</span>
            <p>Paragraph - Texto simples com texto <small>reduzido.</small></p>
          </S.BoxTypography>
        </S.ContainerTypography>

        <S.Topics>02. CORES</S.Topics>
        <S.ContainerColor>
          <S.BoxColor style={{background: "var(--red)"}}>
            <S.BlockContent>
              <S.TitleH6>COR PRIMÁRIA</S.TitleH6>
              <S.Text>(Alunos)</S.Text>
            </S.BlockContent>
            <S.BlockVariations>
              <S.ColorsStudent scale={0}>&nbsp;</S.ColorsStudent>
              <S.ColorsStudent scale={1}>&nbsp;</S.ColorsStudent>
              <S.ColorsStudent scale={2}>&nbsp;</S.ColorsStudent>
              <S.ColorsStudent scale={3}>&nbsp;</S.ColorsStudent>
              <S.ColorsStudent scale={4}>&nbsp;</S.ColorsStudent>
            </S.BlockVariations>
          </S.BoxColor>
          <S.HexColorMobile>
              <h6>#A41414</h6>
          </S.HexColorMobile>
          <S.BoxColor style={{background: "var(--blue)"}}>
            <S.BlockContent>
              <S.TitleH6>COR PRIMÁRIA</S.TitleH6>
              <S.Text>(Professores)</S.Text>
            </S.BlockContent>
            <S.BlockVariations>
              <S.ColorsTeacher scale={0}>&nbsp;</S.ColorsTeacher>
              <S.ColorsTeacher scale={1}>&nbsp;</S.ColorsTeacher>
              <S.ColorsTeacher scale={2}>&nbsp;</S.ColorsTeacher>
              <S.ColorsTeacher scale={3}>&nbsp;</S.ColorsTeacher>
              <S.ColorsTeacher scale={4}>&nbsp;</S.ColorsTeacher>
            </S.BlockVariations>
          </S.BoxColor>
          <S.HexColorMobile>
            <h6>#146CA4</h6>
          </S.HexColorMobile>
          <S.BoxColor>
            <S.BlockContent>
              <S.TitleH6>COR PRIMÁRIA</S.TitleH6>
              <S.Text>(Administração)</S.Text>
            </S.BlockContent>
            <S.BlockVariations>
              <S.ColorsAdmin scale={0}>&nbsp;</S.ColorsAdmin>
              <S.ColorsAdmin scale={1}>&nbsp;</S.ColorsAdmin>
              <S.ColorsAdmin scale={2}>&nbsp;</S.ColorsAdmin>
              <S.ColorsAdmin scale={3}>&nbsp;</S.ColorsAdmin>
              <S.ColorsAdmin scale={4}>&nbsp;</S.ColorsAdmin>
            </S.BlockVariations>
          </S.BoxColor>
          <S.HexColorMobile>
            <h6>#14A498</h6>
          </S.HexColorMobile>
        </S.ContainerColor>
        <S.ContainerColor>
          <S.HexColor>
            <h6>#A41414</h6>
          </S.HexColor>
          <S.HexColor>
            <h6>#146CA4</h6>
          </S.HexColor>
          <S.HexColor>
            <h6>#14A498</h6>
          </S.HexColor>
        </S.ContainerColor>

        <S.ContainerSmallColor>
          <S.BoxColorMedium style={{background: "var(--error)"}}>
            <S.BlockContent>
              <S.TitleH6>COR SECUNDÁRIA</S.TitleH6>
              <S.Text>(Erro)</S.Text>
            </S.BlockContent>
            <S.BlockVariationsMedium>
              <S.ColorsError scale={0}/>
              <S.ColorsError scale={1}/>
              <S.ColorsError scale={2}/>
            </S.BlockVariationsMedium>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile>
            <h6>#C23234</h6>
          </S.HexColorMediumMobile>
          <S.BoxColorMedium style={{background: "var(--warnings)"}}>
            <S.BlockContent>
              <S.TitleH6>COR SECUNDÁRIA</S.TitleH6>
              <S.Text>(Alerta)</S.Text>
            </S.BlockContent>
            <S.BlockVariationsMedium>
              <S.ColorsWarning scale={0}/>
              <S.ColorsWarning scale={1}/>
              <S.ColorsWarning scale={2}/>
            </S.BlockVariationsMedium>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile>
            <h6>#FFC107</h6>
          </S.HexColorMediumMobile>
          <S.BoxColorMedium style={{background: "var(--success)"}}>
            <S.BlockContent>
              <S.TitleH6>COR SECUNDÁRIA</S.TitleH6>
              <S.Text>(Correto)</S.Text>
            </S.BlockContent>
            <S.BlockVariationsMedium>
              <S.ColorsSuccess scale={0}/>
              <S.ColorsSuccess scale={1}/>
              <S.ColorsSuccess scale={2}/>
            </S.BlockVariationsMedium>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile>
            <h6>#28A745</h6>
          </S.HexColorMediumMobile>
        </S.ContainerSmallColor>
        <S.ContainerSmallColor>
          <S.HexColorMedium>
            <h6>#C23234</h6>
          </S.HexColorMedium>
          <S.HexColorMedium>
            <h6>#FFC107</h6>
          </S.HexColorMedium>
          <S.HexColorMedium>
            <h6>#28A745</h6>
          </S.HexColorMedium>
        </S.ContainerSmallColor>
        
        <S.ContainerMediumColor>
          <S.BoxColorMedium style={{background: "var(--text)"}}>
            <S.BlockContent>
              <S.TitleH6>COR TEXTO</S.TitleH6>
            </S.BlockContent>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile variant="text">
            <h6>#000000</h6>
          </S.HexColorMediumMobile>
          <S.BoxColorMedium style={{background: "var(--text_1)"}}>
            <S.BlockContent>
              <S.TitleH6>COR TEXTO</S.TitleH6>
            </S.BlockContent>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile variant="text_1">
            <h6>#545454</h6>
          </S.HexColorMediumMobile>
          <S.BoxColorMedium style={{background: "var(--text_2)"}}>
            <S.BlockContent>
              <S.TitleH6>COR TEXTO</S.TitleH6>
            </S.BlockContent>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile variant="text_2">
            <h6>#7C7C7C</h6>
          </S.HexColorMediumMobile>
          <S.BoxColorMedium style={{background: "var(--text_3)"}}>
            <S.BlockContent>
              <S.TitleH6>COR TEXTO</S.TitleH6>
            </S.BlockContent>
          </S.BoxColorMedium>
          <S.HexColorMediumMobile variant="text_3">
            <h6>#939393</h6>
          </S.HexColorMediumMobile>
        </S.ContainerMediumColor>
        <S.ContainerMediumColor>
          <S.HexColorMedium variant="text">
            <h6>#000000</h6>
          </S.HexColorMedium>
          <S.HexColorMedium variant="text_1">
            <h6>#545454</h6>
          </S.HexColorMedium>
          <S.HexColorMedium variant="text_2">
            <h6>#7C7C7C</h6>
          </S.HexColorMedium>
          <S.HexColorMedium variant="text_3">
            <h6>#939393</h6>
          </S.HexColorMedium>
        </S.ContainerMediumColor>

        <S.Topics>03. BOTÕES E LINS</S.Topics>

        <S.ContainerButtonsIcons>
          <S.ContainerButtons>
            <S.Label>PRIMÁRIO</S.Label>

            <Button text="ENVIAR" action={actionButtonSuccess} color="red"/>
            <Button text="CANCELAR ENVIO" action={actionButtonWarning} color="blue"/>
            <Button text="LOGIN" action={actionButtonError}/>
          </S.ContainerButtons>

          <S.ContainerButtons>
            <S.Label>GHOST</S.Label>

            <ButtonOutline text="ENVIAR"  action={actionButtonSuccess} color="red"/>
            <ButtonOutline text="CANCELAR ENVIO" action={actionButtonWarning} color="blue"/>
            <ButtonOutline text="LOGIN" action={actionButtonError}/>
          </S.ContainerButtons>
          
          <S.ContainerButtons>
            <S.Label>PRIMÁRIO</S.Label>

            <Link link="/test" color="red">
              exemplo texto link
            </Link>
            <Link link="https://google.com.br" color="blue">
              exemplo texto link
            </Link>
            <Link link="#">
              exemplo texto link
            </Link>
          </S.ContainerButtons>
        </S.ContainerButtonsIcons>

        <S.ContainerButtonsIcons>
          <S.ContainerIcons>
            <FaAddressCard />
            <FaAddressBook />
            <FaAngleRight />
            <FaAngleDown />
            <FaAngleUp />
            <FaBarcode />
            <FaBan />
            <FaBell />
            <FaBookmark />
            <FaCalendarAlt />
            <FaChartLine />
            <FaCheck />
            <FaCheckCircle />
            <FaClock />
            <FaCommentAlt />
            <FaComments />
            <FaDownload />
            <FaEdit />
            <FaEnvelope />
            <FaEnvelopeOpen />
            <FaExclamationCircle />
            <FaFacebookSquare />
            <FaFolder />
            <FaFolderOpen />
            <FaFolderMinus />
            <FaFolderPlus />
            <FaInstagram />
            <FaWhatsapp />
            <FaUndoAlt />
            <FaReply />
            <FaExternalLinkAlt />
            <FaShareSquare />
            <FaPhoneSquareAlt />
            <FaPhoneAlt />
            <FaMobileAlt />
            <FaMapMarkerAlt />
            <FaGlobe />
            <FaExclamationTriangle />
            <FaDollarSign />
            <FaKey />
            <FaPowerOff />
            <FaAdjust />
            <FaLightbulb />
            <FaUserEdit />
            <FaUsers />
            <FaPen />
            <FaCog />
            <FaAngleDoubleDown />
            <FaAngleDoubleLeft />
            <FaAngleDoubleRight />
            <FaAngleDoubleUp />
            <FaAngleLeft />
            <FaPiggyBank />
            <FaBellSlash />
            <FaBook />
            <FaBookReader />
            <FaBookOpen />
            <FaBookMedical />
            <FaBookDead />
            <FaCalendarCheck />
            <FaCalendarDay />
            <FaCalendarMinus />
            <FaCalendarPlus />
            <FaCalendarTimes />
            <FaCalendarWeek />
            <FaCalendar />
            <FaChartArea />
            <FaChartBar />
            <FaChartPie />
            <FaCheckDouble />
            <FaCheckSquare />
            <FaUserClock />
            <FaUserCog />
            <FaUserFriends />
            <FaUserGraduate />
            <FaUserInjured />
            <FaUserLock />
            <FaUserMd />
            <FaUserMinus />
            <FaUserPlus />
            <FaUserShield />
            <FaUserSlash />
            <FaUserTag />
            <FaUserTie />
            <FaUserTimes />
            <FaUsersCog />
            <FaCommentDollar />
            <FaCommentDots />
            <FaCommentMedical />
            <FaCommentSlash />
            <FaFileDownload />
            <FaCloudDownloadAlt />
            <FaEnvelopeOpenText />
            <FaEnvelopeSquare />
            <FaExclamationTriangle />
            <FaExclamationTriangle />
            <FaReplyAll />
            <FaBars />
            <FaExclamation />
          </S.ContainerIcons>
        </S.ContainerButtonsIcons>
        
        <S.Topics>04. INPUTS</S.Topics>
        <S.ContainerInputs>
          <Input label="Desabilitado" value="" readOnly disabled />
          <Input label="SEM value" value="" readOnly />
          <Input label="COM value" value="texto de teste" readOnly />
        </S.ContainerInputs>
        <S.ContainerInputs>
          <Input label="Sucesso" value="" readOnly success error={false} />
          <Input label="Erro" value="" readOnly success={false} error />
        </S.ContainerInputs>
        <S.ContainerInputsTest>
          <Input 
            label="TESTE Simples"
            value={valueSimple}
            onChange={(e) => { setValueSimple(e.target.value) }}
          />
          <Input 
            label="TESTE Sucesso/Erro (5 dígitos)"
            value={valueValidate}
            onFocus={(e) => { validateInput(e.target.value) }}
            onBlur={(e) => { validateBlurInput(e.target.value) }}
            onChange={(e) => { setValueValidate(e.target.value) }}
            success={isSuccessInput}
            error={isErrorInput} 
          />
        </S.ContainerInputsTest>
        <S.Line/>
        <S.ContainerSelect>
          <OptionSelect 
            label="Select Option" 
            options={options} 
            color="red" 
          />
          <OptionSelect 
            label="Select Option" 
            options={options} 
            color="blue" 
          />
          <OptionSelect 
            label="Select Option" 
            options={options} 
          />
        </S.ContainerSelect>
        <S.Line/>
        <S.ContainerCheckRadio>
          <S.BoxRadio>
            <Radio 
              label="Exemplo de texto" 
              color="red" 
              name="radio" 
              value="optionA"
              checked={radioR}
              onChange={(e) => { setRadioR(e.target.value) }} 
            />
            <Radio 
              label="Exemplo de texto" 
              color="red" 
              name="radio" 
              value="optionB" 
              checked={radioR}
              onChange={(e) => { setRadioR(e.target.value) }} 
            />
          </S.BoxRadio>
          <S.BoxRadio>
            <Radio 
              label="Exemplo de texto" 
              color="blue" 
              name="radio1" 
              value="optionC"
              checked={radioB}
              onChange={(e) => { setRadioB(e.target.value) }}
            />
            <Radio 
              label="Exemplo de texto" 
              color="blue" 
              name="radio1" 
              value="optionD" 
              checked={radioB}
              onChange={(e) => { setRadioB(e.target.value) }}
            />
          </S.BoxRadio>
          <S.BoxRadio>
            <Radio 
              label="Exemplo de texto" 
              name="radio2" 
              value="optionE"
              checked={radio}
              onChange={(e) => { setRadio(e.target.value) }}
            />
            <Radio 
              label="Exemplo de texto" 
              name="radio2" 
              value="optionF" 
              checked={radio}
              onChange={(e) => { setRadio(e.target.value) }}
            />
          </S.BoxRadio>
        </S.ContainerCheckRadio>
        <S.Line/>
        <S.ContainerCheckRadio>
          <S.BoxRadio>
            <Checkbox 
              label="Exemplo de texto"
              color="red" 
              name="checkbox" 
              value="optionA" 
              checked={checkROne}
              onChange={() => { setCheckedRedOne(!checkROne) }} 
            />
            <Checkbox 
              label="Exemplo de texto" 
              color="red" 
              name="checkbox" 
              value="optionB" 
              checked={checkRTwo}
              onChange={() => { setCheckedRedTwo(!checkRTwo) }} 
            />
          </S.BoxRadio>
          <S.BoxRadio>
            <Checkbox 
              label="Exemplo de texto"
              color="blue" 
              name="checkbox1" 
              value="optionA" 
              checked={checkBOne}
              onChange={() => { setCheckedBlueOne(!checkBOne) }} 
            />
            <Checkbox 
              label="Exemplo de texto" 
              color="blue" 
              name="checkbox1" 
              value="optionB" 
              checked={checkBTwo}
              onChange={() => { setCheckedBlueTwo(!checkBTwo) }} 
            />

          </S.BoxRadio>
          <S.BoxRadio>
            <Checkbox 
              label="Exemplo de texto"
              name="checkbox2" 
              value="optionA" 
              checked={checkOne}
              onChange={() => { setCheckedOne(!checkOne) }} 
            />
            <Checkbox 
              label="Exemplo de texto" 
              name="checkbox2" 
              value="optionB" 
              checked={checkTwo}
              onChange={() => { setCheckedTwo(!checkTwo) }} 
            />
          </S.BoxRadio>
        </S.ContainerCheckRadio>   

        <S.Topics>05. ALERTAS/NOTIFICAÇÕES</S.Topics>
        <S.ContainerButtonsIcons>
          <S.ContainerButtons>
            <Button text="Alerta Sucesso" action={handleAlertSuccess} />
          </S.ContainerButtons>
          <S.ContainerButtons>
            <Button text="Alerta Erro" action={handleAlertError} color="red" />
          </S.ContainerButtons>
          <S.ContainerButtons>
            <Button text="Alerta Aviso" action={handleAlertWarn} color="blue" />
          </S.ContainerButtons>
        </S.ContainerButtonsIcons>

      </S.Container>
  );
}