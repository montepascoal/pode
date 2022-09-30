import * as S from './styles';
import { IoMdClose } from 'react-icons/io';
import { useRef } from 'react';

export function Modal({
  title,
  content,
  modalIsOpen,
  maxWidth,
  closeModal
}) {
  const overRef = useRef(null);

  function handleClose(event) {
    if (event.target === overRef.current) {
      closeModal();
    }
  }

  return (
    <S.Overlay
      isOpen={modalIsOpen}
      onClick={handleClose}
      ref={overRef}
    >
      <S.Container maxWidth={maxWidth}>
        <header>
          <h1>{title}</h1>
          <IoMdClose color="var(--text_1)" onClick={closeModal}/>
        </header>
        <div className="content">
          {content}
        </div>
      </S.Container>
    </S.Overlay>
  )
}