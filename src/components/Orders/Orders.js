import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Grid, H4, H5, Svg } from 'components/styled';
import label from 'assets/icons/label.svg';
import * as actions from 'store/actions';
import { useDispatch } from 'react-redux';

const Order = styled.div`
  border: 1px solid #eee;
  padding: 1rem;

  & img {
    margin-right: 1rem;
  }
`;

const Wrapimg = styled.div`
  height: 10rem;
  flex: ${(p) => p.flex || '0 0 17%'};
  padding: 1rem;
`;

const Text = styled.div`
  flex: 0 0 70%;
`;
const Action = styled.div`
  flex: 0 0 15%;
  text-align: right;
  color: #0f7c90;

  & p {
    cursor: pointer;
  }
`;
const Price = styled.div`
  flex: 0 0 15%;
  text-align: right;

  ${H4} {
    color: #ec5252;
    margin-right: 0.5rem;
  }
  ${H5} {
    text-decoration: line-through;
    margin-right: 2.5rem;
  }

  ${Svg} {
    fill: #ec5252;
  }
`;

const Orders = ({
  image,
  brand,
  gender,
  price,
  name,
  showActions,
  flex,
  id,
}) => {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <Order>
        <Grid justifyContent="flex-start" alignItems="center">
          <Wrapimg flex={flex}>
            <img
              width="100%"
              height="100%"
              src={require(`assets/img/${image}.png`)}
              alt="order"
            />
          </Wrapimg>
          <Grid
            justifyContent="space-between"
            alignItems="flex-start"
            style={{ flex: 1 }}
          >
            <Text>
              <H4>{name}</H4>
              <p>
                This is {name} belonges into {gender} category and price of $
                {price}
              </p>
            </Text>
            {showActions ? (
              <Action>
                <p
                  onClick={() => { 
                    dispatch(actions.onRemoveToCart(id));
                    dispatch(actions.onCalcTotal());
                  }}
                >
                  Remove
                </p>
                <p
                  onClick={() => {
                    dispatch(actions.onMoveToWishlist(id));
                    dispatch(actions.onRemoveToCart(id));
                    dispatch(actions.onCalcTotal());
                  }}
                >
                  Move to Wishlist{' '}
                </p>
              </Action>
            ) : null}
            <Price>
              <Grid justifyContent="flex-end" alignItems="center">
                <H4>${price}</H4>
                <Svg
                  icon_id="Layer_1"
                  icon_path={label}
                  fill="#ec5252"
                ></Svg>{' '}
              </Grid>
              <H5>${price + price * 0.3}</H5>
            </Price>
          </Grid>
        </Grid>
      </Order>
    </Fragment>
  );
};

export default Orders;
