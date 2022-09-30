import { useRef, useState } from "react";
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import * as S from "./styles";

export function FormSection({ title, initialVal = false, children }) {
  const [isActive, setIsActive] = useState(initialVal);
  const contentRef = useRef();
  
  return (
    <S.Container isActive={isActive} >
      <div onClick={() => setIsActive(old => !old)}>
        <h3>{title}</h3>
        <MdOutlineKeyboardArrowUp />
      </div>
      <S.Content contentHeight={contentRef?.current?.scrollHeight} isActive={isActive} ref={contentRef}>
        {children}
      </S.Content>
    </S.Container>
  )
}