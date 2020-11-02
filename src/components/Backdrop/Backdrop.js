import React from 'react';
import styled from 'styled-components'

const Drop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9998; 
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = ({ showup, clicked }) =>
  showup ? <Drop onClick={clicked}></Drop> : null;

export default Backdrop;