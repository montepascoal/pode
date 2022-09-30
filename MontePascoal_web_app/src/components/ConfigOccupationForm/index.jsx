import { useState } from 'react';
import * as S from '../ConfigEmployeeForm/styles';
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
  occStatus: Yup
  .boolean()
  .required('Status é obrigatório'),
  depId: Yup
  .number()
  .required("Departamento é obrigatório"),
  occName: Yup
  .string()
  .required('Nome é obrigatório'),
  occDescription: Yup
  .string()
  .required('Descrição é obrigatório'),
});

export function ConfigOccupationForm({ initialData, refreshFc, isOpen }) {
  const [formEnabled, setFormEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading]= useState(true);

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
      reset({ occStatus: true })
    }
  }, [getValues, handleSetInitialData, initialData, reset]);

  useEffect(() => {
    async function getDepartments() {
      try {
        setDepartmentsLoading(true);
        const response = await apiProd.get("/api/public/employees/departments");
        const formattedResponse = response.data.resData.map(item => ({
          depStatus: item.depStatus,
          value: item.id,
          label: item.depName
        }));

        if(!initialData) {
          setDepartments(formattedResponse.filter(item => item.depStatus === true));
        } else {
          setDepartments(formattedResponse);
        }
      } catch (err) {
        console.err(err)
        console.err("ERROR GET DEPARTMENTS - MODAL")
      } finally {
        setDepartmentsLoading(false);
      }
    }

    if(isOpen && !initialData) {
      getDepartments();
    }

    if(isOpen && initialData) {
      setDepartments([
        { value: initialData.depId, label: initialData.CONFIG_EMPLOYEES_DEPARTMENTS.depName }
      ])
    }

    if (!isOpen) {
      setFormEnabled(false);
      setIsEditing(false);
      reset();
    } else if (isOpen && !initialData) {
      setFormEnabled(true);
    }
  }, [initialData, isOpen, reset]);

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
      occStatus: form.occStatus,
      occName: form.occName,
      occDescription: form.occDescription
    };

    if (isEditing) {
      try {
        setGlobalLoading(true);

        await apiProd.put(`/api/config/employees/departments/${initialData.depId}/occupations/${initialData.id}`, data);
        Alert('success', 'Sucesso', 'Função editada com sucesso!');

      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [PUT] /api/config/employees/departments/{depId}/occupations/{occId}: ' + err)
      } finally {
        setGlobalLoading(false);
        setFormEnabled(false);
        setIsEditing(false);
        refreshFc(true);
      }
    } else {
      try {
        setGlobalLoading(true);

        await apiProd.post(`/api/config/employees/departments/${form.depId}/occupations`, data);
        Alert('success', 'Sucesso', `A função '${data.occName}' foi criada com sucesso!`);
        
      } catch (err) {
        history.push('/error500');
        console.error('ERROR API [POST] /api/config/employees/departments/{depId}/occupations: ' + err)
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
    reset(initialData);
  }

  return (
    <S.Container>
      <section>
        <HookFormOptionSelect
          label="Status" 
          options={mockStatus}
          className="status"
          name="occStatus"
          disabled={!formEnabled || !initialData}
          control={control}
          error={errors.occStatus && errors.occStatus.message}
        />
        <S.FormRow className="infos">
          <S.Title>Informações</S.Title>
          <HookFormOptionSelect
            placeholder={departmentsLoading ? "Carregando..." : "Selecione um departamento"}
            label="Departamento" 
            options={departments}
            name="depId"
            disabled={departmentsLoading || initialData}
            control={control}
            error={errors.depId && errors.depId.message}
          />
          <HookFormInput
            name="occName"
            label="Nome"
            control={control}
            error={errors.occName && errors.occName.message}
            disabled={!formEnabled}
            required
          />
          <HookFormInput
            name="occDescription"
            label="Descrição"
            control={control}
            error={errors.occDescription && errors.occDescription.message}
            disabled={!formEnabled}
            required
          />
        </S.FormRow>
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