import Button from '../Button';
import { Container } from './styles';
import { useLoading } from "../../hooks/useLoading";
import apiProd from "../../services/apiProd";
import { useHistory } from 'react-router-dom';
import { fileActionByType } from '../../utils/fileActionByType';

export function FileViewOptions({ companyId, file }) {
  const history = useHistory();
  const { globalLoading, setGlobalLoading } = useLoading();

  async function handleDownload() {
    try {
      setGlobalLoading(true);
      const response = await apiProd.get(`/api/companies/${companyId}/files/${file?.id}`, {
        responseType: 'blob'
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      const link = document.createElement('a');
      link.href = url;
      link.className = "downloadLink";
      link.setAttribute('download', `${file.filTitle}${file.filType}`);
      document.body.appendChild(link);
      link.click();
    } catch(err) {
      history.push('/error500');
      console.error(`ERROR API [GET] /api/companies/${companyId}/files/${file?.id}: ` + err)
    } finally {
      setGlobalLoading(false);
    }

  }

  async function handleView() {
    try {
      setGlobalLoading(true);

      await fileActionByType(file);
    } catch (err) {
      history.push('/error500');
      console.error(`ERROR API [GET] api/companies/files/${file.filKey}: ` + err)
    }  finally {
      setGlobalLoading(false);
    }
  }
 
  return (
    <Container>
      <Button text="Baixar arquivo" disabled={globalLoading} action={handleDownload} />
      <Button text="Visualizar arquivo" disabled={globalLoading} action={handleView}/>
    </Container>
  )
}