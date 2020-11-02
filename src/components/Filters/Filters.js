import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { H2, Ul, H3, Hr, Grid, Svg, H1 } from 'components/styled';
import Filter from './Filter/Filter';
import Content from './Content/Content';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import next from 'assets/icons/next.svg';
import previouse from 'assets/icons/previouse.svg';
import * as actions from 'store/actions';
import Spinner from 'components/Spinner/Spinner';

const filterBrandNames = [
  'LE GRAND BIKES',
  'KROSS',
  'EXPLORER',
  'VISITOR',
  'PONY',
  'FORCE',
  'E-BIKES',
  'IDEAL',
];

const Section = styled.section`
  display: flex;
  margin: 5rem 0;
  > div:first-of-type {
    width: 25%;
    margin: 3rem 0;
  }

  ${H2} {
    margin: 3rem 0 2rem 0;
  }
  ${H3} {
    margin-bottom: 2rem;
  }
`;

const Wrap = styled.div`
  width: 75%;
  margin-left: 5%;
`;

const Contentwrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 0 0;
  margin: 2rem 0;

  ${H1} {
    color: #c6c6c6;
    margin: 0 auto;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0 8rem 0;
  visibility: ${(p) => p.show || 'hidden'};

  & .nextNav {
    width: 8rem;
    display: ${(p) => (p.showNext ? 'none' : 'flex')};
  }

  & .prevNav {
    width: 8rem;
    display: ${(p) => (p.showPrev ? 'none' : 'flex')};
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-weight: 700;
  font-size: 1.2rem;
  background: ${(props) => props.color || '#ffe799'};
  border: 1px solid #e0cd8d;
  cursor: pointer;

  &:hover {
    background: #e2cb7f;
  }

  & .next {
    margin-right: 1rem;
  }
  & .prev {
    margin-right: 1rem;
  }
`;

let curPage = 1;

const Filters = (props) => {
  const [bikesOnPage, setBikesOnPage] = useState([]);

  const dispatch = useDispatch();

  const { bikes, products, isMatched, loading } = useSelector((state) => ({
    bikes: state.home.bicikle,
    products: state.home.products,
    isMatched: state.home.isMatched,
    loading: state.home.loading,
  }));

  useEffect(() => {
    if (products.length > 0) {
      setBikesOnPage(products.slice(0, 6));
    } else {
      handleBikes(curPage, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, bikes]);

  const filterize = (filterName, type) => {
    filterName = bikes.filter((product) => {
      return product[type] === filterName;
    });
    return filterName;
  };

  let bikesPerPage = 6;
  const handleBikes = (page, scrolled) => {
    curPage = parseInt(page);
    let start = (curPage - 1) * bikesPerPage;
    let end = (curPage - 1) * bikesPerPage + bikesPerPage;

    let bikesPage;
    products.length > 0
      ? (bikesPage = products.slice(start, end))
      : (bikesPage = bikes.slice(start, end));
    setBikesOnPage(bikesPage);
    scrolled && window.scrollTo(280, 280);
  };

  let pages = [];

  let page;
  products.length > 0
    ? (page = Math.ceil(products.length / 6))
    : (page = Math.ceil(bikes.length / 6));

  const nextHandler = () => {
    if (curPage >= 1 && curPage !== page) {
      curPage = curPage + 1;
      handleBikes(curPage, true);
    }
  };

  const prevHandler = () => {
    if (curPage <= page && curPage !== 1) {
      curPage = curPage - 1;
      handleBikes(curPage, true);
    }
  };

  if (bikes) {
    for (let i = 1; i <= page; i++) {
      pages.push(
        <Navigation
          color={curPage === i ? '#e2cb7f' : '#ffe799'}
          onClick={() => handleBikes(i, true)}
        >
          {i}
        </Navigation>
      );
    }
    pages.push(
      <Navigation className="nextNav" onClick={nextHandler}>
        <p className="next">next</p>
        <Svg icon_path={next} icon_id="Layer_1" />
      </Navigation>
    );
    pages.unshift(
      <Navigation className="prevNav" onClick={prevHandler}>
        <Svg icon_path={previouse} icon_id="Layer_1" className="prev" />
        <p>prev</p>
      </Navigation>
    );
  }

  return (
    <Section>
      <div>
        <Ul>
          <H2>Filter by</H2>
          <Filter
            toggleAll={() => {
              dispatch(actions.onToggleAll());
              curPage = 1;
            }}
            allProducts={bikes}
            dataType="all"
            filterName="Show all"
          />
        </Ul>
        <Hr />
        <H3>Gender</H3>
        <Ul>
          <Filter
            toggleFilters={(event) => {
              dispatch(actions.onToggleFilters(event));
              curPage = 1;
            }}
            filterize={filterize}
            dataType="gender"
            filterName="Male"
          />
          <Filter
            toggleFilters={(event) => {
              dispatch(actions.onToggleFilters(event));
              curPage = 1;
            }}
            filterize={filterize}
            dataType="gender"
            filterName="Female"
          />
        </Ul>
        <Hr />
        <H3>Brand</H3>
        <Ul>
          {bikes &&
            filterBrandNames.map((brandName) => (
              <Filter
                key={uuid()}
                toggleFilters={(event) => {
                  dispatch(actions.onToggleFilters(event));
                  curPage = 1;
                }}
                filterize={filterize}
                dataType="brand"
                filterName={brandName}
              />
            ))}
        </Ul>
      </div>
      {!loading ? (
        <Wrap>
          <Contentwrap>
            {isMatched ? (
              bikesOnPage.map((bike) => (
                <Content
                  id={bike.id}
                  stars={bike.stars}
                  name={bike.name}
                  price={bike.price}
                  image={bike.image}
                  isAdded={bike.isAdded}
                  isFavorite={bike.isFavorite}
                />
              ))
            ) : (
              <H1>NO items FOUND ...</H1>
            )}
          </Contentwrap>
          <Grid justifyContent="center" alignItems="center">
            {isMatched ? (
              <Pagination
                show={bikesOnPage.length > 0}
                showPrev={curPage === 1}
                showNext={curPage === page}
              >
                {pages}
              </Pagination>
            ) : null}
          </Grid>
        </Wrap>
      ) : (
        <Spinner />
      )}
    </Section>
  );
};

export default Filters;
