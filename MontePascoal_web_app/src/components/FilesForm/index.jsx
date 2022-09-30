import { useEffect, useState } from "react";
import Input from "../Input";
import {useDropzone} from 'react-dropzone';
import { Container, DropZone } from "./styles";
import { Label } from "../Input/styles";
import Button from "../Button";
import { useCallback } from "react";
import apiProd from '../../services/apiProd';
import { useLoading } from "../../hooks/useLoading";
import Alert from '../../utils/Alert';

export function FilesForm({ companyId, refreshFc, isOpen, handleClose }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState();

  const { setGlobalLoading } = useLoading();

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    for(let file of fileRejections) {
      const fileTypeError = file.errors.some(error => error.code === "file-invalid-type");
      if(fileTypeError) {
        Alert('error', 'Erro ao selecionar', 'Formato do arquivo não é aceito pelo sistema');
        break
      }
    }
    if(fileRejections.length > 1) {
      Alert('error', 'Erro ao selecionar', 'Insira apenas 1 arquivo por vez!');
    }
    acceptedFiles.forEach(file => {
      setFile(file);
    })
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    isFocused
  } = useDropzone({
    maxFiles: 1,
    accept: 'application/pdf, video/mp4, video/avi, video/webm, audio/mpeg, image/jpeg, image/png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.oasis.opendocument.text, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.oasis.opendocument.spreadsheet',
    onDrop
  });

  const hasFile = acceptedFiles?.length > 0;

  const removeAll = useCallback(() => {
    acceptedFiles.length = 0
    acceptedFiles.splice(0, acceptedFiles.length)
    setFile(null);
    setTitle('');
  }, [acceptedFiles]);

  useEffect(() => {
    if(!isOpen) {
      removeAll();
    }
  }, [isOpen, removeAll]);

  async function handleSubmit() {
    try {
      if(!title.trim() || !file) return;

      setGlobalLoading(true);
      const formData = new FormData();

      formData.append('title', title);
      formData.append('file', file);

      await apiProd.post(`/api/companies/${companyId}/files`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        }
      })

      removeAll();
      handleClose();
      await refreshFc(true);
    } catch (err) {
      Alert('error', 'Erro ao enviar', 'Não foi possível enviar seu arquivo, tente novamente!');
    } finally {
      setGlobalLoading(false);
    }
  }

  return (
    <Container>
      <Input
        name="title"
        label="Título do arquivo"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        required
      />

      <section>
        <Label>
          Arquivo
          <span> *</span>
        </Label>
        <DropZone hasFile={hasFile} {...getRootProps({isFocused, isDragAccept, isDragReject})}>
          <input {...getInputProps()} />
          {!isDragActive && hasFile && <p>{acceptedFiles[0].path}</p>}
          {isDragReject && <p>Este formato de arquivo não é aceito</p>}
          {!isDragActive && !hasFile && <p>Arraste ou clique aqui para selecionar o arquivo</p>}
          {!isDragReject && isDragActive && <p>Solte o arquivo</p>}
        </DropZone>
      </section>

      <Button text="Adicionar" disabled={!hasFile || !title} action={handleSubmit} />
    </Container>
  )
}