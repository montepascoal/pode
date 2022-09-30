/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import HookFormInput from '../HookFormInput';
import HookFormOptionSelect from '../HookFormOptionSelect';
import { mascaraCNPJ, mascaraPhone, mascaraCEP } from '../../utils/mask';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import api from '../../services/api';
import { useHistory, useParams } from 'react-router';
import Alert from '../../utils/Alert';
import axios from 'axios';

import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import ButtonAlert from '../ButtonAlert';
import { useLoading } from '../../hooks/useLoading';
import { stringCapitalizer, stringLowercase } from '../../utils/strings';
import { TabMenu } from '../TabMenu';
import { SwitchInput } from '../SwitchInput';
import { UserPermissions } from './UserPermissions';
import { LogsTable } from './LogsTable';

const schema = Yup.object().shape({
  comStatus: Yup
  .boolean()
  .required('Status é obrigatório'),
  comCnpj: Yup
  .string()
  .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'Insira um CNPJ válido')
  .required('CNPJ é obrigatório'),
  comName: Yup
  .string()
  .required('Nome é obrigatório'),
  comNameCompany: Yup
  .string()
  .required('Razão Social é obrigatória'),
  comRegistrationState: Yup
  .string()
  .notRequired(),
  comRegistrationMunicipal: Yup.string(),
  comAddCitId: Yup
  .number()
  .required('Cidade é obrigatória'),
  comAddStaId: Yup
  .number()
  .required('Estado é obrigatório'),
  comAddDistrict: Yup
  .string()
  .required('Bairro é obrigatório'),
  comAddCouId: Yup
  .number()
  .required('País é obrigatório'),
  comAddCep: Yup
  .string()
  .matches(/^\d{2}\.\d{3}\-\d{3}$/, 'Insira um CEP válido')
  .required('CEP é obrigatório'),
  comAddAddress: Yup
  .string()
  .required('Logradouro é obrigatório'),
  comAddComplement: Yup.string(),
  comAddNumber: Yup
  .number()
  .typeError('Insira apenas números'),
  comConPhone1: Yup
  .string()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone válido')
  .required('Telefone é obrigatório'),
  comConPhone2: Yup
  .string()
  .notRequired()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone válido'),
  comConMediaWhatsApp: Yup
  .string()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone válido')
  .required('Whatsapp é obrigatório'),
  comConEmail: Yup
  .string()
  .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Insira um e-mail válido')
  .required('E-mail é obrigatório'),
  empPayPix: Yup.string()
  .notRequired()
  .nullable(),
  comConMediaFacebook: Yup.string()
  .notRequired()
  .nullable(),
  comConMediaInstagram: Yup.string()
  .notRequired()
  .nullable(),
  comConMediaTikTok: Yup.string()
  .notRequired()
  .nullable(),
  comConMediaWebsite: Yup.string()
  .notRequired()
  .nullable(),
  comObservations: Yup.string()
  .notRequired()
  .nullable()
});

const mockPais = [
  { value: 1, label: 'Brasil' },
  { value: 2, label: 'Argentina' },
  { value: 3, label: 'Canadá' }
];

const mockEstados = [
  { value: 1, label: 'Mato Grosso' },
  { value: 2, label: 'Bahia' },
  { value: 9, label: 'Rio Grande do Sul' }
];

const mockCidades = [
  { value: 977, label: 'Porto Alegre' },
  { value: 2, label: 'São Paulo' },
  { value: 3, label: 'Brasília' }
];

const mockStatus = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

const mockEstadoCivil = [
  { value: 'Solteiro', label: 'Solteiro' },
  { value: 'Casado', label: 'Casado' },
  { value: 'Separado', label: 'Separado' },
  { value: 'Divorciado', label: 'Divorciado' },
  { value: 'Viúvo', label: 'Viúvo' }
];

const mockGrau = [
  { value: 'Superior completo', label: 'Superior completo' },
  { value: 'Superior incompleto', label: 'Superior incompleto' },
  { value: 'Ensino Médio completo', label: 'Ensino Médio completo' },
  { value: 'Ensino Médio incompleto', label: 'Ensino Médio incompleto' },
  { value: 'Ensino Fundamental completo', label: 'Ensino Fundamental completo' },
  { value: 'Ensino Fundamental incompleto', label: 'Ensino Fundamental incompleto' },
  { value: 'Analfabeto', label: 'Analfabeto' }
];

