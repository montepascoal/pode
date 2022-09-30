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

const mockStatus = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

const schema = Yup.object().shape({
  depStatus: Yup
  .boolean()
  .required('Status é obrigatório'),
  depName: Yup
  .string()
  .required('Nome é obrigatório'),
  depDescription: Yup
  .string()
  .required('Descrição é obrigatório'),
});

export function ConfigEmployeeForm({ initialData, refreshFc, isOpen }) {
  const [formEnabled, setFormEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { globalLoading, setGlobalLoading } = useLoading();
  const history = useHistory();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
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
      depCreated: formatData(initialData.depCreated),
      depUpdated: formatData(initialData.depUpdated)
    });
  }, [initialData, reset])

  useEffect(() => {
    if (initialData) {
      handleSetInitialData();
    } else {
      setFormEnabled(true);
      reset({ depStatus: true })
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
      depCreated: formatData(initialData.depCreated),
      depUpdated: formatData(initialData.depUpdated)
    });
  };

  async function handleSubmitForm(form) {
    if (!formEnabled || globalLoading) return;

    const data = {
      depStatus: form.depStatus,
      depName: form.depName,
      depDescription: form.depDescription
    };

    if (isEditing) {
      try {
        setGlobalLoading(true);

        await apiProd.put(`/api/config/employees/departments/${initialData.id}`, data);
        Alert('success', 'Sucesso', 'Departamento editado com sucesso!');

      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [PUT] /api/config/employees/departments/{id}: ' + err)
      } finally {
        setGlobalLoading(false);
        setFormEnabled(false);
        setIsEditing(false);
        refreshFc(true);
      }
    } else {
      try {
        setGlobalLoading(true);

        await apiProd.post('/api/config/employees/departments', data);
        Alert('success', 'Sucesso', `O Departamento '${data.depName}' foi criado com sucesso!`);
        
      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [POST] /api/config/employees/departments: ' + err)
      } finally {
        setGlobalLoading(false);
        reset();
        refreshFc(true);
      }
    }
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setFormEnabled(false);
    reset({
      ...initialData,
      depCreated: formatData(initialData.depCreated),
      depUpdated: formatData(initialData.depUpdated)
    });
  }

  return (
    <S.Container>
      <section>
        <HookFormOptionSelect
          label="Status" 
          options={mockStatus}
          className="status"
          name="depStatus"
          disabled={!formEnabled || !initialData}
          control={control}
          error={errors.status && errors.status.message}
        />
        <S.FormRow className="infos">
          <S.Title>Informações</S.Title>
          <HookFormInput
            name="depName"
            label="Nome"
            control={control}
            error={errors.depName && errors.depName.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="depDescription"
            label="Descrição"
            control={control}
            error={errors.depDescription && errors.depDescription.message}
            disabled={!formEnabled}
            required
          />
        </S.FormRow>
        {initialData && (
          <>
            <S.Title>Controle</S.Title>
            <S.FormRow className="controle">
              <HookFormInput
                name="depCreated"
                label="Data Criação"
                control={control}
                disabled={true}
              />
              <HookFormInput
                name="depUpdated"
                label="Data Atualização"
                control={control}
                disabled={true}
              />
            </S.FormRow>
          </>
        )}
      </section>
      
      <S.ButtonsContainer>
        {isEditing && <Button disabled={globalLoading} action={handleCancelEdit} text="Cancelar" />}
        {initialData && !isEditing && <Button disabled={globalLoading} action={handleStartEdit} text="Alterar" />}
        {initialData && isEditing && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Salvar" />}
        {!initialData && <Button disabled={globalLoading} action={handleSubmit(handleSubmitForm)} text="Cadastrar" />}
      </S.ButtonsContainer>
    </S.Container>
  )
}