import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from 'containers/Home/Home';
import { Highlight, Scroll, Svg } from 'components/styled';
import { useDispatch, useSelector } from 'react-redux';
import Details from 'containers/Details/Details';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import Carousel from 'components/Carousel/Carousel';
import Profile from 'containers/Profile/Profile';
import Whishlist from 'containers/Whishlist/Whishlist';
import Cart from 'containers/Cart/Cart';
import Checkout from 'containers/Checkout/Checkout';
import CompleteOrder from 'containers/CompleteOrder/CompleteOrder';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import * as actions from 'store/actions';
import arrowup from 'assets/icons/arrowup.svg';
import Auth from 'components/Auth/Auth';

const Global = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin    : 0;
    padding   : 0;
    box-sizing: inherit;
   
  };
  html { 
    font-size: 62.5%;
    overflow-x: hidden;
    --xy: 1;
    scroll-behavior: smooth;
  };
  
  body {
    font-family: 'Montserrat', sans-serif;
    font-weight   : 400;
    box-sizing: border-box;
    color         : #3c3b37;
    line-height: 1.7; 
  };
  p {
    font-size: 1.3rem;
    font-weight:500; 
  };

`;

const App = (props) => {
  let { coords, show, isCheckout } = useSelector((state) => ({
    coords: state.home.coords,
    show: state.home.show,
    isCheckout: state.home.isCheckout,
  }));

  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.onCheckoutRedirect());
    dispatch(actions.onShow());
  }, [dispatch, location]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 20) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <Auth />
      <Highlight coords={coords} highlight={show} />
      <Global />
      <ScrollToTop>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/bike/:id" component={Details} />
          <Route path="/profile/" component={Profile} />
          <Route path="/whishlist/" component={Whishlist} />
          <Route path="/cart/" exact component={Cart} />
          <Route path="/cart/checkout" exact component={Checkout} />
          <Route path="/cart/checkout/complete" component={CompleteOrder} />
        </Switch>
        {isCheckout && (
          <Fragment>
            <Carousel />
            <Footer />
          </Fragment>
        )}
      </ScrollToTop>
      {showScroll && (
        <Scroll onClick={scrollTop}>
          <Svg icon_path={arrowup} icon_id="Layer_1" />
        </Scroll>
      )}
    </Fragment>
  );
};

export default App;
