import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import * as S from './styles';

export default function MainSlider () {

  const history = useHistory();

  const [sliders, setSlider] = useState([]);
  const [index, setActiveSlide] = useState(0);

  useEffect(() => {
    
    const findSliders = async () => {
      try {
        const response = await api.get("/slides");
        setSlider(response.data.slice(0, 5));
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /slides: ' + error)
      }
    }

    findSliders();
  }, [history]);

  const goToPrevSlide = () => {
    setActiveSlide((preSlide) => (sliders[preSlide - 1]) ? preSlide - 1 : preSlide);
  };

  const goToNextSlide = () => {
    setActiveSlide((preSlide) => (sliders[preSlide + 1]) ? preSlide + 1 : preSlide);
  };

  return (
    <S.Container>
      <S.WrapperBullets>
        {
          sliders.map((p, i) => {
            return (i !== index) ? <S.Bullet key={i}/> : <S.BulletActive key={i}/>
          })
        }
      </S.WrapperBullets>
      <S.WrapperAngleLeft onClick={goToPrevSlide}>
        <FaAngleLeft />
      </S.WrapperAngleLeft>
      {sliders.length > 0 &&
          <S.Slide slides={sliders[index]} />
      }
      {/* <S.Item src={sliders[index].imgDesktop} /> */}

      <S.WrapperAngleRight onClick={goToNextSlide}>
        <FaAngleRight />
      </S.WrapperAngleRight>
    </S.Container>
  );
}