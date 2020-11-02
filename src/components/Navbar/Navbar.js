import React, { Fragment, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  Svg,
  Links,
  Button,
  Hr,
  H3,
  H4,
  Grid,
  Ul,
  Li,
  H5,
} from 'components/styled';
import Logo from 'assets/img/logo.png';
import { InputStyled as Input } from 'components/styled';
import heartFill from 'assets/icons/heart_fill.svg';
import heart from 'assets/icons/heart.svg';
import carticon from 'assets/icons/cart.svg';
import search from 'assets/icons/search.svg';
import * as actions from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Nav = styled.nav`
  margin: 0 auto;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  ${Button} {
    padding: 0;
    height: 4.5rem;
  }

  & .btn {
    margin: 0 0.7rem 0 2rem;
    color: #0f7c90;
  }
`;

const DivWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${({ nav }) =>
    nav &&
    css`
      margin-left: 4rem;
      width: 100%;
    `};
`;

const Link = styled(Links)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 3rem;
  width: 100%;

  &:hover {
    color: #0f7c90;
  }
`;

const Wrapcontent = styled.div`
  width: 34rem;
  padding: 2rem;
  ${Button} {
    width: 100%;
  }

  & + hr {
    border: 0;
    border-top: 1px solid #dcdacb;
  }
`;

const Profilewrap = styled.div`
  width: 31rem;
  & hr {
    border: 0;
    border-top: 1px solid #dcdacb;
  }

  ${Link} {
    color: #5f5f5f;
    font-weight: 500;
    &:hover {
      color: #0f7c90;
    }
  }
`;

const Profilecontent = styled.div`
  padding: 2rem;

  & .anchorprofile {
    padding-bottom: 2rem;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 93%;
  margin: 0 auto;

  svg {
    margin-right: 2.7rem;
  }

  > div:first-of-type {
    height: 5rem;
    width: 10rem;
  }

  ${({ input }) =>
    input &&
    css`
      border-radius: 50px;
      border: 1px solid #d5d5d5;
      flex: 1;
      margin: 0 3rem 0 0;
      padding: 0 2rem;
      position: relative;
    `}
`;

const Profile = styled.div`
  width: ${(p) => p.w || '3.5rem'};
  height: ${(p) => p.h || '3.5rem'};
  border-radius: 5rem;
  background: #e2e2e2;
  border: 1px solid #808080;
  cursor: pointer;
`;

const Badge = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: #ec5252;
  position: absolute;
  border-radius: 50px;
  top: 8px;
  left: 43%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const Background = styled.span`
  width: 100%;
  height: 30rem;
  background-color: #f8f8f8;
  border: 1px solid #ebebeb;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: absolute;
  top: 110%;
  overflow-y: scroll;
  padding: 1.5rem;
  display: ${(p) => (p.show ? 'block' : 'none')};
`;

const Imgwrap = styled.div`
  width: 10rem;
  height: 7rem;
  border: 1px solid #c6c6c6;
  padding: 0.5rem;
`;

const Productwrap = styled.div`
  padding: 0 1.5rem;
`;

const DropdownBackground = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 1000;
  background-color: #f8f8f8;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s, opacity 0.1s, transform 0.2s;
  transform-origin: 50% 0;
  display: flex;
  justify-content: center;
  opacity: ${(p) => (p.open ? 1 : 0)};

  ${({ coords }) =>
    coords &&
    css`
      width: ${(p) => p.coords.width + 'px'};
      height: ${(p) => p.coords.height + 'px'};
      transform: translate(
        ${(p) => p.coords.left + 'px'},
        ${(p) => p.coords.top + 'px'}
      );
    `}
`;

/* const Arrow = styled.span`
  position: absolute;
  width: 20px;
  height: 20px; 
  display: block;
  background-color: #f8f8f8;
  border-top: 1px solid #ebebeb;
  border-left: 1px solid #ebebeb;
  transform: translateY(-50%) rotate(45deg);
`; */

const Dropdown = styled.div`
  opacity: 0;
  position: absolute;
  z-index: 1000;
  overflow: hidden;
  top: ${(p) => p.top || '5.5rem'};
  border-radius: 2px;
  transition: all 0.5s;
  transform: translateY(100px);
  transform: translateX(${(p) => p.transform || '-13px'});
  will-change: opacity;
  display: none;
  max-height: ${(p) => p.height};
`;

const Linkwrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  ${Dropdown} {
    display: ${(p) => (p.dropdisplay ? 'flex' : 'none')};
    opacity: ${(p) => (p.dropdisplay && p.dropopacity ? 1 : 0)};
    overflow-y: auto;

    ${H5} {
      font-weight: 800;
    }

    & p {
      font-size: 1.1rem;
    }
  }
`;

