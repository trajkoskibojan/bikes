import {
  H4,
  InputStyled as Input,
  Svg,
  Grid,
  H2,
  H3,
  Hr,
  Button, Main
} from 'components/styled';
import React, { useState } from 'react';
import lock from 'assets/icons/lock.svg';
import styled from 'styled-components';
import Orders from 'components/Orders/Orders';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid'
import * as actions from 'store/actions'

const Wrap = styled(Main)`
  margin: 6rem auto;
`;

const Checkoutinfo = styled.div`
  flex: 0 0 60%;
  ${H3} {
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  & .radio {
    display: none;
  }

  & .label {
    font-size: 1.6rem;
    cursor: pointer;
    position: relative;
    padding-left: 4.5rem;
  }

  & .radio:checked ~ .label .span::after {
    opacity: 1;
  }

  & .inputwrap {
    padding: 1rem 0;
  }

  & .marginbtn {
    margin-bottom: 2rem;
  }
`;

const Summaryinfo = styled.div`
  flex: 0 0 40%;
`;

const Span = styled.span`
  height: 2.5rem;
  width: 2.5rem;
  border: 4px solid #0f7c90;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: -0.4rem;

  &::after {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    background-color: #0f7c90;
    transition: opacity 0.2s;
  }
`;

const Radiowrap = styled.div`
  margin: 3rem 0;
`;

const Card = styled.div`
  border: 1px solid #dedfe0;
  background: #f8f8f9;
  width: 100%;
  padding: 2rem 3rem;
  margin-bottom: 8rem;

  ${Input} {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  & .month {
    margin-right: 2.5rem;
  }

  ${H3} {
    font-size: 1.5rem;
  }
`;

const P = styled.p`
  font-size: 11px;
  color: #cacbcc;
`;

const Wrapsum = styled.div`
  border: 1px solid #e8e9eb;
  padding: 2rem;
  position: fixed;
  right: 5rem;
  width: 34%;

  ${H2} {
    font-weight: 900;
  }

  ${H3} {
    font-weight: 400;
    font-size: 1.5rem;
  }

  & .total {
    font-size: 2rem;
    font-weight: 700;
  }

  & p:first-of-type {
    margin-bottom: 2.5rem;
  }

  & p:last-of-type {
    margin-bottom: 1rem;
  }

  ${Button} {
    background-color: #ec5252;
    border-color: #ec5252;
    width: 100%;

    &:disabled {
      background-color: #f08f8f;
      border-color: #f08f8f;
      cursor: not-allowed;
    }
  }
`;

const Checkout = (props) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch()
  const { cart, total } = useSelector((state) => {
    return {
      cart: state.home.cart,
      total: state.home.total,
    };
  });

  const checkedHandler = () => {
    setChecked(!checked);
  };

  const completeNavigation = () => {
      props.history.push('/cart/checkout/complete');
  };

  return (
    <Wrap>
      <Grid justifyContent="flex-start">
        <Checkoutinfo>
          <H2>Checkout</H2>
          <H3>Billing Address</H3>
          <Input
            border="true"
            type="text"
            placeholder="Macedonia"
            width="50%"
            allowed="not-allowed"
            readOnly
          />
          <Radiowrap>
            <Grid
              justifyContent="flex-start"
              alignItems="center"
              className="inputwrap"
            >
              <div>
                <input
                  type="radio"
                  id="small"
                  className="radio"
                  name="size"
                  checked={checked}
                  onChange={checkedHandler}
                />
                <label htmlFor="small" className="label">
                  <Span className="span" />
                </label>
              </div>
              <H4>New Payment Card</H4>
            </Grid>
            <Grid
              justifyContent="flex-start"
              alignItems="center"
              className="inputwrap"
            >
              <div>
                <input
                  type="radio"
                  id="large"
                  className="radio"
                  name="size"
                  onChange={checkedHandler}
                />
                <label htmlFor="large" className="label">
                  <Span className="span" />
                </label>
              </div>
              <H4>PayPal</H4>
            </Grid>
          </Radiowrap>
          {checked ? (
            <Card>
              <Input
                border="true"
                type="text"
                placeholder="Name on Card"
                allowed="not-allowed"
                readOnly
              />
              <Input
                border="true"
                type="number"
                placeholder="Card Number"
                allowed="not-allowed"
                readOnly
              />
              <Grid justifyContent="flex-start">
                <Input
                  border="true"
                  type="number"
                  placeholder="MM / YY"
                  allowed="not-allowed"
                  readOnly
                  className="month"
                />
                <Input
                  border="true"
                  type="number"
                  placeholder="Security Code"
                  allowed="not-allowed"
                  readOnly
                />
              </Grid>
              <Input
                border="true"
                type="number"
                placeholder="Zip/Postal Code"
                allowed="not-allowed"
                width="48%"
                readOnly
              />
              <Grid justifyContent="flex-end">
                <Svg icon_path={lock} icon_id="Page-1" large="true" />
                <P>
                  Secure <br /> Connection
                </P>
              </Grid>
            </Card>
          ) : (
            <Card>
              <H3>
                In order to complete your transaction, we will transfer you over
                to PayPal's secure servers.
              </H3>
              <Grid justifyContent="flex-end">
                <Svg icon_path={lock} icon_id="Page-1" large="true" />
                <P>
                  Secure <br /> Connection
                </P>
              </Grid>
            </Card>
          )}
          <H2 className="marginbtn">Order Details</H2>
          {cart.map((bike) => (
            <Orders
              key={uuid()}
              image={bike.image}
              brand={bike.brand}
              gender={bike.gender}
              price={bike.price}
              name={bike.name}
              id={bike.id}
              flex="0 0 21%"
            /> 
          ))}
        </Checkoutinfo>
        <Summaryinfo>
          <Wrapsum>
            <H2>Summary</H2>
            <Grid justifyContent="space-between" alignItems="center">
              <H3>Original Price:</H3>
              <H3>${total + total * 0.3}</H3>
            </Grid>
            <Grid justifyContent="space-between" alignItems="center">
              <H3>Discount:</H3>
              <H3>-${total * 0.3}</H3>
            </Grid>
            <Hr />
            <Grid justifyContent="space-between" alignItems="center">
              <H3 className="total">Total:</H3>
              <H2>${total}</H2>
            </Grid>
            <p>
              Bike store is required by law to collect applicable transaction
              taxes for purchases made in certain tax jurisdictions.
            </p>
            <p>
              By completing your purchase you agree to these Terms of Service.
            </p>
            <Button disabled={!cart.length > 0} onClick={() => { completeNavigation(); dispatch(actions.onCompleteOrder())}}>Complete Payment</Button>
          </Wrapsum>
        </Summaryinfo>
      </Grid>
    </Wrap>
  );
};

export default Checkout;
