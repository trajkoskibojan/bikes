import {
  Button,
  Grid,
  H1,
  H2,
  H4,
  H5,
  Links,
  Main,
  Svg, 
} from 'components/styled';
import React, { Fragment, useEffect, useState } from 'react';
import * as actions from 'store/actions';
import styled from 'styled-components';
import details from 'assets/img/details.jpg';
import axios from 'axios-orders';
import heart from 'assets/icons/heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

const Heading = styled.section`
  background-image: url(${details});
  background-position: center;
  background-size: cover;
  height: 75vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Mainsec = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 0 60px 0;
`;

const Wrapmid = styled.div`
  width: 35%;
`;

const Wrap = styled.div`
  text-align: center;
  border: 1px solid #e2e2e2;
  padding: 2rem;
  margin-right: 3rem;
  background: #f8f8f8;
  box-shadow: 0 4px 8px #dedede;

  ${H2} {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  ${Button} {
    height: 5rem;
  }
`;

const Wrapleft = styled.div`
  width: 45%;
  text-align: center;
  border: 1px solid #e2e2e2;
  padding: 2rem;
  margin-right: 3rem;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Seller = styled.div`
  width: 20%;

  & .info {
    margin-bottom: 2rem;
  }
`;

const Infotop = styled.div`
  border: 1px solid #e2e2e2;
  padding: 1rem;
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px #dedede;

  & .heart {
    margin-right: 1rem;
  }

  & p {
    font-size: 1.2rem;
    color: #a1a1a1;
  }

  ${H4} {
    margin-bottom: 2rem;
  }
`;

const Input = styled.input`
  border: 1px solid #d5d5d5;
  height: 3rem;
  color: #3c3b37;
  font-size: 1.3rem;
  padding: 5px;
  width: 50px;
`;

const Description = styled.section`
  padding: 3rem 0;
  margin-bottom: 6rem;
  & .fieldset {
    padding: 2rem;
    & .legend {
      font-size: 2rem;
      font-weight: bold;
    }
  }
`;

const Specification = styled.div`
  margin-top: 2rem;
  & p {
    font-size: 1rem;
    font-weight: 500;
    color: #949494;
    width: 80%;
  }

  ${H5} {
    width: 20%; 
  }
`;

const Link = styled(Links)`
  height: 100%;
  border-radius: 4px;
`;

const Details = (props) => {
  const [bike, setBikes] = useState({});
  const [value, setValue] = useState(1);
  const [isExist, setIsExist] = useState(false)
  const dispatch = useDispatch();
  const cart = useSelector(state => state.home.cart)

  useEffect(() => {
    axios('/products').then((res) => {
      let data = [];
      setIsExist(cart.find((el) => el.id === +props.match.params.id))
      if (res.data) {
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            ...res.data[i],
            id: i + 1,
            isAdded: isExist,
          });
        }
        const curBike = data.find((el) => el.id === +props.match.params.id);
        setBikes(curBike);
      }
    });
  }, [props.match.params.id, cart, isExist]);

  const checkoutHandler = () => {
    props.history.push('/cart/checkout');
  }; 
  
  return (
    <Fragment>
      <Heading>
        <H1>{bike.name}</H1>
      </Heading>
      <Main>
        <Mainsec>
          <Wrapleft>
            {bike.image && (
              <img
                src={require(`assets/img/${bike.image}.png`)}
                alt="bikeimage"
                style={{ width: '70%' }}
              />
            )}
          </Wrapleft>
          <Wrapmid>
            <Wrap>
              <H2>{bike.name}</H2>
              <Grid justifyContent="flex-start" alignItems="center">
                <p style={{ paddingRight: '1rem' }}>Quantity:</p>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Grid>
              <p style={{ textAlign: 'left' }}>Price: ${bike.price}</p>
              <Grid
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingTop: '40px' }}
              >
                <Button
                  style={{ marginRight: '1rem' }}
                  onClick={() => { 
                    checkoutHandler();
                    !isExist && (dispatch(actions.onCheckoutRedirect()) &&
                      dispatch(actions.onAddToCartHandler(bike.id)) &&
                      dispatch(actions.onRemoveToFavorities(bike.id)));
                    dispatch(actions.onCalcTotal());
                  }}
                >
                  Buy it now
                </Button>
                {!bike.isAdded ? (
                  <Button
                    onClick={() => {
                      dispatch(actions.onAddToCartHandler(bike.id));
                      dispatch(actions.onRemoveToFavorities(bike.id));
                      dispatch(actions.onCalcTotal());
                    }}
                    color="true"
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Link to="/cart">
                    <Button color="true">Go to cart</Button>
                  </Link>
                )}
              </Grid>
            </Wrap>
            <Specification>
              <Grid justifyContent="flex-start" alignItems="baseline">
                <H5>Shipping:</H5>
                <div>
                  <p>Item location: New York, New York, United States</p>
                  <p>Ships to: Worldwide See exclusions</p>
                </div>
              </Grid>
              <Grid justifyContent="flex-start" alignItems="baseline">
                <H5>Delivery:</H5>
                <p>Varies</p>
              </Grid>
              <Grid justifyContent="flex-start" alignItems="baseline">
                <H5>Payments:</H5>
                <p>PayPal, Viza, MasterCard</p>
              </Grid>
              <Grid justifyContent="flex-start" alignItems="baseline">
                <H5>Returns:</H5>
                <p>Seller does not accept returns | See details</p>
              </Grid>
            </Specification>
          </Wrapmid>
          <Seller>
            <Infotop className="info">
              <H4>Shop with confidence</H4>
              <H5>BIKE Money Back Guarantee</H5>
              <p>Get the item you ordered or get your money back</p>
            </Infotop>
            <Infotop>
              <H4> Seller information</H4>
              <p>Bikes store</p>
              <p>100% Positive feedback</p>
              <p>
                .................................................................................
              </p>
              <Grid justifyContent="flex-start" alignItems="center">
                <Svg icon_path={heart} icon_id="Layer_1" className="heart" />
                <p> Save this Seller</p>
              </Grid>
              <p>Contact seller</p>
              <p>Visit store</p>
              <p>See other items</p>
            </Infotop>
          </Seller>
        </Mainsec>

        <Description>
          <fieldset className="fieldset">
            <legend className="legend">Description</legend>
            <p>
              {bike.name} Mountain bikes are perfect if you want to explore the
              outdoors and take on more challenging terrain. Here at Evans
              Cycles you’ll find hundreds of amazing mountain bikes (MTB).
              Whether it’s a trail-ready hardtail mountain bike or an advanced
              full-suspension bike for more technical routes, we have you
              covered. We offer a variety of frame materials from steel to
              aluminium to lightweight carbon, as well as Electric mountain
              bikes to help you ride further. We offer the world’s best brands
              with incredible ranges from the likes of Specialized with their
              entry level Rockhopper hardtails all the way up to their
              full-suspension Stumpjumper model family. For the Trek fan we
              feature the best-selling Marlin hardtail, or up the ante to the
              ultra-capable Trek Fuel. Cube are also a fantastic brand we stock,
              along with Orange bikes, Cannondale, Norco, Kona, GT and more. Our
              bikes are made affordable with our cycle to work schemes.
            </p>
          </fieldset>
        </Description>
      </Main>
    </Fragment>
  );
};

export default withErrorHandler(Details, axios);
