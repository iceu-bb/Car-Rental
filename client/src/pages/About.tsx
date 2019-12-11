import React, { useCallback } from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { Map } from '../components/Map';

//same in TravelGuide
const BoldText = styled.span`
  font-weight: bold;
`;
const StyledText = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
`;

interface Props {}

export const About: React.FC<Props> = () => {
  const addMarker = () => (map: any) => {
    const marker = new window.google.maps.Marker({
      map,
      position: { lat: 63.99702, lng: -22.630564 },
      title: 'Rental Cars'
    });
  };

  const mapProps = {
    options: {
      center: { lat: 63.99702, lng: -22.630564 },
      zoom: 10
    },
    onMount: addMarker()
  };

  const MemoMap = useCallback(() => <Map {...mapProps} />, []);

  return (
    <Container>
      <Segment style={{ padding: '60px 10%' }}>
        <Header
          as='h2'
          style={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginBottom: 50,
            textTransform: 'uppercase'
          }}
        >
          Who are we
        </Header>
        <p>
          <StyledText>
            RentalCars is a car rental company that provides discount rates on
            car hire designed for holiday travel. Rental Cars has convenient
            location, great prices and fleet at your disposal.
          </StyledText>
        </p>

        <p>
          <StyledText>
            <BoldText>Call us: +354 562 14 62</BoldText>
            <br />
            <BoldText>E-mail:</BoldText> RentalCars@cars.com
            <br />
            <BoldText>Opening hours:</BoldText> 24h everyday
          </StyledText>
        </p>

        {/* Locations */}
        <Header
          as='h2'
          style={{
            fontSize: '2.2rem',
            textAlign: 'center',
            marginBottom: 50,
            textTransform: 'uppercase'
          }}
        >
          Our Location
        </Header>

        {/* Map */}
        <MemoMap />

        <Header as='h4'>
          <StyledText>
            <BoldText>Pick up</BoldText>
          </StyledText>
        </Header>

        <p>
          <StyledText>
            Please go to the Rental Cars meeting point at car rental desk, which
            is located just after you clear customs in the Terminal building.
            Rental Cars rental location is only 300 meters (approx. 350 yards)
            from Keflavik International Airport Terminal. We offer a free
            shuttle service to/from the airport to our station in Bilkavellir 1,
            235 Keflavíkurflugvöllur. Please provide your flight details in the
            booking process.
          </StyledText>
        </p>

        <Header as='h4'>
          <StyledText>
            <BoldText>Drop off</BoldText>
          </StyledText>
        </Header>

        <p>
          <StyledText>
            When dropping off your rental car, please bring it back to our
            rental station at Blikavellir 1, 235 Keflavíkurflugvöllur where our
            Rental Cars agent will do a quick inspection of the vehicle before
            dropping you off to the airport.
          </StyledText>
        </p>
      </Segment>
    </Container>
  );
};
