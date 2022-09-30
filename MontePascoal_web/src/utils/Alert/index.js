import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from "react-icons/fa";
import './styles.css';

export default function Alert(type, title, text) {

  if(text === '' || text === undefined || text === null) {
    throw new Error('Parâmetro text não enviada')
  }

  switch (type) {
    case "success":

      title = (title === undefined || title === null) ? 'Sucesso' : title;

      toast.success(
        <div className="Container">
          <FaCheckCircle/>
          <div className="Wrapper">
            <span className="TitleAlert">{title}</span>
            <span>{text}</span>
          </div>
        </div>
      );

      break;
    case "error":

      title = (title === undefined || title === null) ? 'Erro' : title;

      toast.error(
        <div className="Container">
          <FaTimesCircle/>
          <div className="Wrapper">
            <span className="TitleAlert">{title}</span>
            <span>{text}</span>
          </div>
        </div>
      )

      break;
    case "warning":

      title = (title === undefined || title === null) ? 'Alerta' : title;

      toast.warning(
        <div className="Container">
          <FaExclamationCircle/>
          <div className="Wrapper">
            <span className="TitleAlert">{title}</span>
            <span>{text}</span>
          </div>
        </div>
      )

      break;
    default:
      throw new Error('Parâmetro '+ type +' enviado para type incorreto. Valores possivéis: [success, error, warning]')
  }
  
}