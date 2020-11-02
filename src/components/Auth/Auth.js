import { Grid, H2 } from 'components/styled';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import Backdrop from 'components/Backdrop/Backdrop';
import * as actions from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Formwrap = styled.div`
  position: fixed;
  z-index: 9999;
  background: rgba(19, 35, 47, 1);
  padding: 40px;
  width: 44%;
  left: 27%;
  margin: 40px auto; 
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(19, 35, 47, 0.3);
  transform: ${(p) => (p.showup ? 'translateY(0)' : 'translateY(-100vh)')};
  opacity: ${(p) => (p.showup ? 1 : 0)};
  transition: all 0.3s ease-in-out;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 40px 0;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  & li {
    display: block;
    text-decoration: none;
    padding: 10px;
    background: rgba(160, 179, 176, 0.25);
    color: #a0b3b0;
    font-size: 20px;
    float: left;
    width: 50%;
    text-align: center;
    cursor: pointer;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
  }

  & li:hover {
    background: #179b77;
    color: #ffffff;
  }

  & .active {
    background: #1ab188;
    color: #ffffff;
  }
`;

const Content = styled.div`
  ${H2} {
    color: white;
    text-align: center;
    font-weight: 400;
    margin-bottom: 2rem;
  }
`;

const Input = styled.input`
  font-size: 16px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 12px;
  background: none;
  background-image: none;
  border: 1px solid #a0b3b0;
  color: #ffffff;
  border-radius: 0;
  -webkit-transition: border-color 0.25s ease, box-shadow 0.25s ease;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
`;

const Button = styled.button`
  border: 0;
  outline: none;
  border-radius: 0;
  padding: 15px 0;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: #1ab188;
  color: #ffffff;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-appearance: none;
  cursor: pointer;
  display: block;
  width: 100%;

  &:hover,
  &:focus {
    background: #179b77;
  }

  &:disabled {
    background: #7cdfc5;
    cursor: not-allowed;
  }
`;

const Avatarwrap = styled.div`
  padding: 1rem 1rem 1rem 0;
  position: relative;

  &:hover div {
    visibility: visible;
    opacity: 1;
    margin: 0.5rem;
  }
`;

const Avatarcontent = styled.div`
  padding: 1.75rem;
  width: 24.5rem;
  height: 17.5rem;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background: white;
  box-shadow: 0 2px 4px rgba(256, 256, 256, 0.08),
    0 4px 12px rgba(256, 256, 256, 0.16);
  position: absolute;
  z-index: 900;
  left: 95%;
  bottom: -50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 7rem;
  height: 7rem;
  border: 1px solid #a0b3b0;
  background: #2a3943;
  border-radius: 50px;
  overflow: hidden;
`;

const Imgwrap = styled.div`
  width: 6rem;
  height: 6rem;
  border: 1px solid #a0b3b0;
  cursor: pointer;
`;

const Fieldwrap = styled.div`
  position: relative;
  margin-bottom: 2.5rem;

  ${Button} {
    height: 5rem;
    width: 14rem;
    font-size: 1.3rem;
    text-transform: none;
    padding: 0 2rem;
    background: #ec5252;

    &:hover,
    &:focus {
      background: #e04242;
    }
  }

  ${Grid} {
    width: 100%;
  }

  & p {
    color: #ec5252;
  }
`;

const Toprow = styled.div`
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  & > div {
    float: left;
    width: 48%;
    margin-right: 4%;

    &:last-child {
      margin: 0;
    }
  }
`;

const Form = () => {
  const [image, setImage] = useState(0);
  const { showup, activeTab, form, formIsValid } = useSelector((state) => {
    return {
      showup: state.home.showup,
      activeTab: state.home.activeTab,
      form: state.home.form,
      formIsValid: state.home.formIsValid,
    };
  });
  const dispatch = useDispatch();

  const imageHandler = (number) => {
    setImage(number);
  };

  const submitHandler = (e) => {
    //e.preventDefault();
  };

  const avatars = [];
  for (let i = 1; i < 7; i++) {
    avatars.push(
      <Imgwrap key={uuid()} onClick={() => imageHandler(i)}>
        <img
          width="100%"
          height="100%"
          src={require(`../../assets/avatars/avatar_${i}.jpg`)}
          alt="avatar1"
        />
      </Imgwrap>
    );
  }

  const login = (
    <Fragment>
      <H2>Welcome Back!</H2>

      <form action="/" method="post">
        <Fieldwrap>
          <Input type="email" required placeholder="Email Address*" />
        </Fieldwrap>

        <Fieldwrap>
          <Input type="password" required placeholder="Password*" />
        </Fieldwrap>

        <Button>Log In</Button>
      </form>
    </Fragment>
  );

  const signup = (
    <Fragment>
      <H2>Sign Up for Free</H2>

      <form action="/" method="post" onSubmit={submitHandler}>
        <Toprow>
          <Fieldwrap>
            <Input
              type="text"
              name="firstname"
              required
              placeholder="First Name*"
              value={form.firstname.value}
              onChange={(e) => dispatch(actions.onInputChangeHandler(e))}
            />
          </Fieldwrap>

          <Fieldwrap>
            <Input
              type="text"
              name="lastname"
              required
              placeholder="Last Name*"
              value={form.lastname.value}
              onChange={(e) => dispatch(actions.onInputChangeHandler(e))}
            />
          </Fieldwrap>
        </Toprow>

        <Fieldwrap>
          <Input
            type="email"
            name="email"
            required
            placeholder="Email Address*"
            value={form.email.value}
            onChange={(e) => dispatch(actions.onInputChangeHandler(e))}
          />
        </Fieldwrap>

        <Fieldwrap>
          <Input
            type="password"
            name="password"
            required
            placeholder="Set a Password*"
            value={form.password.value}
            onChange={(e) => dispatch(actions.onInputChangeHandler(e))}
          />
          {form.password.isTouched && !form.password.valid ? (
            <p>Please enter password with min 6 characters</p>
          ) : null}
        </Fieldwrap>
        <Fieldwrap style={{ display: 'flex' }}>
          <Grid justifyContent="space-between" alignItems="center">
            <Avatarwrap>
              <Button>Chose Avatar</Button>
              <Avatarcontent>{avatars}</Avatarcontent>
            </Avatarwrap>
            <Avatar>
              <img
                width="100%"
                height="100%"
                src={require(`../../assets/avatars/avatar_${image}.jpg`)}
                alt="avatar1"
              />
            </Avatar>
          </Grid>
        </Fieldwrap>
        <Button disabled={!(image !== 0 && formIsValid)}>Get Started</Button>
      </form>
    </Fragment>
  );
  return (
    <Fragment>
      <Backdrop 
        showup={showup}
        clicked={() => dispatch(actions.onHideForm())}
      />
      <Formwrap showup={showup}>
        <Ul>
          <li
            className={activeTab ? 'active' : null}
            onClick={(e) => dispatch(actions.onSetActiveHandler(e))}
          >
            Sign Up
          </li>
          <li
            className={!activeTab ? 'active' : null}
            onClick={(e) => dispatch(actions.onSetActiveHandler(e))}
          >
            Log In
          </li>
        </Ul>

        <Content>{activeTab ? signup : login}</Content>
      </Formwrap>
    </Fragment>
  );
};

export default Form;