const Span = styled.span`
  color: #c6c6c6;
  text-align: center;
  padding: 6rem 2rem;
  width: 18rem;
  font-size: 1.2rem;
`;

const WrapImg = styled.div`
  height: 28rem;
  width: 50rem;
`;

const Menu = styled.div`
  margin-right: 2rem;

  ${Li} {
    margin-bottom: 0.2rem;
  }

  & a {
    font-weight: 400;
  }
`;

const Service = styled.div`
  width: 30rem;
  margin-right: 2rem;

  & p:first-of-type {
    color: #c6c6c6;
  }

  & p:last-of-type {
    margin-bottom: 2rem;
  }

  ${H3} {
    margin-bottom: 2rem;
    font-style: italic;
  }
`;

const WrapImgService = styled.div`
  width: 25rem;
  height: 30rem;
`;

const Btnwrap = styled.div`
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.08), 0 -4px 12px rgba(0, 0, 0, 0.08);
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-top: 1px solid #dcdacb;
  padding: 1.6rem;

  ${Button} {
    width: 100%;
  }
`;

const Header = styled.header``;

const Navbar = (props) => {
  const { bikes, cart, favorites, total } = useSelector((state) => {
    return {
      bikes: state.home.bicikle,
      cart: state.home.cart,
      favorites: state.home.favorites,
      total: state.home.total,
    };
  });
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const searched = useSelector((state) => state.home.searched);
  const ref = useRef(null);
  const [isEnter, setIsEnter] = useState({ bike: false });
  const [isEnterAfter, setisEnterAfter] = useState({ bike: false });
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState('');
  const nav = useRef(null);
  const bike = useRef(null);
  const catalogues = useRef(null);
  const hearts = useRef(null);
  const carts = useRef(null);
  const profile = useRef(null);
  const service = useRef(null);
  let [curLink, setCurLink] = useState('bike');

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    switch (curLink) {
      case 'bike':
        // eslint-disable-next-line react-hooks/exhaustive-deps
        curLink = bike;
        break;
      case 'catalogues':
        curLink = catalogues;
        break;
      case 'service':
        curLink = service;
        break;
      case 'hearts':
        curLink = hearts;
        break;
      case 'carts':
        curLink = carts;
        break;
      default:
        curLink = curLink = profile;
        break;
    }

    const dropdownCoords = curLink.current.getBoundingClientRect();
    const navCoords = nav.current.getBoundingClientRect();
    setCoords({
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left,
    });
  }, [curLink, isEnter, favorites]);

  const handleEnter = (element) => {
    setCurLink(element);
    setIsEnter({ [element]: true });
    setTimeout(() => {
      setisEnterAfter({ [element]: true });
    }, 150);
    setOpen(true);
  }; 

  const handleLeave = () => {
    setIsEnter(false);
    setisEnterAfter(false);
    setOpen(false);
  };

  const cartNavigation = () => {
    props.history.push('/cart');
  };

  const profileNavigation = () => {
    props.history.push('/profile');
  };

  const whishlistNavigation = () => {
    props.history.push('/whishlist');
  };

  const preventHandler = (e) => {
    e.preventDefault();
  };

  const registration = [
    'Volunteers',
    'Gallery',
    'Press',
    'Results',
    'Privacy Policy',
    'Service Plus',
    'Contacts',
  ];
  const scheduale = [
    'Gallery',
    'About',
    'Videos',
    'Results',
    'Service Plus',
    'FAQs',
    'Volunteers',
  ];

  return (
    <Header ref={nav}>
      <DropdownBackground open={open} coords={coords}>
        {/*  <Arrow /> */}
      </DropdownBackground>
      <Nav>
        <Div>
          <div>
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <DivWrap nav>
            <Linkwrap
              dropdisplay={isEnter.bike}
              dropopacity={isEnterAfter.bike}
              onMouseEnter={() => handleEnter('bike')}
              onMouseLeave={handleLeave}
            >
              <Link
                onClick={preventHandler}
                to="/"
                style={{ padding: '2rem 0' }}
              >
                ВIKES
              </Link>
              <Dropdown ref={bike}>
                <Wrapcontent>
                  <H3>Best seling Bikes</H3>
                  {bikes &&
                    bikes.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        to={'/bike/' + product.id}
                        onClick={() => {
                          setFocused(false);
                          setValue('');
                        }}
                      >
                        <Grid
                          alignItems="center"
                          justifyContent="flex-start"
                          style={{ margin: '1rem 0' }}
                        >
                          <Imgwrap>
                            <img
                              width="100%"
                              height="100%"
                              src={require(`../../assets/img/${product.image}.png`)}
                              alt="bike"
                            />
                          </Imgwrap>
                          <Productwrap>
                            <H4>{product.name}</H4>
                            <p>price: ${product.price}</p>
                          </Productwrap>
                        </Grid>
                      </Link>
                    ))}
                </Wrapcontent>
              </Dropdown>
            </Linkwrap>
            <Div input ref={ref}>
              <Svg icon_path={search} icon_id="Search" />
              <Input
                type="text"
                placeholder="Search for bikes"
                onFocus={() => setFocused(true)}
                value={value}
                onChange={(e) => {
                  dispatch(actions.onSearchHandler(value));
                  setValue(e.target.value);
                }}
              />
              <Background show={searched.length > 0 && focused}>
                {searched.map((product) => (
                  <Link
                    key={product.id}
                    to={'/bike/' + product.id}
                    onClick={() => {
                      setFocused(false);
                      setValue('');
                    }}
                  >
                    <Grid alignItems="center" justifyContent="flex-start">
                      <Imgwrap>
                        <img
                          width="100%"
                          height="100%"
                          src={require(`../../assets/img/${product.image}.png`)}
                          alt="bike"
                        />
                      </Imgwrap>
                      <Productwrap>
                        <H4>{product.name}</H4>
                        <p>price: ${product.price}</p>
                      </Productwrap>
                    </Grid>
                  </Link>
                ))}
              </Background>
            </Div>
            <Linkwrap
              dropdisplay={isEnter.catalogues}
              dropopacity={isEnterAfter.catalogues}
              onMouseEnter={() => handleEnter('catalogues')}
              onMouseLeave={handleLeave}
            >
              <Link
                onClick={preventHandler}
                to="/"
                style={{ padding: '2rem 0' }}
              >
                CATALOGUES
              </Link>
              <Dropdown ref={catalogues}>
                <Grid
                  justifyContent="center"
                  alignItems="center"
                  style={{ padding: '2rem' }}
                >
                  <Menu>
                    <H3>Registration</H3>
                    <Hr />
                    <Ul>
                      {registration.map((el, i) => (
                        <Li key={i}>
                          <Link to="/">{el}</Link>
                        </Li>
                      ))}
                    </Ul>
                  </Menu>
                  <Menu>
                    <H3>Scheduale</H3>
                    <Hr />
                    <Ul>
                      {scheduale.map((el, i) => (
                        <Li key={i}>
                          <Link to="/">{el}</Link>
                        </Li>
                      ))}
                    </Ul>
                  </Menu>
                  <WrapImg>
                    <img
                      width="100%"
                      height="100%"
                      src={require('../../assets/img/biking.jpg')}
                      alt="biking"
                    />
                  </WrapImg>
                </Grid>
              </Dropdown>
            </Linkwrap>
            <Linkwrap
              dropdisplay={isEnter.service}
              dropopacity={isEnterAfter.service}
              onMouseEnter={() => handleEnter('service')}
              onMouseLeave={handleLeave}
            >
              <Link
                onClick={preventHandler}
                to="/"
                style={{ padding: '2rem 0', marginRight: '4rem' }}
              >
                SERVICE
              </Link>
              <Dropdown ref={service}>
                <Grid
                  justifyContent="center"
                  alignItems="center"
                  style={{ padding: '2rem' }}
                >
                  <Service>
                    <p>We offer the best service</p>
                    <H3>Booking your service is easy</H3>
                    <p>
                      We are your premium partner for bike service and delivery.
                      Our services are perfectly adapted to your needs and your
                      satisfaction is most important to us – no matter where you
                      bought your bike.
                    </p>
                    <Link to="/">Read more</Link>
                  </Service>

                  <WrapImgService>
                    <img
                      width="100%"
                      height="100%"
                      src={require('../../assets/img/service.png')}
                      alt="biking"
                    />
                  </WrapImgService>
                </Grid>
              </Dropdown>
            </Linkwrap>

            <Linkwrap
              dropdisplay={isEnter.hearts}
              dropopacity={isEnterAfter.hearts}
              onMouseEnter={() => handleEnter('hearts')}
              onMouseLeave={handleLeave}
              style={{ padding: '2rem 0' }}
            >
              {favorites.length > 0 ? (
                <Svg
                  icon_path={heartFill}
                  icon_id="Layer_1"
                  onClick={whishlistNavigation}
                />
              ) : (
                <Svg icon_path={heart} icon_id="Layer_1" />
              )}
              <Dropdown
                top="5rem"
                transform="-10px"
                ref={hearts}
                style={{ flexDirection: 'column', minHeight: '15rem' }}
                height="41rem"
              >
                {favorites.length > 0 ? (
                  favorites.map((bike) => (
                    <Fragment key={uuid()}>
                      <Wrapcontent>
                        <Grid
                          alignItems="center"
                          justifyContent="flex-start"
                          style={{ marginBottom: '1rem' }}
                        >
                          <Imgwrap>
                            <img
                              width="100%"
                              height="100%"
                              src={require(`../../assets/img/${bike.image}.png`)}
                              alt="bike"
                            />
                          </Imgwrap>
                          <Productwrap>
                            <H4>{bike.name}</H4>
                            <p>Product by Bikes</p>
                            <H5>price: ${bike.price}</H5>
                          </Productwrap>
                        </Grid>
                        <Button
                          onClick={() => {
                            dispatch(actions.onMoveToCart(bike.id));
                            dispatch(actions.onRemoveToFavorities(bike.id));
                            dispatch(actions.onCalcTotal());
                          }}
                          color="true"
                        >
                          Add to cart
                        </Button>
                      </Wrapcontent>
                      <hr />
                    </Fragment>
                  ))
                ) : (
                  <Span>Your whishlist is empty</Span>
                )}
                {favorites.length > 0 ? (
                  <Btnwrap>
                    <Button onClick={whishlistNavigation}>
                      Go to wishlist
                    </Button>
                  </Btnwrap>
                ) : null}
              </Dropdown>
            </Linkwrap>
            <Linkwrap
              dropdisplay={isEnter.carts}
              dropopacity={isEnterAfter.carts}
              onMouseEnter={() => handleEnter('carts')}
              onMouseLeave={handleLeave}
              style={{ padding: '2rem 0' }}
            >
              <Badge onClick={cartNavigation}>{cart.length}</Badge>
              <Svg
                icon_path={carticon}
                icon_id="cart"
                sm
                onClick={cartNavigation}
              />
              <Dropdown
                transform="-8px"
                ref={carts}
                style={{ flexDirection: 'column', minHeight: '15rem' }}
                height="41rem"
              >
                {cart.length > 0 ? (
                  cart.map((bike) => (
                    <Fragment key={uuid()}>
                      <Wrapcontent>
                        <Grid alignItems="center" justifyContent="flex-start">
                          <Imgwrap>
                            <img
                              width="100%"
                              height="100%"
                              src={require(`../../assets/img/${bike.image}.png`)}
                              alt="bike"
                            />
                          </Imgwrap>
                          <Productwrap>
                            <H4>{bike.name}</H4>
                            <p>Product by Bikes</p>
                            <H5>price: ${bike.price}</H5>
                          </Productwrap>
                        </Grid>
                      </Wrapcontent>
                      <hr />
                    </Fragment>
                  ))
                ) : (
                  <Span>Your cart is empty</Span>
                )}
                {cart.length > 0 ? (
                  <Btnwrap>
                    <H3>Total: ${total}</H3>
                  </Btnwrap>
                ) : null}
              </Dropdown>
            </Linkwrap>
            <Linkwrap
              dropdisplay={isEnter.profile}
              dropopacity={isEnterAfter.profile}
              onMouseEnter={() => handleEnter('profile')}
              onMouseLeave={handleLeave}
              style={{ padding: '2rem 0' }}
            >
              <Profile onClick={profileNavigation} />
              <Dropdown top="7rem" transform="0" ref={profile}>
                <Profilewrap>
                  <Profilecontent>
                    <Grid alignItems="center" justifyContent="flex-start">
                      <Profile w="6rem" h="6rem" onClick={profileNavigation} />
                      <Productwrap>
                        <H4>Bojan Trajksoki</H4>
                        <p>bojan.trajkoski.mk@gmail.com</p>
                      </Productwrap>
                    </Grid>
                  </Profilecontent>
                  <hr />
                  <Profilecontent>
                    <Link to="/cart" className="anchorprofile">
                      My Cart
                    </Link>
                    <Link to="/whishlist">Whishlist</Link>
                  </Profilecontent>
                  <hr />
                  <Profilecontent>
                    <Link to="/profile" className="anchorprofile">
                      Account settings
                    </Link>
                    <Link to="/profile/history-data">Purchase history</Link>
                  </Profilecontent>
                  <hr />
                  <Profilecontent>
                    <Link to="/profile">Edit profile</Link>
                  </Profilecontent>
                  <hr />
                  <Profilecontent>
                    <Link to="/profile">Log out</Link>
                  </Profilecontent>
                </Profilewrap>
              </Dropdown>
            </Linkwrap>
          </DivWrap>
          <Button
            color="true"
            className="btn"
            onClick={(e) => {
              dispatch(actions.onSetActiveHandler(e));
              dispatch(actions.onShowForm());
            }}
          >
            Log In
          </Button>
          <Button
            onClick={(e) => {
              dispatch(actions.onSetActiveHandler(e));
              dispatch(actions.onShowForm());
            }}
          >
            Sign Up
          </Button>
        </Div>
      </Nav>
      <Hr />
    </Header>
  );
};

export default withRouter(Navbar);
