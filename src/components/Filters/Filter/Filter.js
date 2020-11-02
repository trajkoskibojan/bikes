import React from 'react';
import styled from 'styled-components';
import * as actions from 'store/actions/';
import { useDispatch } from 'react-redux';
import { Li } from 'components/styled';

const Div = styled.div`
  display: flex;
  justify-content: space-between;  
  align-items: center;
  padding-right: 2rem;
`; 

const Badge = styled.span`
  display: flex;
  justify-content:center;
  align-items:center;
  min-width: 3rem;
  padding: 0 7px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  background: #0f7c90;
  border-radius: 1rem;
`;

const Filter = ({
  toggleAll,
  allProducts,
  toggleFilters,
  filterize,
  filterName,
  dataType,
}) => {
  const dispatch = useDispatch();
  return (
    <Div>
      <Li
        onMouseEnter={(e) => dispatch(actions.onHighlightLink(e))}
        onClick={(e) => {
          dataType === 'all' ? toggleAll(e) : toggleFilters(e);
        }}
        data-type={dataType}
      >
        {filterName}
      </Li>
      <Badge>
        {
          dataType === 'all'
            ? allProducts.length
            : filterize(filterName.toUpperCase(), dataType).length
        }
      </Badge>
    </Div>
  );
};

export default Filter;
