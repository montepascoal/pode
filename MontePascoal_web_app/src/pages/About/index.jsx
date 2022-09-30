import React, { useState } from 'react';
import { useEffect } from 'react';

import Input from '../../components/Input';
import Layout from '../../components/Layout';
import { useLoading } from '../../hooks/useLoading';
import apiProd from '../../services/apiProd';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import * as S from './styles';

import { version } from "../../../package.json";

export default function About () {
  document.title = 'Sobre | Monte Pascoal';

  const [data, setData] = useState([]);

  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    async function getAboutData() {
      try {
        setGlobalLoading(true);

        const { data } = await apiProd.get("/api/public/about");

        const localData = [
          {
            sysKey: 'Nome',
            sysValue: 'Frontend',
          },
          {
            sysKey: 'Versão',
            sysValue: version
          },
          {
            sysKey: 'Última atualização',
            sysValue: new Date(2022, 1, 19, 19, 12).toISOString()
          }
        ];

        setData([...data.resData, ...localData]);
      } catch (err) {
        console.error('ERROR API [GET] /api/public/about: ' + err)
      } finally {
        setGlobalLoading(false);
      }
    }

    getAboutData();
  }, [setGlobalLoading]);

  const isDate = (date) => {
    const dateStart = date.slice(0,10);
    const regex = /[0-9]+-[0-9]+-[0-9]+/i;
    return regex.test(dateStart);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', {
      locale: ptBr
    })
  }

  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Sobre</S.Title>
        </S.Wrapper>

        <S.AboutContent>
          {data.map((item, index) => (
            <Input
              key={item.sysKey + index}
              label={item.sysKey}
              value={isDate(item.sysValue) ? formatDate(item.sysValue) : item.sysValue}
              disabled={true}
            />
          ))}
        </S.AboutContent>
      </S.Container>
    </Layout>
  );
}