import { InputStyled as Input, Main } from 'components/styled';
import { Grid, H3, H4, Links as Link, Button as Btn } from 'components/styled';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import History from './History';

const SideNav = styled.div`
  margin-bottom: 6rem;
  flex: 0 0 20%;
  height: 100vh;
  border-right: 1px solid #eee;

  ${H3} {
    padding: 3rem 0 2rem 0;
  }
`;

const SideInner = styled.div`
  ${Link} {
    display: flex;
    align-items: center;
    height: 5rem;
    padding: 1rem;
    border-bottom: 1px solid #c6c6c6;
    cursor: pointer;
    background-color: #eee;
  }

  & .active {
    background-color: #0f7c90;
    color: white;
  }
`;

const Mainsec = styled.div`
  flex: 0 0 80%;
  margin-bottom: 5rem;
`;

const Content = styled.div`
  width: 40rem;
  margin: 3rem auto;

  ${H3} {
    margin-bottom: 4rem;
  }

  ${Btn} {
    padding: 0 3rem;
  }

  & input {
    border: 1px solid #c2c2c2;
    margin-bottom: 1rem;
  }
`;

const Button = styled.div`
  padding: 0.6rem;
  background-color: #c6c6c6;
  width: 6rem;
  text-align: center;
  margin: ${(p) => p.margin};
`;

const Profile = (props) => {
  const [value, setValue] = useState('');
  const [activeTab, setActiveTab] = useState({ info: true });

  useEffect(() => {
    if (props.location.pathname === '/profile') {
      setActiveTab({ info: true });
    } else {
      setActiveTab({ records: true });
    }
  }, [props.location.pathname]);

  const setActiveHandler = (type) => {
    setActiveTab({ [type]: true });
  };

  return (
    <Main>
      <Grid justifyContent="flex-start" alignItems="flex-start">
        <SideNav>
          <H3>Profile</H3>
          <SideInner>
            <Link
              to="/profile"
              onClick={() => setActiveHandler('info')}
              className={activeTab['info'] ? 'active' : ''}
            >
              <H4>MY INFO</H4>
            </Link>
            <Link
              to="/profile/history-data"
              onClick={() => setActiveHandler('records')}
              className={activeTab['records'] ? 'active' : ''}
            >
              <H4>HISTORY RECORDS</H4>
            </Link>
          </SideInner>
        </SideNav>
        <Mainsec>
          {activeTab['info'] ? (
            <Content>
              <Fragment>
                <H3>PERSONAL INFO</H3>
                <Input
                  placeholder="Name"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Grid justifyContent="flex-end" alignItems="center">
                  <Button margin="0 1rem 2rem 0">Edit</Button>
                  <Button margin="0 0 2rem 0">Save</Button>
                </Grid>
                <Input
                  placeholder="Email"
                  type="email"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Grid justifyContent="flex-end" alignItems="center">
                  <Button margin="0 1rem 2rem 0">Edit</Button>
                  <Button margin="0 0 2rem 0">Save</Button>
                </Grid>
                <Input
                  placeholder="Old password"
                  type="password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Input
                  placeholder="New password"
                  type="password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Input
                  placeholder="Repeat password"
                  type="password"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Grid justifyContent="flex-end" alignItems="center">
                  <Button margin="1rem 0 2rem 0">Change</Button>
                </Grid>
                <Grid justifyContent="center" alignItems="center">
                  <Btn>Update Profile</Btn>
                </Grid>
              </Fragment>
            </Content>
          ) : (
            <History />
          )}
        </Mainsec>
      </Grid>
    </Main>
  );
};

export default Profile;
