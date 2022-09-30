/* eslint-disable no-useless-escape */
import { useState } from 'react';
import * as S from './styles';
import HookFormOptionSelect from '../HookFormOptionSelect';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import HookFormInput from '../HookFormInput';
import { useCallback } from 'react';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { useEffect } from 'react';
import Button from '../Button';
import { useLoading } from '../../hooks/useLoading';
import apiProd from '../../services/apiProd';
import { useHistory } from 'react-router-dom';
import Alert from '../../utils/Alert';
import { mascaraCEP, mascaraCPF, mascaraPhone, unmaskNumberValue } from '../../utils/mask';
import { useMemo } from 'react';
import { validaData } from '../../utils/validate';
import { useGeo } from '../../hooks/useGeo';
import OptionSelect from '../OptionSelect';
import { fetchCEP } from '../../utils/fetchInfos';

const mockStatus = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

const schema = Yup.object().shape({
  repStatus: Yup
  .boolean()
  .required('Status é obrigatório'),
  repName: Yup
  .string()
  .required('Nome é obrigatório'),
  repDocCpf: Yup
  .string()
  .required('CPF é obrigatório'),
  repDocRg: Yup
  .string()
  .required('RG é obrigatório'),
  repDocRgExpeditor: Yup
  .string()
  .required('Órgão Expedidor é obrigatório'),
  repDocRgDateExpedition: Yup
  .string()
  .required('Data de Expedição é obrigatório'),
  repAddCep: Yup
  .string()
  .matches(/^\d{2}\.\d{3}\-\d{3}$/, 'Insira um CEP válido')
  .required('CEP é obrigatório'),
  repAddAddress: Yup
  .string()
  .required('Logradouro é obrigatório'),
  repAddComplement: Yup.string(),
  repAddDistrict: Yup
  .string()
  .required('Bairro é obrigatório'),
  repAddStaId: Yup
  .number()
  .required('Estado é obrigatório'),
  repAddCitId: Yup
  .number()
  .required('Cidade é obrigatório'),
  repConEmail: Yup
  .string()
  .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Insira um e-mail válido')
  .required('E-mail é obrigatório'),
  repConEmergencyPhone: Yup
  .string()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone válido')
  .required("Telefone de emergência é obrigatório"),
  repConEmergencyName: Yup.string().required("Nome de emergência é obrigatório"),
  repConPhone1: Yup
  .string()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone / celular válido')
  .required('Telefone / Celular é obrigatório'),
  repConPhone2: Yup
  .string()
  .matches(/\(\d{2}\)\s\d?\d{4}-\d{3}\_?/i, 'Insira um telefone válido'),
  repObservations: Yup.string(),
});

