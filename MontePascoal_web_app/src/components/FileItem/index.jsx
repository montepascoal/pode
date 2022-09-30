import { Container } from "./styles";
import {
  FaFileWord,
  FaFileExcel,
  FaFileVideo,
  FaFileAudio,
  FaFile,
  FaTrash,
  FaFilePdf,
  FaEye,
  FaFileImage
} from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import { useLoading } from "../../hooks/useLoading";
import { fileActionByType } from '../../utils/fileActionByType';

const iconPerExtension = {
  '.pdf': <FaFilePdf />,
  '.xlsx': <FaFileExcel />,
  '.docx': <FaFileWord />,
  '.doc': <FaFileWord />,
  '.odt': <FaFileWord />,
  '.png': <FaFileImage />,
  '.jpeg': <FaFileImage />,
  '.jpg': <FaFileImage />,
  '.wav': <FaFileAudio />,
  '.m4a': <FaFileAudio />,
  '.mp3': <FaFileAudio />,
  '.ogg': <FaFileAudio />,
  '.avi': <FaFileVideo />,
  '.mp4': <FaFileVideo />,
  '.m4v': <FaFileVideo />,
  '.mov': <FaFileVideo />,
  '.wmv': <FaFileVideo />,
};

export function FileItem({ file, companyId, isEditing, handleDelete, onClick, viewOnly }) {
  const history = useHistory();
  const { globalLoading, setGlobalLoading } = useLoading();

  async function handleClick() {
    if(globalLoading) return;

    try {
      setGlobalLoading(true);
      if(isEditing) {
        handleDelete(file.id);
        return
      }
  
      if(viewOnly) {
        await fileActionByType(file);
        return;
      }
  
      if(!!onClick) { 
        onClick(file)
        return
      }
    } catch (err) {
      history.push('/error500');
      console.error(`ERROR API [GET] api/companies/files/${file.filKey}: ` + err)
    }finally {
      setGlobalLoading(false);
    }
  }

  return (
    <Container onClick={handleClick} isEditing={isEditing}>
      <div>
        {iconPerExtension[file.filType.toLowerCase()] ?? <FaFile />}
        <strong>{file.filTitle}</strong>
      </div>
      {isEditing ? <FaTrash /> : <FaEye />}
      
    </Container>
  )
}