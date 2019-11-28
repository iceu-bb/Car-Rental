import React from 'react';
import { Container, Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props {}

const StyledImage = styled(Image)`
  min-height: 220px;
`;

const StyledCardHeader = styled(Card.Header)`
  font-size: 1.7rem !important;
  letter-spacing: 1px;
`;

export const SpecialOffers: React.FC<Props> = () => {
  return (
    <Container>
      <Card.Group stackable itemsPerRow='3' centered>
        <Card>
          <StyledImage
            src='https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            alt='credit card'
          />

          <Card.Content>
            <StyledCardHeader>10% with Prepaid Booking</StyledCardHeader>
            <Card.Description>
              Save 40% with our Coverage Package! Includes: CDW, SCDW, TP, WSP
              and taxes. Drive around Iceland worry free.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <StyledImage
            src='https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80'
            alt='car river'
          />
          <Card.Content>
            <StyledCardHeader>
              Up to 40% on our Coverage Package
            </StyledCardHeader>
            <Card.Description>
              Save up to 40% with our Coverage Package! Includes: CDW, SCDW, TP,
              WSP and taxes. Drive around Iceland worry free.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <StyledImage
            src='https://images.unsplash.com/photo-1558038808-d91cafb09205?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            alt='cars iceland'
          />
          <Card.Content>
            <StyledCardHeader>
              Special Discount on Long Term Bookings{' '}
            </StyledCardHeader>
            <Card.Description>
              Save 40% with our Coverage Package! Includes: CDW, SCDW, TP, WSP
              and taxes. Drive around Iceland worry free.
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Container>
  );
};
