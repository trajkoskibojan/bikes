/* import React from 'react';
import {InputStyled} from 'components/styled'

const Input = (props) => {
  
  const { type, config, value, change, border } = props;

  let inputElement = null;

  switch (type) {  
    case 'input': 
      inputElement = (
        <InputStyled {...config} value={value} onChange={change} border={border} />
      );
      break;
    default:
      inputElement = (
        <InputStyled {...config} value={value} onChange={change} />
      );
  }

  return inputElement;
};

export default Input; */
