/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useCallback } from 'react';
import * as S from './styles';
import HookFormInput from '../HookFormInput';
import HookFormOptionSelect from '../HookFormOptionSelect';
import { mascaraCNPJ, mascaraPhone, mascaraCEP, unmaskNumberValue, getCnpjCpfMask } from '../../utils/mask';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import api from '../../services/api';
import apiProd from '../../services/apiProd';
import { useHistory } from 'react-router';
import Alert from '../../utils/Alert';
import axios from 'axios';

import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useLoading } from '../../hooks/useLoading';
import { stringCapitalizer, stringLowercase } from '../../utils/strings';
import { validaCnpjCpf } from '../../utils/validate';
import OptionSelect from '../OptionSelect';
import { useMemo } from 'react';
import { getByIBGE } from '../../utils/others';
import { useGeo } from '../../hooks/useGeo';
import { fetchCEP } from '../../utils/fetchInfos';
import { FormSection } from '../FormSection';

const schema = Yup.object().shape({
  comCpfCnpj: Yup
  .string()
  .required('CPF/CNPJ é obrigatório'),
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
  comConMediaFacebook: Yup.string().nullable(),
  comConMediaInstagram: Yup.string().nullable(),
  comConMediaTikTok: Yup.string().nullable(),
  comConMediaWebSite: Yup.string().nullable(),
  comObservations: Yup.string().nullable(),
  comConMediaLinkedin: Yup.string().nullable(),
  comConMediaYoutube: Yup.string().nullable(),
  comConMediaTwitter: Yup.string().nullable()
});

