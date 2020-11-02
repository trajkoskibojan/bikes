import React, { Fragment } from 'react';
import styled from 'styled-components';
import home from 'assets/icons/home.svg';
import { v4 as uuid } from 'uuid';

import { Grid, H1, H2, H3, Main, Svg } from 'components/styled';
import { useSelector } from 'react-redux';
import Content from 'components/Filters/Content/Content';

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

  & + ${H3} {
    margin-bottom: 3rem;
    padding: 0 14.5rem;
  }

  & ~ ${H1} {
    color: #c6c6c6;
    display: block;
    text-align: center;
    margin-bottom: 5rem;
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

const Wrap = styled(Main)`
  padding: 0 10rem 10rem 10rem;
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-wrap: wrap;
`;

const Whishlist = (props) => {
  const favorites = useSelector((state) => state.home.favorites);

  return (
    <Fragment>
      <Heading>
        <Grid justifyContent="flex-start" alignItems="center">
          <Svg icon_id="Layer_1" icon_path={home} mid="true"></Svg>{' '}
          <P>Whishlist</P>
        </Grid>
        <H2>Whishlist</H2>
      </Heading>
      <H3>Your Whishlist</H3>
      {favorites.length > 0 ? (
        <Wrap>
          {favorites.map((bike) => (
            <Content
              key={uuid()}
              id={bike.id}
              stars={bike.stars}
              name={bike.name}
              price={bike.price}
              image={bike.image}
              isAdded={bike.isAdded}
              isFavorite={bike.isFavorite}
            />
          ))}
        </Wrap>
      ) : (
        <H1>Your Whishlist is empty</H1>
      )}
    </Fragment>
  );
};

export default Whishlist;
