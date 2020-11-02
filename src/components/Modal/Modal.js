import React, { Fragment } from 'react';
import styled from 'styled-components';
import Backdrop from '../Backdrop/Backdrop';

const Modalwrap = styled.div`
  position: fixed;
  z-index: 9999;
  background-color: white;
  width: 36%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 32%;
  top: 30%;
  box-sizing: border-box;
  transform: ${(p) => (p.showup ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${(p) => (p.showup ? 1 : 0)};
  transition: all 0.3s ease-out;
`;

const Modal = ({ showup, modalClosed, children }) => {
  return (
    <Fragment>
      <Backdrop showup={showup} clicked={modalClosed} />
      <Modalwrap showup={showup}>{children}</Modalwrap>
    </Fragment>
  );
};

export default React.memo( 
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
