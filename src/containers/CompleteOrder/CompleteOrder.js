import { H3, H4, Links as Link } from 'components/styled';
import React from 'react'
import styled from 'styled-components'

const Complete = styled.section`
  padding: 6rem;

  ${H3} {
    color: #0bbd0b;
  }

  ${Link} {
    color: #0f7c90;
  }
`;

const CompleteOrder = () => {
  return (
    <Complete>
      <H3>Successful!!!</H3>
      <H4>
        Thanks for purchesing our products. Your order will be deliver within 21
        days
      </H4>
      <p>Navigate to <Link to='/'>Home page</Link></p>
    </Complete>
  );
}

export default CompleteOrder
