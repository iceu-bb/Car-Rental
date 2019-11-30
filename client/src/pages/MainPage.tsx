import React from 'react';

import { HomepageHeading } from '../components/Header/HomePageHeading';
import {
  Header,
  Segment,
  Card,
  Image,
  Button,
  Container
} from 'semantic-ui-react';
import { VehiclesCarousel } from '../components/VehiclesCarousel';
import { SpecialOffers } from '../components/SpecialOffers';
import styled from 'styled-components';

const MainSectionContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0 0;
`;

const MainHeader = styled(Header)`
  font-size: 2.2rem;
  margin-bottom: 50px;
  word-spacing: 5px;
  letter-spacing: 1.5px;
`;

const ColoredSpan = styled.span`
  color: violet;
`;

const StyledCardHeader = styled(Card.Header)`
  font-size: 1.8rem !important;
  letter-spacing: 1px;
`;

const StyledCardDescription = styled(Card.Description)`
  font-size: 1.1rem !important;
  margin-bottom: 15px;
`;

export const MainPage: React.FC = () => {
  return (
    <>
      <HomepageHeading mobile />
      <Segment
        style={{
          margin: '0',
          backgroundColor: '#F6F6F6'
        }}
      >
        <Container style={{ textAlign: 'center', padding: '40px 0 100px ' }}>
          <Header style={{ textTransform: 'uppercase' }} as='h1'>
            cheap prices for car rental in Iceland
          </Header>
          <Header
            as='h3'
            style={{
              letterSpacing: '1px',
              fontSize: '1.5rem'
            }}
          >
            Save up to 40% with our Coverage Package! Includes:
            <ColoredSpan> CDW, </ColoredSpan> <ColoredSpan>SCDW, </ColoredSpan>
            <ColoredSpan>TP, </ColoredSpan>
            <ColoredSpan>WSP </ColoredSpan>
            and taxes.
          </Header>

          {/*Special Offers*/}
          <MainSectionContainer>
            <MainHeader as='h2'>Special Offers</MainHeader>
            <SpecialOffers />
          </MainSectionContainer>

          {/*Carousel*/}
          <MainSectionContainer>
            <MainHeader as='h2'>Our Vehicles</MainHeader>
            <VehiclesCarousel />
          </MainSectionContainer>

          {/*How to drive - Card*/}
          <MainSectionContainer>
            <MainHeader as='h2'>Travel Iceland</MainHeader>
            <Card
              style={{
                backgroundColor: '#fff',
                width: 1000,
                textAlign: 'left'
              }}
            >
              <Image
                style={{ height: 350, width: 1000, objectFit: 'cover' }}
                src='https://images.unsplash.com/photo-1470091245021-7dd97d51cc06?ixlib=rb-1.2.1&auto=format&fit=crop&w=1572&q=80'
                alt='aaa'
              />
              <Card.Content>
                <StyledCardHeader>How to drive in Iceland</StyledCardHeader>
                <StyledCardDescription>
                  Iceland is a beautiful country to visit and during your stay
                  our main concern is your safety. Although Iceland is
                  considered to be one of the safest countries in the world some
                  conditions are most likely different from what you are
                  accustomed to. We provide you with safe cars but the more you
                  are informed about traveling in Iceland the better.
                </StyledCardDescription>
                <Button size='big' color='violet'>
                  Read More
                </Button>
              </Card.Content>
            </Card>
          </MainSectionContainer>
        </Container>
      </Segment>
    </>
  );
};