const mockSimNao = [
  { value: true, label: 'Sim' },
  { value: false, label: 'Não' }
];

const mockDepartamento = [
  { value: 'Administrativo', label: 'Administrativo' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'Recursos Humanos', label: 'Recursos Humanos' },
  { value: 'Comercial', label: 'Comercial' },
  { value: 'Tecnologia da Informação', label: 'Tecnologia da Informação' }
];

const mockFuncao = [
  { value: 'Desenvolvimento de Sistemas', label: 'Desenvolvimento de Sistemas' },
  { value: 'Administração', label: 'Administração' }
];

const mockHoras = [
  { value: '08:00 as 18:00', label: '08:00 as 18:00' },
  { value: '09:00 as 19:00', label: '09:00 as 19:00' }
];

const mockConta = [
  { value: 'Conta Corrente', label: 'Conta Corrente' },
  { value: 'Conta Poupança', label: 'Conta Poupança' }
];

const mockUnidades = [
  { value: 'Unidade 1', label: 'Unidade 1' },
  { value: 'Unidade 2', label: 'Unidade 2' },
];

export default function EmployeesForm({ initialData, refreshFc }) {
  
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [formEnabled, setFormEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { globalLoading, setGlobalLoading } = useLoading();

  async function handleEditStatus() {
    if (!isEditing || !formEnabled || globalLoading) return;

    const { comStatus } = getValues();

    try {
      setGlobalLoading(true);
      const response = await api.patch(`/companies-main/${id}`, {
        comStatus: !comStatus
      });

      if (response.status === 200) {
        await refreshFc();
        Alert('success', 'Sucesso', 'Status alterado com sucesso!');
      }

    } catch (err) {
      console.error('ERROR API [PATCH] /companies-main/{id}: ' + err)
    } finally {
      setGlobalLoading(false);
      setFormEnabled(false);
      setIsEditing(false);
    }
  }

  const history = useHistory();
  const { id } = useParams();

  function unmaskNumberValue(value) {
    if (!value) return;
    return value.replace(/[^\d]/g, '');
  }
  
  async function handleSubmitForm(form) {
    if (!formEnabled || globalLoading) return;

    const data = {
      ...form,
      comCnpj: unmaskNumberValue(form.comCnpj),
      comAddCep: unmaskNumberValue(form.comAddCep),
      comConPhone1: unmaskNumberValue(form.comConPhone1),
      comConPhone2: unmaskNumberValue(form.comConPhone2),
      comConMediaWhatsApp: unmaskNumberValue(form.comConMediaWhatsApp)
    };

    if (isEditing) {
      try {
        setGlobalLoading(true);

        await api.put(`/companies-main/${id}`, {
          ...data,
          comUpdated: new Date().toISOString(),
          comCreated: initialData.comCreated
        });
        Alert('success', 'Sucesso', 'Unidade editada com sucesso!');
        history.push('/unidades/listar');

      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [PUT] /companies-main/{id}: ' + err)
      } finally {
        setGlobalLoading(false);
        setFormEnabled(false);
        setIsEditing(false);
      }

    } else {
      try {
        setGlobalLoading(true);

        const response = await api.post(`/companies-main`, {
          ...data,
          comUpdated: new Date().toISOString(),
          comCreated: new Date().toISOString()
        });
        Alert('success', 'Sucesso', `A unidade '${form.comName}' foi criada com sucesso!`);
        
        history.push(`/unidades/visualizar/${response.data.id}`);
      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [POST] /companies-main/{id}: ' + err)
      } finally {
        setGlobalLoading(false);
        reset();
      }
    }
  };

  function formatData(data) {
    const formatDate = data ? new Date(data) : new Date();
    return format(new Date(formatDate), 'dd/MM/YYY, HH:mm aa', {
      locale: ptBr
    });
  };

  const handleSetInitialData = useCallback(() => {
    setFormEnabled(false);

    reset({
      ...initialData,
      comCreated: formatData(initialData.comCreated),
      comUpdated: formatData(initialData.comUpdated)
    });
  }, [initialData, reset])

  useEffect(() => {
    if (initialData) {
      handleSetInitialData();
    } else {
      reset({ ...getValues(), comStatus: false })
    }
  }, [getValues, handleSetInitialData, initialData, reset]);

  function handleStartEdit() {
    setIsEditing(true);
    setFormEnabled(true);
    reset({
      ...initialData,
      comCnpj: mascaraCNPJ(initialData.comCnpj),
      comAddCep: mascaraCEP(initialData.comAddCep),
      comConPhone1: mascaraPhone(initialData.comConPhone1),
      comConPhone2: initialData.comConPhone2 ? mascaraPhone(initialData.comConPhone2) : initialData.comConPhone2,
      comConMediaWhatsApp: initialData.comConMediaWhatsApp ? mascaraPhone(initialData.comConMediaWhatsApp) : '',
      comCreated: formatData(initialData.comCreated),
      comUpdated: formatData(initialData.comUpdated)
    });
  };

  async function handleCancelEdit() {
    await refreshFc();
    setIsEditing(false);
    setFormEnabled(false);
    reset({
      ...initialData,
      comCreated: formatData(initialData.comCreated),
      comUpdated: formatData(initialData.comUpdated)
    });
  }

  function getPhoneMask(phone = '', type) {
    if (!phone) return "(99) 99999-9999";

    const unmaskedPhone = unmaskNumberValue(phone);
    if ((isEditing || !initialData) && type !== 'blur') return "(99) 99999-9999"
    
    if (phone) {
      if (unmaskedPhone.length >= 11) {
        return "(99) 99999-9999"
      } else {
        return "(99) 9999-9999"
      }
    }
  };

  async function handleFetchCEP() {
    if(globalLoading) return;
    
    const { comAddCep, ...rest } = getValues(); 
    const cep = unmaskNumberValue(comAddCep);
    const cepIsValid = cep.length === 8;

    if(!cepIsValid) {
      Alert('error', 'Erro', 'Insira um CEP Válido para prosseguir');
      return
    }

    try {
      setGlobalLoading(true);
      const { data, status } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

      if (status === 200 && !data?.erro) {
        reset({
          ...rest,
          comAddCep,
          comAddAddress: stringCapitalizer(data.logradouro),
          comAddComplement: stringCapitalizer(data.complemento),
          comAddDistrict: stringCapitalizer(data.bairro)
        })
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error('ERROR API VIA CEP [GET]: ' + err)
      Alert('error', 'Erro', 'Ocorreu um erro ao buscar informações do CEP informado');
      reset({
        ...rest,
        comAddCep: ""
      });
    } finally {
      setGlobalLoading(false);
    }
  };

  async function handleFetchCNPJ() {
    if(globalLoading) return;

    const original = getValues();
    const { comCnpj, ...rest } = original;
    
    if (!comCnpj) return;
    
    const cnpj = unmaskNumberValue(comCnpj);

    try {
      setGlobalLoading(true);
      const { data, status } = await axios.get(`https://publica.cnpj.ws/cnpj/${cnpj}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      
      if (status === 200) {
        const {
          nome_fantasia,
          telefone1,
          telefone2,
          email,
          ddd1,
          ddd2,
          logradouro,
          complemento,
          // estado,
          numero,
          cep,
          // pais,
          // cidade,
          bairro
        } = data.estabelecimento;

        reset({
          ...rest,
          comCnpj,
          comName: stringCapitalizer(nome_fantasia),
          comNameCompany: stringCapitalizer(data.razao_social),
          comConPhone1: telefone1 ? mascaraPhone(ddd1 + telefone1) : original.comConPhone1,
          comConPhone2: telefone2 ? mascaraPhone(ddd2 + telefone2) : original.comConPhone2,
          comConEmail: email ? stringLowercase(email) : original.comConEmail,
          // comAddCitId: cidade ? cidade.nome : original.comAddCitId,  -- comentado até ter o sistema de endereços pronto
          // comAddCouId: pais ? pais.nome : original.comAddCouId, -- comentado até ter o sistema de endereços pronto
          // comAddStaId: estado ? estado.nome : original.comAddStaId, -- comentado até ter o sistema de endereços pronto
          comAddCep: cep ? mascaraCEP(cep) : original.comAddCep,
          comAddNumber: numero ?? original.comAddNumber,
          comAddDistrict: bairro ? stringCapitalizer(bairro) : original.comAddDistrict,
          comAddComplement: complemento ? stringCapitalizer(complemento) : original.comAddComplement,
          comAddAddress: logradouro ? stringCapitalizer(logradouro) : original.comAddAddress
        });
      } else {
        Alert('error', 'Erro', 'Ocorreu um erro ao buscar informações do CNPJ informado');
      }
    } catch (err) {
      console.error('ERROR API VIA RECEITA AWS [GET]: ' + err)
      Alert('error', 'Erro', 'Ocorreu um erro ao buscar informações do CNPJ informado');
    } finally {
      setGlobalLoading(false);
    }
  };

  const [tabs] = useState(['Geral', 'Login', 'LOGs']);
  const [currentTab, setCurrentTab] = useState(0);

  const [fakeStatus, setFakeStatus] = useState(false);

  return (
    <S.Container>
      <TabMenu
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {currentTab === 0 && (
        <>
          <S.FormRow className="status">
            <HookFormOptionSelect 
              label="Status" 
              options={mockStatus}
              className="status"
              name="comStatus"
              disabled={(isEditing || !formEnabled || !!initialData) ? true : false}
              control={control}
              error={errors.status && errors.status.message}
            />
            {isEditing && <ButtonAlert onClick={handleEditStatus} text="Alterar Status" />}
            <HookFormOptionSelect 
              label="Unidades" 
              options={mockUnidades}
              className="empresas"
              name="empEmpresa"
              disabled={!formEnabled}
              control={control}
            />
          </S.FormRow>
    
          <S.Title>Informações</S.Title>

          <S.FormRow className="infos1">
            <HookFormInput
              label="Nome"
              disabled={!formEnabled}
              control={control}
              name="empNome"
              required
            />
            <HookFormInput
              label="Data de Nascimento"
              disabled={!formEnabled}
              control={control}
              name="empDataNasc"
              mask="99/99/9999"
              required
            />
          </S.FormRow>

          <S.FormRow className="infos2">
            <HookFormOptionSelect 
              label="País de Nascimento" 
              options={mockPais}
              disabled={!formEnabled}
              control={control}
              name="empPaisNasc"
              required
            />
            <HookFormOptionSelect 
              label="Estado de Nascimento" 
              options={mockEstados}
              disabled={!formEnabled}
              control={control}
              name="empEstaNasc"
              required
            />
            <HookFormOptionSelect 
              label="Cidade de Nascimento" 
              options={mockCidades}
              control={control}
              name="empCidaNasc"
              disabled={!formEnabled}
              required
            />
          </S.FormRow>

          <S.FormRow className="infos3">
            <HookFormOptionSelect 
              label="Estado Civil" 
              options={mockEstadoCivil}
              disabled={!formEnabled}
              name="empEstadoCivil"
              control={control}
            />
            <HookFormOptionSelect 
              label="Grau de Instrução" 
              options={mockGrau}
              disabled={!formEnabled}
              control={control}
              name="empGrauInst"
            />
            <HookFormInput
              label="Nome Pai"
              disabled={!formEnabled}
              control={control}
              name="empNomePai"
            />
            <HookFormInput
              label="Nome Mãe"
              disabled={!formEnabled}
              control={control}
              name="empNomeMae"
            />
          </S.FormRow>

          <S.Title>Endereço</S.Title>

          <S.FormRow className="endereco1">
            <HookFormInput
              label="CEP"
              disabled={!formEnabled}
              control={control}
              mask="99.999.999/9999-99"
              name="empCep"
              required
            />
            <HookFormInput
              label="Logradouro"
              disabled={!formEnabled}
              control={control}
              name="empLogradouro"
              required
            />
            <HookFormInput
              label="Complemento"
              disabled={!formEnabled}
              control={control}
              name="empComp"
            />
            <HookFormInput
              label="Número"
              disabled={!formEnabled}
              control={control}
              name="empNum"
            />
          </S.FormRow>

        <S.FormRow className="endereco2">
            <HookFormInput
              label="Bairro"
              disabled={!formEnabled}
              control={control}
              name="empBairro"
              required
            />
            <HookFormOptionSelect 
              label="Estado" 
              options={mockEstados}
              control={control}
              disabled={!formEnabled}
              name="empEstado"
              required
            />
            <HookFormOptionSelect 
              label="Cidade" 
              options={mockCidades}
              control={control}
              disabled={!formEnabled}
              name="empCidade"
              required
            />
          </S.FormRow>

          <S.Title>Documentação</S.Title>

          <S.FormRow className="documentos">
            <HookFormInput
              label="CPF"
              disabled={!formEnabled}
              control={control}
              mask="999.999.999-99"
              name="empCPF"
              required
            />
            <HookFormInput
              label="Reservista"
              disabled={!formEnabled}
              control={control}
              name="empReserv"
            />
            <HookFormInput
              label="Categoria"
              disabled={!formEnabled}
              control={control}
              name="empCategoria"
            />
            <HookFormInput
              label="RG"
              disabled={!formEnabled}
              control={control}
              name="empRG"
              mask="99.999.999-9"
              required
            />
            <HookFormInput
              label="Data de Expedição"
              disabled={!formEnabled}
              control={control}
              mask="99/99/9999"
              name="empDataExpe"
            />
            <HookFormInput
              label="Orgão expeditor"
              disabled={!formEnabled}
              control={control}
              name="empOrgExpe"
            />
            <HookFormInput
              label="Titulo de Eleitor"
              disabled={!formEnabled}
              control={control}
              name="empEleitor"
            />
            <HookFormInput
              label="Zona"
              disabled={!formEnabled}
              control={control}
              name="empZona"
            />
            <HookFormInput
              label="Sessão"
              control={control}
              disabled={!formEnabled}
              name="empSessao"
            />
            <HookFormOptionSelect 
              label="Primeiro Emprego?" 
              options={mockSimNao}
              control={control}
              disabled={!formEnabled}
              name="empPrimEmp"
              required
            />
            <HookFormOptionSelect 
              label="Carteira Assinada?" 
              options={mockSimNao}
              control={control}
              disabled={!formEnabled}
              name="empCarteira"
              required
            />
            <HookFormInput
              label="Número CTPS"
              control={control}
              disabled={!formEnabled}
              name="empNumCTPS"
              required
            />
            <HookFormInput
              label="Série CTPS"
              control={control}
              disabled={!formEnabled}
              name="empSerieCTPS"
              required
            />
            <HookFormInput
              label="Data CTPS"
              control={control}
              disabled={!formEnabled}
              name="empDataCTPS"
              mask="99/99/9999"
              required
            />
            <HookFormInput
              label="PIS"
              control={control}
              disabled={!formEnabled}
              name="empPIS"
              required
            />
          </S.FormRow>

          <S.Title>Contato</S.Title>

          <S.FormRow className="contato">
            <HookFormInput
              label="Telefone / Celular"
              disabled={!formEnabled}
              control={control}
              name="empTel1"
              required
            />
            <HookFormInput
              label="Telefone / Celular (opcional)"
              disabled={!formEnabled}
              name="empTel2"
              control={control}
            />
            <HookFormInput
              label="E-mail"
              control={control}
              name="empEmail"
              disabled={!formEnabled}
              required
            />
          </S.FormRow>

          <S.Title>Trabalho</S.Title>

          <S.FormRow className="trabalho">
            <HookFormInput
              label="Data de Admissão"
              disabled={!formEnabled}
              control={control}
              name="empAdmissao"
              mask="99/99/9999"
              required
            />
            <HookFormOptionSelect 
              label="Departamento" 
              options={mockDepartamento}
              disabled={!formEnabled}
              control={control}
              name="empDep"
              required
            />
            <HookFormOptionSelect 
              label="Função" 
              options={mockFuncao}
              disabled={!formEnabled}
              control={control}
              name="empFuncao"
              required
            />
            <HookFormInput
              label="Salário Mensal"
              control={control}
              disabled={!formEnabled}
              name="empSalario"
              required
            />
            <HookFormOptionSelect 
              label="Horas de Trabalho: Seg a Sex"
              options={mockHoras}
              control={control}
              disabled={!formEnabled}
              name="empHoraSegSex"
              required
            />
            <HookFormOptionSelect 
              label="Horas de Trabalho: Sab"
              options={mockHoras}
              control={control}
              disabled={!formEnabled}
              name="empHoraSab"
            />
            <HookFormOptionSelect 
              label="Contrato de Experiência"
              options={mockSimNao}
              control={control}
              disabled={!formEnabled}
              name="empContratoExp"
              required
            />
            <HookFormInput
              label="Dias"
              control={control}
              disabled={!formEnabled}
              name="empContratoDias"
              required
            />
          </S.FormRow>

          <S.Title>Financeiro</S.Title>

          <S.FormRow className="financeiro">
            <HookFormInput
              label="Banco"
              disabled={!formEnabled}
              control={control}
              name="empBanco"
            />
            <HookFormInput
              label="Agência"
              disabled={!formEnabled}
              control={control}
              name="empAgencia"
            />
            <HookFormOptionSelect 
              label="Tipo de Conta"
              options={mockConta}
              disabled={!formEnabled}
              control={control}
              name="empTipoConta"
              required
            />
            <HookFormInput
              label="Pix"
              disabled={!formEnabled}
              control={control}
              name="empPayPix"
            />
          </S.FormRow>

          <S.Title>Extra</S.Title>

          <S.FormRow className="extra">
            <HookFormInput
              label="Observações"
              control={control}
              name="empObserv"
              disabled={!formEnabled}
            />
          </S.FormRow>

          {initialData && (
            <>
              <S.Title>Controle</S.Title>
              <S.FormRow className="controle">
                <HookFormInput
                  name="comCreated"
                  label="Data Criação"
                  control={control}
                  disabled={true}
                />
                <HookFormInput
                  name="comUpdated"
                  label="Data Atualização"
                  control={control}
                  disabled={true}
                />
              </S.FormRow>
            </>
          )}
          
          <S.ButtonsContainer>
            {initialData && !isEditing && <Button disabled={globalLoading} action={handleStartEdit} text="Alterar" />}
            {initialData && isEditing && <Button disabled={globalLoading} action={handleCancelEdit} text="Cancelar" />}
            {initialData && isEditing && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Salvar" />}
            {!initialData && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Cadastrar" />}
          </S.ButtonsContainer>
        </>
      )}

      {currentTab === 1 && (
        <>
          <S.Title>Acesso ao sistema</S.Title>

          <SwitchInput
            label="Status"
            valueLabel={fakeStatus ? 'Ativo' : 'Inativo'}
            value={fakeStatus}
            onChange={setFakeStatus}
            required
          />

          <S.Title>Informações</S.Title>

          <S.FormRow className="loginInfos">
            <HookFormInput
              label="Empresa"
              disabled={!formEnabled}
              control={control}
              name="loginEmpresa"
              required
            />
            <HookFormInput
              label="Usuário"
              disabled={!formEnabled}
              control={control}
              name="loginUsuario"
              required
            />
            <HookFormInput
              label="Senha"
              disabled={!formEnabled}
              control={control}
              name="loginSenha"
              required
            />
          </S.FormRow>
        
          <S.Title>Permissões</S.Title>

          <UserPermissions />

          <S.ButtonsContainer>
            {initialData && !isEditing && <Button disabled={globalLoading} action={handleStartEdit} text="Alterar" />}
            {initialData && isEditing && <Button disabled={globalLoading} action={handleCancelEdit} text="Cancelar" />}
            {initialData && isEditing && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Salvar" />}
            {!initialData && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Cadastrar" />}
          </S.ButtonsContainer>
        </>
      )}

      {currentTab === 2 && (
        <>
          <S.Title>LOGs</S.Title>

          <LogsTable />
        </>
      )}

          
    </S.Container>
  )
}