export default function CompanyMainForm({ initialData, refreshFc }) {
  
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [formEnabled, setFormEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { cities, states, addressLoading } = useGeo();

  const { globalLoading, setGlobalLoading } = useLoading();

  const history = useHistory();
  
  async function handleSubmitForm(form) {
    if (!formEnabled || globalLoading) return;

    const cnpj =  unmaskNumberValue(form.comCpfCnpj);

    const result = validaCnpjCpf(cnpj);
    const isValid = result !== null;
    if(!isValid) {
      Alert('error', 'Erro', 'Insira um CPF/CNPJ válido!');
      return;
    }

    const {
      CONFIG_CITIES,
      CONFIG_COUNTRIES,
      CONFIG_STATES,
      comStatus,
      comUpdated,
      comCreated,
      comDeleted,
      id,
      ...rest
    } = form;

    const data = {
      ...rest,
      comCpfCnpj: cnpj,
      comAddCep: unmaskNumberValue(form.comAddCep),
      comConPhone1: unmaskNumberValue(form.comConPhone1),
      comConPhone2: unmaskNumberValue(form.comConPhone2),
      comConMediaWhatsApp: unmaskNumberValue(form.comConMediaWhatsApp),
      comAddNumber: String(form.comAddNumber),
      comConMediaOther1: '',
      comConMediaOther2: ''
    };

    if (isEditing) {
      try {
        setGlobalLoading(true);

        await apiProd.put('/api/companies-main/1', data);
        Alert('success', 'Sucesso', 'A empresa foi editada com sucesso!');
        await refreshFc();

      } catch (err) {
        history.push('/error500');
        console.error('ERROR API PROD [PUT] /api/companies-main/1: ' + err)
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
      reset({ ...getValues() })
    }
  }, [getValues, handleSetInitialData, initialData, reset]);

  function handleStartEdit() {
    if(addressLoading) return;
    setIsEditing(true);
    setFormEnabled(true);
    reset({
      ...initialData,
      comCpfCnpj: mascaraCNPJ(initialData.comCpfCnpj),
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
    const { comAddCep, ...rest } = getValues(); 

    try {
      const {
        cep,
        address,
        complement,
        district,
        city,
        state
      } = await fetchCEP({
        loading: globalLoading,
        setLoading: setGlobalLoading,
        cep: comAddCep,
        states,
        cities
      });
  
      reset({
        ...rest,
        comAddCep: cep,
        comAddAddress: address,
        comAddComplement: complement,
        comAddDistrict: district,
        comAddCitId: city,
        comAddStaId: state
      });
    } catch(err) {
      reset({
        ...rest,
        comAddCep: ""
      });
    }
  };
 
  async function handleFetchCNPJ() {
    if(globalLoading) return;

    const original = getValues();
    const { comCpfCnpj, ...rest } = original;
    
    if (!comCpfCnpj) return;
    
    const cnpj = unmaskNumberValue(comCpfCnpj);
    const result = validaCnpjCpf(cnpj);

    if(result === 'CPF') return;
    const isValid = result !== null;
    if(!isValid) {
      Alert('error', 'Erro', 'Insira um CPF/CNPJ válido!');
      return;
    }

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
          estado,
          numero,
          cep,
          cidade,
          bairro
        } = data.estabelecimento;
        
        reset({
          ...rest,
          comCpfCnpj,
          comName: stringCapitalizer(nome_fantasia),
          comNameCompany: stringCapitalizer(data.razao_social),
          comConPhone1: telefone1 ? mascaraPhone(ddd1 + telefone1) : original.comConPhone1,
          comConPhone2: telefone2 ? mascaraPhone(ddd2 + telefone2) : original.comConPhone2,
          comConEmail: email ? stringLowercase(email) : original.comConEmail,
          comAddCitId: cidade ? getByIBGE(cities, cidade.ibge_id) : original.comAddCitId,
          comAddStaId: estado ? getByIBGE(states, estado.ibge_id) : original.comAddStaId,
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

  const { comAddStaId, comAddCitId } = getValues();
  watch(["comAddStaId", "comAddCitId"]);

  const currentCities = useMemo(() => {
    return cities?.filter(item => item.staId === comAddStaId);
  }, [cities, comAddStaId]);

  const resetCity = useCallback(() => {
    const exists = currentCities.some(item => item.value === comAddCitId);
    if(isEditing && !exists) {
      setValue('comAddCitId', undefined);
    }
  }, [comAddCitId, currentCities, isEditing, setValue])

  useEffect(() => {
    resetCity()
  }, [resetCity])

  useEffect(() => {
    const exists = currentCities.some(item => item.value === comAddCitId);
    if(currentCities.length > 0 && !exists) {
      setValue('comAddCitId', undefined);
    }
  }, [comAddCitId, currentCities, setValue])
  return (
    <S.Container>
      <FormSection title="Informações" initialVal={true}>
        <S.FormRow className="infos">
          <HookFormInput
            name="comCpfCnpj"
            label="CPF/CNPJ"
            control={control}
            error={errors.comCpfCnpj && errors.comCpfCnpj.message}
            disabled={!formEnabled || globalLoading}
            onBlur={handleFetchCNPJ}
            mask={getCnpjCpfMask(initialData?.comCpfCnpj)}
            onMask={getCnpjCpfMask}
            required
          />
          <HookFormInput
            name="comName"
            label="Nome"
            control={control}
            error={errors.comName && errors.comName.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="comNameCompany"
            label="Razão Social"
            control={control}
            error={errors.comNameCompany && errors.comNameCompany.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="comRegistrationState"
            label="Inscrição Estadual"
            control={control}
            error={errors.comRegistrationState && errors.comRegistrationState.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comRegistrationMunicipal"
            label="Inscrição Municipal"
            control={control}
            error={errors.comRegistrationMunicipal && errors.comRegistrationMunicipal.message}
            disabled={!formEnabled}
          />
        </S.FormRow>
      </FormSection>
      
      <FormSection title="Endereço">
        <S.FormRow className="endereco1">
          <HookFormInput
            name="comAddCep"
            label="CEP"
            control={control}
            error={errors.comAddCep && errors.comAddCep.message}
            disabled={!formEnabled || globalLoading}
            mask="99.999-999"
            onBlur={handleFetchCEP}
            required
          />
          <HookFormInput
            name="comAddAddress"
            label="Logradouro"
            control={control}
            error={errors.comAddAddress && errors.comAddAddress.message}
            disabled={!formEnabled || globalLoading}
            required
          />
          <HookFormInput
            name="comAddComplement"
            label="Complemento"
            control={control}
            error={errors.comAddComplement && errors.comAddComplement.message}
            disabled={!formEnabled || globalLoading}
          />
          <HookFormInput
            name="comAddNumber"
            label="Número"
            control={control}
            error={errors.comAddNumber && errors.comAddNumber.message}
            disabled={!formEnabled}
          />
        </S.FormRow>

        <S.FormRow className="endereco2">
          <HookFormInput
            name="comAddDistrict"
            label="Bairro" 
            disabled={!formEnabled || globalLoading}
            control={control}
            error={errors.comAddDistrict && errors.comAddDistrict.message}
            required
          />
          <OptionSelect 
            label="País"
            value={{ label: 'Brasil', value: 1 }}
            disabled={true}
          />
          <HookFormOptionSelect 
            label="Estado" 
            name="comAddStaId"
            options={states} 
            placeholder={addressLoading ? "Carregando..." : "Selecione um Estado"}
            disabled={!formEnabled || addressLoading}
            control={control}
            error={errors.comAddStaId && errors.comAddStaId.message}
            required
          />
          <HookFormOptionSelect 
            label="Cidade" 
            name="comAddCitId"
            options={currentCities} 
            placeholder={addressLoading ? "Carregando..." : "Selecione uma Cidade"}
            disabled={!formEnabled || addressLoading}
            control={control}
            error={errors.comAddCitId && errors.comAddCitId.message}
            required
          />
        </S.FormRow>
      </FormSection>
      
      <FormSection title="Contato">
        <S.FormRow className="contato">
          <HookFormInput
            name="comConPhone1"
            label="Telefone / Celular"
            control={control}
            error={errors.comConPhone1 && errors.comConPhone1.message}
            disabled={!formEnabled}
            mask={getPhoneMask(initialData?.comConPhone1)}
            onMask={getPhoneMask}
            required
          />
          <HookFormInput
            name="comConPhone2"
            label="Telefone / Celular"
            control={control}
            error={errors.comConPhone2 && errors.comConPhone2.message}
            mask={getPhoneMask(initialData?.comConPhone2)}
            onMask={getPhoneMask}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaWhatsApp"
            label="Whatsapp"
            control={control}
            error={errors.comConMediaWhatsApp && errors.comConMediaWhatsApp.message}
            mask={getPhoneMask(initialData?.comConMediaWhatsApp)}
            onMask={getPhoneMask}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="comConEmail"
            label="E-mail"
            control={control}
            error={errors.comConEmail && errors.comConEmail.message}
            disabled={!formEnabled}
            required
          />
        </S.FormRow>
      </FormSection>

      <FormSection title="Redes Sociais">
        <S.FormRow className="redes">
          <HookFormInput
            name="comConMediaWebSite"
            label="Website"
            placeholder="https://exemplo.com.br"
            control={control}
            error={errors.comConMediaWebSite && errors.comConMediaWebSite.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaFacebook"
            placeholder="https://www.facebook.com/exemplo"
            label="Facebook"
            control={control}
            error={errors.comConMediaFacebook && errors.comConMediaFacebook.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaInstagram"
            placeholder="https://www.instagram.com/exemplo"
            label="Instagram"
            control={control}
            error={errors.comConMediaInstagram && errors.comConMediaInstagram.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaTikTok"
            placeholder="https://www.tiktok.com/@exemplo"
            label="TikTok"
            control={control}
            error={errors.comConMediaTikTok && errors.comConMediaTikTok.message}
            disabled={!formEnabled}
          />

          <HookFormInput
            name="comConMediaLinkedin"
            placeholder="https://www.linkedin.com/in/exemplo"
            label="LinkedIn"
            control={control}
            error={errors.comConMediaLinkedin && errors.comConMediaLinkedin.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaYoutube"
            placeholder="https://www.youtube.com/c/exemplo"
            label="Youtube"
            control={control}
            error={errors.comConMediaYoutube && errors.comConMediaYoutube.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="comConMediaTwitter"
            placeholder="https://twitter.com/exemplo"
            label="Twitter"
            control={control}
            error={errors.comConMediaTwitter && errors.comConMediaTwitter.message}
            disabled={!formEnabled}
          />
        </S.FormRow>
      </FormSection>

      <FormSection title="Extra">
        <S.FormRow>
          <HookFormInput
            name="comObservations"
            label="Observações"
            control={control}
            error={errors.comObservations && errors.comObservations.message}
            disabled={!formEnabled}
          />
        </S.FormRow>
      </FormSection>

      {initialData && (
        <>
          <FormSection title="Controle">
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
          </FormSection>
        </>
      )}
      
      <S.ButtonsContainer>
        {initialData && !isEditing && <Button disabled={globalLoading || addressLoading} action={handleStartEdit} text={globalLoading || addressLoading ? "Carregando": "Alterar"} />}
        {initialData && isEditing && <Button disabled={globalLoading || addressLoading} action={handleCancelEdit} text="Cancelar" />}
        {initialData && isEditing && <Button disabled={globalLoading || addressLoading} action={handleSubmit(handleSubmitForm)} text="Salvar" />}
        {!initialData && <Button disabled={globalLoading || addressLoading} action={handleSubmit(handleSubmitForm)} text="Cadastrar" />}
      </S.ButtonsContainer>
    </S.Container>
  )
}