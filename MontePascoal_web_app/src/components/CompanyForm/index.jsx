/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import * as S from './styles';
import { TabMenu } from '../TabMenu';
import { GeralForm } from './GeralForm';
import { RepresentativeList } from './RepresentativeList';
import { FilesList } from './FilesList';

export default function CompanyForm({ initialData, refreshFc }) {

  const [tabs] = useState(['Geral', 'Responsáveis', 'Arquivos']);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <S.Container>
      <TabMenu
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      
      {currentTab === 0 && <GeralForm initialData={initialData} refreshFc={refreshFc}/>}
      {currentTab === 1 && <RepresentativeList companyId={initialData?.id} />}
      {currentTab === 2 && <FilesList companyId={initialData?.id}/>}
    </S.Container>
  )
}