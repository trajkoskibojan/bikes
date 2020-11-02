import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const Li = styled.li`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  color: #5f5f5f;
  margin: 0.5rem 0;
  cursor: pointer;
  position: relative;
  z-index: 2;
  padding: 0 10px;
`;

export const Links = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #3c3b37;
  display: block;
`;

export const H1 = styled.h1`
  font-size: 5rem;
  font-weight: 500;
`;

export const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
`;

export const H3 = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: ${(p) => p.color};
`;

export const H4 = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const H5 = styled.h4`
  font-size: 1.3rem;
  font-weight: 500;
`;

export const Hr = styled.hr`
  border: 0;
  margin-top: ${(p) => p.top || '2rem'};
  border-top: 1px solid #eee;
  margin-bottom: ${(p) => p.bottom};
`;

const Svgs = styled.svg`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  fill: ${(p) => p.fill};

  ${({ large }) =>
    large &&
    css`
      width: 4rem;
      height: 4rem;
    `};

  ${({ sm }) =>
    sm &&
    css`
      width: 2.5rem;
      height: 2.5rem;
    `};

  ${({ mid }) =>
    mid &&
    css`
      width: 1.5rem;
      height: 1.5rem;
    `};
`;

export const Svg = ({ icon_path, icon_id, ...props }) => (
  <Svgs {...props}>
    <use xlinkHref={`${icon_path}#${icon_id}`} />
  </Svgs>
);

export const InputStyled = styled.input`
  padding: 1.5rem 2rem;
  color: #3c3b37;
  font-size: 1.3rem;
  width: ${(props) => props.width || '100%'};
  border: ${(p) => (p.border ? '1px solid #d5d5d5' : 0)};
  cursor: ${(p) => p.allowed || 'auto'};

  &:focus {
    outline: none;
  }
`;

export const Highlight = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #ffe799;
  border-radius: 20px;
  display: ${(p) => (p.highlight ? 'inline-block' : 'none')};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  ${({ coords }) =>
    coords &&
    css` 
      width: ${(p) => p.coords.width + 'px'};
      height: ${(p) => p.coords.height + 'px'};
      transform: translate(
        ${(p) => p.coords.left + 'px'},
        ${(p) => p.coords.top + 'px'}
      );
    `}
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  min-width: 13rem;
  height: 5rem;
  justify-content: center;
  background-color: ${(p) => (p.color ? 'transparent' : '#0f7c90')};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(p) => (p.color ? '#0f7c90' : 'white')};
  border: 1px solid #0f7c90;
  letter-spacing: 1px;
  outline: none;

  &:hover {
    background-color: ${(p) => (p.color ? '1px solid #eee' : '#094c59')};
  }
`;

export const Grid = styled.div`
  display: flex;
  justify-content: ${(p) => p.justifyContent};
  align-items: ${(p) => p.alignItems};
`;

export const Main = styled.main`
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Scroll = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e2;
  position: fixed;
  right: 1%;
  bottom: 5%;
  border: 1px solid #808080;
  border-radius: 5px; 
  cursor: pointer;
  z-index: 1000;
`;
