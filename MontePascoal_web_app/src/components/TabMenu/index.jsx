import { useEffect, useCallback } from 'react';
import { Container, TabItem } from './styles';
import { useHistory } from 'react-router-dom';

export function TabMenu({ tabs, currentTab, setCurrentTab, children, ...rest }) {
  const history = useHistory();

  const handleSetTab = useCallback((e, index) => {
    
    if(e.ctrlKey || e.shiftKey) {
      window.open(`${window.location.origin}${history.location.pathname}?tab=${index}`);
    } else {
      setCurrentTab(index);
      history.push(`${history.location.pathname}?tab=${index}`);
    }
  }, [history, setCurrentTab]);
  
  useEffect(() => {
    const current = history.location.search.split("?tab=")[1];

    if (current) {
      const tab = Number(current);
      setCurrentTab(tab);
      history.push(`${history.location.pathname}?tab=${tab}`);
    }
  }, [history, setCurrentTab]);

  function handleMouseUp(e, index) {
    if (e.button === 1) {
      window.open(`${window.location.origin}${history.location.pathname}?tab=${index}`);
    }
  }


  return (
    <Container {...rest}>
      {children}
        <section>
        <ul>
          {tabs.map((item, index) => (
            <TabItem
              key={index}
              isCurrent={currentTab === index}
              onMouseUp={(e) => handleMouseUp(e, index)}
              onClick={(e) => handleSetTab(e, index)}
            >
              {item}
            </TabItem>
          ))}
        </ul>
      </section>
    </Container>
  )
}