import ReactSelect from 'react-select';
import styled from 'styled-components';
import media from 'styled-query';

const hoverOptions = {
  red     : '#eb333317',
  blue    : '#146ca421',
  primary : '#14a49824'
};

export const OptionSelect = styled(ReactSelect)`
  
  .react-select__control {
    border-radius: 5px;
    border-color: var(--gray-line);
    box-shadow: none;
    margin-top: 15px;
    padding: 1px;

    &:hover {
      border-color: var(--gray-line);
      cursor: pointer;
    }
  }

  .react-select__indicator-separator {
    width: 0px;
  }

  .react-select__indicator {
    color: var(--${({color}) => color});
  }

  .react-select__menu {
    margin-top: 15px;
  }

  .react-select__menu-list {
    padding: 0;
  }

  .react-select__option {
    border-top:    1px solid var(--gray-line);
    border-right:  1px solid var(--gray-line);
    border-bottom: 1px solid var(--gray-line);
    border-left:   3px solid var(--white);
    border-radius: 5px;
    padding: 11px;

    &:hover {
      cursor: pointer;
    }
  }

  .react-select__option--is-focused {
    background-color: ${({color}) => hoverOptions[color]};
    border-left: 3px solid var(--${({color}) => color});
  }

  .react-select__option--is-selected {
    background-color: ${({color}) => hoverOptions[color]};
    border-left: 3px solid var(--${({color}) => color});
    color: var(--text);
  }

`;

export const BoxSelect = styled.div`
  
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  color: var(--text);
  font-size: 14px;

  ${media.lessThan("767px")`
    margin-top: 15px;
  `}
`;