export function RepresentativeForm({ initialData, refreshFc, isOpen, companyId }) {
  const [formEnabled, setFormEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { globalLoading, setGlobalLoading } = useLoading();
  const { cities, states, addressLoading } = useGeo();

  const history = useHistory();

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
      repCreated: formatData(initialData.repCreated),
      repUpdated: formatData(initialData.repUpdated)
    });
  }, [initialData, reset])

  useEffect(() => {
    if (initialData) {
      handleSetInitialData();
    } else {
      setFormEnabled(true);
      reset({ repStatus: true })
    }
  }, [getValues, handleSetInitialData, initialData, reset]);

  useEffect(() => {
    if (!isOpen) {
      setFormEnabled(false);
      setIsEditing(false);
      reset();
    } else if (isOpen && !initialData) {
      setFormEnabled(true);
    }
  }, [initialData, isOpen, reset])

  function handleStartEdit() {
    setIsEditing(true);
    setFormEnabled(true);
    reset({
      ...initialData,
      repCreated: formatData(initialData.repCreated),
      repUpdated: formatData(initialData.repUpdated),
      repAddCep: mascaraCEP(initialData.repAddCep),
      repDocCpf: mascaraCPF(initialData.repDocCpf),
      repConPhone1: mascaraPhone(initialData.repConPhone1),
      repConPhone2: initialData.repConPhone2 ? mascaraPhone(initialData.repConPhone2) : initialData.repConPhone2,
      repConEmergencyPhone: initialData.repConEmergencyPhone ? mascaraPhone(initialData.repConEmergencyPhone) : '',
    });
  };

  async function handleSubmitForm(form) {
    if (!formEnabled || globalLoading) return;

    const isValiDate = validaData(form.repDocRgDateExpedition);
    if(!isValiDate) {
      Alert('error', 'Erro', 'Insira uma data válida!');
      return
    }

    const {
      id,
      repUpdated,
      repDeleted,
      repCreated,
      comId,
      repConPhone1,
      repConPhone2,
      repConEmergencyPhone,
      repAddCep,
      repDocCpf,
      repStatus,
      ...rest
    } = form;
    
    const data = {
      ...rest,
      repConPhone1: unmaskNumberValue(repConPhone1),
      repConPhone2: unmaskNumberValue(repConPhone2),
      repConEmergencyPhone: unmaskNumberValue(repConEmergencyPhone),
      repAddCep: unmaskNumberValue(repAddCep),
      repDocCpf: unmaskNumberValue(repDocCpf),
      repAddCouId: 1
    }

    if (isEditing) {
      try {
        setGlobalLoading(true);

        await apiProd.put(`/api/companies/${companyId}/representatives/${initialData.id}`, data);
        Alert('success', 'Sucesso', 'Responsável editado com sucesso!');
        await refreshFc(true);

      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [PUT] /api/companies/{id}/representatives/{id}: ' + err)
      } finally {
        setGlobalLoading(false);
        setFormEnabled(false);
        setIsEditing(false);
      }
    } else {
      try {
        setGlobalLoading(true);

        await apiProd.post(`/api/companies/${companyId}/representatives`, data);
        Alert('success', 'Sucesso', `Responsável '${form.repName}' foi criado com sucesso!`);
        await refreshFc(true);
        
      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [POST] /api/companies/{id}/representatives: ' + err)
      } finally {
        setGlobalLoading(false);
        reset();
      }
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setFormEnabled(false);
    reset({
      ...initialData,
      repCreated: formatData(initialData.repCreated),
      repUpdated: formatData(initialData.repUpdated)
    });
  }

  async function handleFetchCEP() {
    const { repAddCep, ...rest } = getValues(); 

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
        cep: repAddCep,
        states,
        cities
      });
  
      reset({
        ...rest,
        repAddCep: cep,
        repAddAddress: address,
        repAddComplement: complement,
        repAddDistrict: district,
        repAddCitId: city,
        repAddStaId: state
      });
    } catch(err) {
      reset({
        ...rest,
        repAddCep: ""
      });
    }
  };

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

  const { repAddStaId, repAddCitId } = getValues();
  watch(["repAddStaId", "repAddCitId"]);

  const currentCities = useMemo(() => {
    return cities?.filter(item => item.staId === repAddStaId);
  }, [cities, repAddStaId]);

  const resetCity = useCallback(() => {
    const exists = currentCities.some(item => item.value === repAddCitId);
    if(isEditing && !exists) {
      setValue('repAddCitId', undefined);
    }
  }, [repAddCitId, currentCities, isEditing, setValue])

  useEffect(() => {
    resetCity()
  }, [resetCity])

  useEffect(() => {
    const exists = currentCities.some(item => item.value === repAddCitId);
    if(currentCities.length > 0 && !exists) {
      setValue('repAddCitId', undefined);
    }
  }, [repAddCitId, currentCities, setValue]);

  return (
    <S.Container>
      <section>
        <HookFormOptionSelect
          label="Status" 
          options={mockStatus}
          className="status"
          name="repStatus"
          control={control}
          error={errors.repStatus && errors.repStatus.message}
          disabled
        />

        <S.Title>Informações</S.Title>
        <S.FormRow className="infos">
          <HookFormInput
            name="repName"
            label="Nome"
            control={control}
            error={errors.repName && errors.repName.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repDocCpf"
            label="CPF"
            control={control}
            error={errors.repDocCpf && errors.repDocCpf.message}
            disabled={!formEnabled}
            mask="999.999.999-99"
            required
          />
          <HookFormInput
            name="repDocRg"
            label="RG"
            control={control}
            error={errors.repDocRg && errors.repDocRg.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repDocRgExpeditor"
            label="Órgão Expedidor"
            control={control}
            error={errors.repDocRgExpeditor && errors.repDocRgExpeditor.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repDocRgDateExpedition"
            label="Data de Expedição"
            control={control}
            error={errors.repDocRgDateExpedition && errors.repDocRgDateExpedition.message}
            disabled={!formEnabled}
            mask="99/99/9999"
            required
          />
        </S.FormRow>
        <S.Title>Informações</S.Title>
        <S.FormRow className="endereco">
          <HookFormInput
            name="repAddCep"
            label="CEP"
            control={control}
            error={errors.repAddCep && errors.repAddCep.message}
            disabled={!formEnabled}
            required
            mask="99.999-999"
            onBlur={handleFetchCEP}
          />
          <HookFormInput
            name="repAddAddress"
            label="Logradouro"
            control={control}
            error={errors.repAddAddress && errors.repAddAddress.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repAddComplement"
            label="Complemento"
            control={control}
            error={errors.repAddComplement && errors.repAddComplement.message}
            disabled={!formEnabled}
          />
          <HookFormInput
            name="repAddDistrict"
            label="Bairro"
            control={control}
            error={errors.repAddDistrict && errors.repAddDistrict.message}
            disabled={!formEnabled}
            required
          />

        </S.FormRow>
        <S.FormRow className="endereco2">
        <OptionSelect
          label="País"
          value={{ label: 'Brasil', value: 1 }}
          disabled={true}
        />
          <HookFormOptionSelect
            label="Estado" 
            options={states} 
            name="repAddStaId"
            placeholder={addressLoading ? "Carregando..." : "Selecione um Estado"}
            disabled={!formEnabled || addressLoading}
            control={control}
            error={errors.repAddStaId && errors.repAddStaId.message}
            required
          />
          <HookFormOptionSelect
            label="Cidade" 
            name="repAddCitId"
            options={currentCities} 
            disabled={!formEnabled || addressLoading}
            placeholder={addressLoading ? "Carregando..." : "Selecione uma Cidade"}
            control={control}
            error={errors.repAddCitId && errors.repAddCitId.message}
            required
          />
        </S.FormRow>
        <S.Title>Contato</S.Title>
        <S.FormRow className="contato">
          <HookFormInput
            name="repConEmail"
            label="E-mail"
            control={control}
            error={errors.repConEmail && errors.repConEmail.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repConEmergencyName"
            label="Nome de emergência"
            control={control}
            error={errors.repConEmergencyName && errors.repConEmergencyName.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="repConEmergencyPhone"
            label="Telefone de emergência"
            control={control}
            error={errors.repConEmergencyPhone && errors.repConEmergencyPhone.message}
            disabled={!formEnabled}
            mask={getPhoneMask(initialData?.repConEmergencyPhone)}
            onMask={getPhoneMask}
            required
          />
          <HookFormInput
            name="repConPhone1"
            label="Telefone / Celular"
            control={control}
            error={errors.repConPhone1 && errors.repConPhone1.message}
            disabled={!formEnabled}
            required
            mask={getPhoneMask(initialData?.repConPhone1)}
            onMask={getPhoneMask}
          />
          <HookFormInput
            name="repConPhone2"
            label="Telefone / Celular"
            control={control}
            error={errors.repConPhone2 && errors.repConPhone2.message}
            disabled={!formEnabled}
            mask={getPhoneMask(initialData?.repConPhone2)}
            onMask={getPhoneMask}
          />
        </S.FormRow>
        <HookFormInput
          name="repObservations"
          label="Observações"
          control={control}
          error={errors.repObservations && errors.repObservations.message}
          disabled={!formEnabled}
        />

        {initialData && (
          <>
            <S.Title>Controle</S.Title>
            <S.FormRow className="controle">
              <HookFormInput
                name="repCreated"
                label="Data Criação"
                control={control}
                disabled={true}
              />
              <HookFormInput
                name="repUpdated"
                label="Data Atualização"
                control={control}
                disabled={true}
              />
            </S.FormRow>
          </>
        )}
      </section>
      
      <S.ButtonsContainer>
        {isEditing && <Button disabled={globalLoading || addressLoading} action={handleCancelEdit} text="Cancelar" />}
        {initialData && !isEditing && <Button disabled={globalLoading || addressLoading} action={handleStartEdit} text={addressLoading ? 'Carregando' : "Alterar"} />}
        {initialData && isEditing && <Button disabled={globalLoading || addressLoading} action={handleSubmit(handleSubmitForm)} text="Salvar" />}
        {!initialData && <Button disabled={globalLoading || addressLoading} action={handleSubmit(handleSubmitForm)} text="Cadastrar" />}
      </S.ButtonsContainer>
    </S.Container>
  )
}