import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, H3, H4 } from 'components/styled';
import { Svg, Links } from 'components/styled';
import star from 'assets/icons/star.svg';
import heart from 'assets/icons/heart_red.svg';
import heart_fill from 'assets/icons/heart_fill.svg';
import { withRouter } from 'react-router';
import check from 'assets/icons/check.svg'; 
import * as actions from 'store/actions'
import { useDispatch } from 'react-redux';

const Tag = styled.div`
  background-color: ${(p) => (p.isHighest ? '#ffe799' : '#ffc48c')};
  color: ${(p) => (p.isHighest ? '#593d00' : '#592b00')};
  display: ${(p) => (p.isHighest === 'none' ? 'none' : ' inline-block')};
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  white-space: nowrap;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const Popover = styled.div`
  width: 30rem;
  height: auto;
  padding: 3rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.16);
  position: absolute;
  z-index: 900;
  top: -24%;
  left: ${(props) => (props.showpop ? '100%' : undefined)};
  right: ${(props) => (props.showpop ? undefined : '100%')};
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;

  & ul {
    list-style-image: url(${check});
    padding: 2rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    & li {
      font-size: 1.3rem;
    }
  }

  & .tags {
    margin-bottom: 1rem;
    & p {
      font-size: 1.1rem;
      color: #47945a;
    }
  }

  ${Tag} {
    margin: 0 1rem 0 0;
  }

  ${Button} {
    margin-right: 1.5rem;
    width: 17rem;
    padding: 1.7rem 0;
  }

  & a {
    text-decoration: none;
  }

`;

const Wrapsvg = styled.div`
  width: 5rem;
  height: 5rem;
  border: 1px solid #ec5252;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Inner = styled.div`
  padding: 0 1.5rem 3rem 1.5rem;
`;

const Contentwrap = styled.div`
  width: calc(100% / 3);
  border-radius: 4px;
  position: relative;

  ${Inner}:hover {
    ${Popover} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Img = styled.div`
  padding: 2rem;
  width: 100%;
  height: 18rem;
  background-color: #ec5252;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  img {
    width: 85%;
    display: block;
    margin: 0 auto;
  }

  div {
    display: flex;
  }
`;

const Name = styled.div`
  padding: 1.5rem;
  color: #3c3b37;
`; 


const Link = styled(Links)`
  border-radius: 4px;
`;

const Content = (props) => {
  const { stars, name, price, image, id, isAdded, isFavorite} = props;
  const [show, setShow] = useState('');
  const [element, setElement] = useState('');
  const dispatch = useDispatch();

  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleEnter = (e) => {
    setElement(e.currentTarget.getBoundingClientRect());
  };

  useEffect(() => {
    setShow(element.right + 330 <= window.innerWidth);
  }, [element.right]);

  const starsArr = [];
  for (let i = 0; i < stars; i++) {
    starsArr.push(<Svg mid icon_path={star} icon_id="star" />);
  }

  let tag = null;
  let isHighest = null;

  if (stars === 4) {
    tag = 'Best-Selling';
  }

  if (stars === 3) {
    tag = 'Highest rate';  
    isHighest = true;
  }

  if (stars === 1 || stars === 2) {
    isHighest = 'none';
  }
  
  return (
    <Contentwrap onMouseEnter={handleEnter}>
      <Inner>
        <Link to={'/bike/' + id}>
          <Img>
            <img src={require(`../../../assets/img/${image}.png`)} alt="bike" />
          </Img>
          <Name>
            <H4>{name}</H4>
            <p>$ {price}</p>
            <div>{starsArr}</div>
            <Tag isHighest={isHighest}>{tag}</Tag>
          </Name>
        </Link>
        <Popover showpop={show}>
          <H3>{name}</H3>
          <Grid
            justifyContent="flex-start"
            alignItems="baseline"
            className="tags"
          >
            <Tag isHighest={isHighest}>Higest</Tag>
            <p>
              Updated {monthsList[month]} {year}
            </p>
          </Grid>
          <p>
            {name} it the best of class bicycles for price of ${price}
          </p>
          <ul>
            <li>Top reated store</li>
            <li>Lowest price</li>
            <li>High performance and service</li>
          </ul>
          <Grid
            justifyContent="flex-start"
            alignItems="center"
            style={{ height: '5rem' }}
          >
            {!isAdded ? (
              <Button
                onClick={() => {
                  dispatch(actions.onAddToCartHandler(id));
                  dispatch(actions.onRemoveToFavorities(id));
                  dispatch(actions.onCalcTotal());
                }}
              >
                Add to cart
              </Button>
            ) : (
              <Link to="/cart">
                <Button >Go to cart</Button>
              </Link>
            )}
            <Wrapsvg
              onClick={() => {
                !isFavorite
                  ? dispatch(actions.onAddToFavorities(id)) &&
                    dispatch(actions.onRemoveToCart(id))
                  : dispatch(actions.onRemoveToFavorities(id));
              }}
            >
              {!isFavorite ? (
                <Svg icon_path={heart} icon_id="Layer_1" />
              ) : (
                <Svg icon_path={heart_fill} icon_id="Layer_1" />
              )}
            </Wrapsvg>
          </Grid>
        </Popover>
      </Inner>
    </Contentwrap>
  );
};

export default withRouter(Content);
