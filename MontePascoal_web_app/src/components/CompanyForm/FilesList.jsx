import { useState } from 'react';
import * as S from './styles';
import Button from '../Button';
import { FileItem } from '../FileItem';
import { useLoading } from '../../hooks/useLoading';
import { useEffect } from 'react';
import { useCallback } from 'react';
import apiProd from '../../services/apiProd';
import { useHistory } from 'react-router-dom';
import { Modal } from '../Modal';
import { FilesForm } from '../FilesForm';
import { ConfirmDelete } from '../ConfirmDelete';
import { FileViewOptions } from '../FileViewOptions';

export function FilesList({ companyId, viewOnly }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const history = useHistory();

  const { globalLoading, setGlobalLoading } = useLoading();
  const [localLoading, setLocalLoading] = useState(true);

  const getData = useCallback(async (mounted) => {
    try {
      setGlobalLoading(true);
      setLocalLoading(true);
      const { data } = await apiProd.get(`/api/companies/${companyId}/files`);

      if(mounted) {
        setData(data.resData);
      }
    } catch(error) {
      history.push('/error500');
      console.error('ERROR API [GET] /companies-main: ' + error)
    } finally {
      setGlobalLoading(false);
      setLocalLoading(false);
    }
  }, [companyId, history, setGlobalLoading]);

  useEffect(() => {
    let mounted = true;

    getData(mounted);
    
    return () =>  { mounted = false; }
  }, [companyId, getData, history, setGlobalLoading]);

  function handleClose() {
    setModalIsOpen(false);
  }

  function handleCloseDeleteModal() {
    setDeleteModalIsOpen(false);
  }

  function handleStartDelete(fileId) {
    setDeleteModalIsOpen(fileId)
  }


  async function handleDeleteFile(fileId) {
    if(!fileId) return;

    try {
      setGlobalLoading(true);
      
      await apiProd.patch(`/api/companies/${companyId}/files/${fileId}`, {
        filStatus: false
      });

      setData(old => old.filter(item => item.id !== fileId));
      handleCloseDeleteModal();
    } catch (err) {
      history.push('/error500');
      console.error('ERROR PATCH [GET] /api/companies/{id}/files/{id}: ' + err)
    } finally {
      setGlobalLoading(false);
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const [currentFile, setCurrentFile] = useState(null);

  return (
    <S.FileListContainer>
      {!viewOnly && (
        <>
          <Modal
            title="Adicionar arquivo"
            content={
              <FilesForm
                companyId={companyId}
                refreshFc={getData}
                isOpen={modalIsOpen}
                handleClose={handleClose}
              />
            }
            modalIsOpen={modalIsOpen}
            closeModal={handleClose}
            maxWidth="40rem"
          />

          <Modal
            title="Deletar Arquivo"
            content={
              <ConfirmDelete
                deleteId={deleteModalIsOpen}
                onConfirm={handleDeleteFile}
                onCancel={handleCloseDeleteModal}
                description="Você tem certeza que deseja deletar este arquivo?"
              />
            }
            modalIsOpen={deleteModalIsOpen}
            closeModal={handleCloseDeleteModal}
            maxWidth="27rem"
          />

          <Modal
            title="Selecione uma ação"
            content={
              <FileViewOptions
                companyId={companyId}
                file={currentFile}
              />
            }
            modalIsOpen={!!currentFile}
            closeModal={() => setCurrentFile(null)}
            maxWidth="27rem"
          />
        </>
      )}

      {!viewOnly && (
        <S.Wrapper>
          <S.Title>Arquivos</S.Title>
            <S.Actions>
              <Button text="Adicionar arquivo" action={() => setModalIsOpen(true)} disabled={isEditing}/>
            </S.Actions>
        </S.Wrapper>
      )}

        <S.FilesWrapper>
          {data.map(file => (
            <FileItem
                key={file.id}
                file={file}
                companyId={companyId}
                isEditing={isEditing}
                handleDelete={handleStartDelete}
                viewOnly={viewOnly}
                onClick={setCurrentFile}
            />
          ))}
          {!globalLoading && !localLoading && data.length <= 0 && <p>Essa unidade não possui arquivos cadastrados</p>}
        </S.FilesWrapper>

       {!viewOnly && <Button text={isEditing ? "Parar edição" : "Editar arquivos"} action={() => setIsEditing(old => !old)}/>}
    </S.FileListContainer>
    
  )
}