import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import left from 'assets/icons/left.svg';
import right from 'assets/icons/right.svg';
import { Button, H4, Hr, Links, Svg } from '../styled';
import styled, { css } from 'styled-components';

const Section = styled.section`
  margin-bottom: 2rem;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 1280px;
  margin: 0 auto;
`;

const Carouselwrap = styled.div`
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;

  ${H4} {
    padding: 2rem;
  }
`;

const LeftArrow = styled.div`
  position: absolute;
  top: 35%;
  left: -30px;
  z-index: 10;
  background-color: #fff;
  cursor: pointer;
  height: 70px;
  width: 70px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 35px;
  opacity: 0.9;
  visibility: ${(p) => (p.show ? 'visible' : 'hidden')};

  &:hover {
    background-color: #e2e2e2;
  }

  & .svgLeft {
    position: absolute;
    top: 35%;
    left: 50%;
  }
`;

const RightArrow = styled.div`
  position: absolute;
  top: 35%;
  right: -30px;
  z-index: 10;
  background-color: #fff;
  cursor: pointer;
  height: 70px;
  width: 70px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 35px;
  opacity: 0.9;
  visibility: ${(p) => (p.show ? 'visible' : 'hidden')};

  &:hover {
    background-color: #e2e2e2;
  }

  & .svgRight {
    position: absolute;
    top: 35%;
    right: 50%;
  }
`;

const Carouselcontent = styled.div`
  height: 20rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.4s ease-in-out;
  transform: translate(${(p) => p.move}%);
`;

const Link = styled(Links)`
  flex: 0 0 22%;
  margin: 1%;
  height: 100%;
  text-align: center;
  padding-bottom: 2rem;

  & img {
    width: 75%;
    height: 75%;
  }

  & p {
    text-align: center;
  }
`;

const SvgArrow = styled(Svg)`
  height: 2rem;
  width: 2rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  ${({ image }) =>
    image &&
    css`
      padding: 0;
      flex: 60% 0 0;
    `}
`;

const Carousel = () => {
  const bikes = useSelector((state) => state.home.bicikle);
  const [current, setCurrent] = useState(1);
  const [step, setStep] = useState(192);

  const moveLeftHandler = () => {
    setStep((step) => step - 96);
    setCurrent((current) => current + 1);
  };
  const moveRightHandler = () => {
    setStep((step) => step + 96);
    setCurrent((current) => current - 1);
  };

  return (
    <Section>
      <Carouselwrap>
        <H4>Sponsored items based on your recent views</H4>
        <LeftArrow show={current >= 1 && current < 4} onClick={moveLeftHandler}>
          <SvgArrow icon_path={left} icon_id="Left_1" className="svgLeft" />
        </LeftArrow>
        <RightArrow show={current > 1} onClick={moveRightHandler}>
          <SvgArrow icon_path={right} icon_id="Right_1" className="svgRight" />
        </RightArrow>
        <Carouselcontent move={step}>
          {bikes.slice(0, 20).map((bike, i) => (
            <Link key={i} to={'/bike/' + bike.id}>
              <img src={require(`assets/img/${bike.image}.png`)} alt="img" />
              <p>{bike.name}</p>
              <p>price: ${bike.price}</p>
            </Link>
          ))}
        </Carouselcontent>
      </Carouselwrap>
      <Hr bottom="2rem" />
      <Div>
        <div>
          <H4>Make your own choice</H4>
          <p>
            Highly reliable prices for everybody taste. Do some changes for
            better.
          </p>
        </div>
        <Button>Our team</Button>
      </Div>
      <Hr bottom="2rem" />
      <Div>
        <H4>
          Top companies choose <span>Bikes for Business</span> to build
          in-demand career skills.
        </H4>
        <Div image>
          <img
            alt="Lyft"
            height="24"
            width="34"
            src="https://i.udemycdn.com/partner-logos/lyft-logo.svg"
          />
          <img
            alt="Pinterest"
            height="24"
            width="99"
            src="https://i.udemycdn.com/partner-logos/pinterest-logo.svg"
          />
          <img
            alt="adidas"
            height="24"
            width="36"
            src="https://i.udemycdn.com/partner-logos/adidas-logo.svg"
          />
          <img
            alt="Eventbrite"
            height="18"
            width="99"
            src="https://i.udemycdn.com/partner-logos/eventbrite-logo.svg"
          />
          <img
            alt="Surveymonkey"
            height="24"
            width="157"
            src="https://i.udemycdn.com/partner-logos/surveymonkey-logo.svg"
          />
          <img
            alt="Booking"
            height="24"
            width="140"
            src="https://i.udemycdn.com/partner-logos/booking-logo.svg"
          />
        </Div>
      </Div>
    </Section>
  );
};

export default Carousel;
