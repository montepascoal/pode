import { StatusContainer } from './styles';
import { FiCheckCircle } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';

export function StatusComponent({ cell }) {
  const status = cell.getValue();
  const data = cell.getData();

  const statusColor = {
    'Ativo': "var(--success)",
    'Inativo': "var(--error)"
  };

  const color = statusColor[status];
  const label = status;

  function handleClick(e) {
    if (e.button === 1) {
      window.open(`${window.location.origin}/unidades/visualizar/${data.id}`, "_blank");
    }
  }

  return (
    <StatusContainer status={status} onMouseUp={handleClick}>
      {status === 'Ativo' ? <FiCheckCircle color={color} title={label}/> : <CgCloseO color={color} title={label}/>}
    </StatusContainer>
  );
};