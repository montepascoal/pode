import * as S from './styles';

export function ListRow({ cell }) {
  const value = cell.getValue();
  const data = cell.getData();

  function handleClick(e) {
    if (e.button === 1) {
      window.open(`${window.location.origin}/unidades/visualizar/${data.id}`, "_blank");
    }
  }

  return (
    <S.RowContainer onMouseUp={handleClick}>
      <p>{value}</p>
    </S.RowContainer>
  )
}