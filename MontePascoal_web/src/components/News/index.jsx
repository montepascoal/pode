import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import NewsItem from '../NewsItem';

import { FaAngleRight } from "react-icons/fa"
import * as S from './styles';

export default function News () {

  const history = useHistory();

  const [news, setNews] = useState([]);

  useEffect(() => {
    let mounted = true;

    const findNews = async () => {
      try {
        const response = await api.get("/news");

        if(mounted) {
          setNews(response.data);
        }
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /news: ' + error)
      }
    }

    findNews();
    return () =>  { mounted = false; }
  }, [history]);
 
  return (
    <S.Container>
      <S.Title>
        <FaAngleRight />
        NOTÍCIAS
      </S.Title>

      <S.Wrapper>
        {
          news.map((p, i) => {
            let { title, resume, text, author, image, link} = p;

            return (
              <NewsItem 
                key={i}
                title={title}
                resume={resume}
                text={text}
                author={author}
                image={image}
                link={link}
              />
            );
          })
        }
      </S.Wrapper>
    </S.Container>
  );
}