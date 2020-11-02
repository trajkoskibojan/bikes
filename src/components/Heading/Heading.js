import React from 'react';
import styled from 'styled-components';
import { Grid, H1, H4, Svg, InputStyled as Input, Button } from 'components/styled/index';
import smaller from 'assets/icons/smaller.svg';
import * as actions from 'store/actions'
import { useDispatch, useSelector } from 'react-redux';

const Section = styled.section`
  margin-top: 6rem;
`;

const Div = styled.div`
  height: 7rem;

  ${Input} {
    border: 0;
    height: 3rem;
    padding: 0 1rem;
  }

  ${Button} {
    height: 3.6rem;
    min-width: 7rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:disabled {
      background-color: #0f7c8fb5;
      border-color: #0f7c8fb5;
      cursor: not-allowed;
    }
  }

  & .select {
    height: 3.6rem;
    padding: 0 0 0 0.5rem;
    border: 1px solid #d5d5d5;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  & p {
    color: #ec5252;
    font-size: 1.1rem;
  }
`;

const Heading = () => {
  const dispatch = useDispatch()
  const {priceValue, priceHolder} = useSelector(state => ({
    priceValue: state.home.priceValue,
    priceHolder: state.home.priceHolder
  }))

  return (
    <Section>
      <Grid justifyContent="space-between" alignItems="flex-end">
        <H1>Bikes</H1>
        <Div>
          <H4>Filter by Price:</H4>
          <Grid justifyContent="center" alignItems="center">
            <Grid
              justifyContent="center"
              alignItems="center"
              className="select"
            >
              <Svg icon_path={smaller} icon_id="Layer_1" mid="true" />
              <Input type="number" width="18rem" placeholder={priceHolder} value={priceValue} onChange={(e) => dispatch(actions.onPriceChangeHandler(e))}/>
            </Grid>
            <Button disabled={priceValue === ''} onClick={() => dispatch(actions.onFilterPrice())}>Filter</Button>
          </Grid>
          {priceValue <= 5990 && priceValue !== '' ? <p>Please enter price higher then 5990</p> : null}
        </Div>
      </Grid>
    </Section>
  );
};

export default Heading
