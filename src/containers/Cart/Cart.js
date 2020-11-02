import React, { Fragment } from 'react';
import styled from 'styled-components';
import home from 'assets/icons/home.svg';
import Orders from 'components/Orders/Orders';
import * as actions from 'store/actions';

import { Button, Grid, H1, H2, H3, H4, Main, Svg } from 'components/styled';
import { InputStyled as Input } from 'components/styled';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuid} from 'uuid'

const Heading = styled.section`
  height: 15rem;
  background-color: #505763;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5rem;

  ${H2} {
    color: white;
    font-weight: 500;
  }
`;

const Wrap = styled(Main)`
  padding: 3rem 15px 10rem 15px;

  ${H3} {
    margin-bottom: 1.5rem;
  }

  ${H1}:first-child {
    color: #c6c6c6;
    display: block;
    text-align: center;
    margin-top: 5rem;
    width: 100%;
  }
`;

const P = styled.p`
  color: white;
  font-size: 1.8rem;
  font-weight: 400;

  &::before {
    content: '/';
    padding: 0 0.8rem;
  }
`;
const Checkout = styled.div`
  flex: 0 0 25%;
  padding-left: 3rem;
  margin-top: -3rem;

  ${Grid} {
    border: 1px solid #d5d5d5;
  }
  ${Button} {
    width: 100%;
    margin-bottom: 1.5rem;
    background-color: #ec5252;
    border: 1px solid #ec5252;
    &:hover {
      background-color: #f94e4e;
    }

    &:disabled {
      background-color: #f08f8f;
      border-color: #f08f8f;
      cursor: not-allowed;
    }
  }
  ${H4} {
    text-decoration: line-through;
    color: #adadad;
  }
  ${H3} {
    color: #adadad;
  }
`;

const Review = styled.div`
  flex: 0 0 75%;
`;

const Btn = styled.div`
  background-color: #ec5252;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  color: white;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
  border: 1px solid #ec5252;
`;

const Cart = (props) => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => {
    return {
      cart: state.home.cart,
      total: state.home.total,
    };
  });

  const checkoutHandler = () => {
    props.history.push('/cart/checkout');
  };

  return (
    <Fragment>
      <Heading>
        <Grid justifyContent="flex-start" alignItems="center">
          <Svg icon_id="Layer_1" icon_path={home} mid="true"></Svg>{' '}
          <P>Shopping Cart</P>
        </Grid>
        <H2>Shopping Cart</H2>
      </Heading>
      <Wrap>
        <H3>Your Cart Orders</H3>
        <Grid justifyContent="flex-start">
          {cart.length > 0 ? <Review>
            {cart.map((bike) => (
              <Orders
                key={uuid()}
                image={bike.image}
                brand={bike.brand}
                gender={bike.gender}
                price={bike.price}
                name={bike.name}
                id={bike.id}
                showActions="true"
              />
            ))}
          </Review> : <H1>Your Cart list is empty</H1>}
          <Checkout>
            <H2>Total:</H2>
            <H1>${total}</H1>
            <H4>${total + (total * 0.3)}</H4>
            <H3>30% off</H3>
            <Button
              disabled={!cart.length > 0}
              onClick={() => {
                checkoutHandler();
                dispatch(actions.onCheckoutRedirect());
              }}
            >
              Checkout
            </Button>
            <Grid justifyContent="center">
              <Input type="text" placeholder="Enter Coupon" />
              <Btn>Apply</Btn>
            </Grid>
          </Checkout>
        </Grid>
      </Wrap>
    </Fragment>
  );
};

export default Cart;
