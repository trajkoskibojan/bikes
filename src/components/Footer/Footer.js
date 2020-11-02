import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import * as actions from 'store/actions/';
import { H3, H4, Ul, Li, Svg, Links } from '../styled';
import facebook from 'assets/icons/facebook.svg';
import instagram from 'assets/icons/instagram.svg';
import linkedin from 'assets/icons/linkedin.svg';
import twitter from 'assets/icons/twitter.svg';

const Footerwrap = styled.footer`
  background: #f8f8f8;
  margin: 2rem 0;
  padding: 4rem 0;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  ${({ footer }) =>
    footer &&
    css`
      max-width: 1280px;
      margin: 0 auto;
      padding-right: 15px;
      padding-left: 15px;
      justify-content: center;
      align-items: flex-start;
    `}

  ${({ wrap }) =>
    wrap &&
    css`
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      flex: 25% 0 0;

      ${H3} {
        padding: 0 1rem;
      }
    `}

  ${({ wrap_icon }) =>
    wrap_icon &&
    css`
      justify-content: center;
      padding: 0;
    `}

  ${({ icon }) =>
    icon &&
    css`
      background: #0f7c90;
      justify-content: center;
      border-radius: 5px;
      width: 4rem;
      height: 4rem;
      &:hover {
        background-color: #094c59;
        cursor: pointer;
      }
      &:not(:last-child) {
        margin-right: 1rem;
      }
    `}

  ${({ image }) =>
    image &&
    css`
      padding: 0;
      flex: 60% 0 0;
    `}

  ${H3} {
    margin-bottom: 2rem;
  }

  ${H4} {
    margin-bottom: 0.5rem;
    display: inline-block;
    width: 100%;

    span {
      color: #0f7c90;
    }
  }
`;

const Link = styled(Links)`
  height: 100%;
  border-radius: 4px;
  color: #5f5f5f;
`;


const event = [
  'Enter Now',
  'Event Info',
  'Course Maps',
  'Race Pack',
  'Results',
  'FAQs',
  'Am I Registered?',
];
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

const Footer = () => {
  const dispatch = useDispatch();
  

  return (
    <Footerwrap>
      <Div footer>
        <Div wrap="true">
          <H3>Social Share</H3>
          <Div wrap_icon>
            <Div icon>
              <Svg icon_path={facebook} icon_id="Facebook" />
            </Div>
            <Div icon>
              <Svg icon_path={instagram} icon_id="Instagram" />
            </Div>
            <Div icon>
              <Svg icon_path={linkedin} icon_id="Linkedin" large />
            </Div>
            <Div icon>
              <Svg icon_path={twitter} icon_id="Twitter" />
            </Div>
          </Div>
        </Div>
        <Div wrap="true">
          <H3>Event info</H3>
          <Ul>
            {event.map((el, i) => (
              <Li
                key={i}
                onMouseEnter={(e) => dispatch(actions.onHighlightLink(e))}
              >
                <Link to="/">{el}</Link>
              </Li>
            ))}
          </Ul>
        </Div>
        <Div wrap="true">
          <H3>Registration</H3>
          <Ul>
            {registration.map((el, i) => (
              <Li
                key={i}
                onMouseEnter={(e) => dispatch(actions.onHighlightLink(e))}
              >
                <Link to="/">{el}</Link>
              </Li>
            ))}
          </Ul>
        </Div>
        <Div wrap="true">
          <H3>Schedule</H3>
          <Ul>
            {scheduale.map((el, i) => (
              <Li
                key={i}
                onMouseEnter={(e) => dispatch(actions.onHighlightLink(e))}
              >
                <Link to="/">{el}</Link>
              </Li>
            ))}
          </Ul>
        </Div>
      </Div>
    </Footerwrap>
  );
};

export default Footer;
