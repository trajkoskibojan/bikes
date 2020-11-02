import React from 'react';
import Heading from 'components/Heading/Heading';
import Filters from 'components/Filters/Filters';
import { Hr, Main } from 'components/styled/index';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from 'axios-orders'

const Home = () => { 

  return (
      <Main>
        <Heading />
        <Hr />
        <Filters />
      </Main>
  ); 
};

export default withErrorHandler(Home, axios);
