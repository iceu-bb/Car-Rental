import React from 'react';
import { Container, Segment, Header, List, Item } from 'semantic-ui-react';
import styled from 'styled-components';

// constants - text content
import { tips, awareItems, travelInformation } from '../helpers/travelGuide';

const BoldText = styled.span`
  font-weight: bold;
`;

const StyledText = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
`;

interface Props {}

export const TravelGuide: React.FC<Props> = () => {
  const renderTipsList = () => (
    <List>
      {tips.map(tip => (
        <List.Item key={tip.id} style={{ marginBottom: 15 }}>
          <StyledText>
            <BoldText>{tip.bold}</BoldText>
            {tip.text}
          </StyledText>
        </List.Item>
      ))}
    </List>
  );

  const renderAwareItems = () => (
    <List bulleted>
      {awareItems.map((item, index) => (
        <List.Item key={index}>
          <StyledText>{item}</StyledText>
        </List.Item>
      ))}
    </List>
  );

  const renderTavelInformationItems = () => (
    <Item.Group style={{ marginTop: 50 }}>
      {travelInformation.map(item => (
        <Item style={{ marginBottom: 30 }}>
          <Item.Image size='small' src={item.imgPath} />
          <Item.Content>
            <a href={item.link}>
              <Item.Header>
                <StyledText>{item.header} </StyledText>
              </Item.Header>
            </a>
            <Item.Description>
              <StyledText>{item.content}</StyledText>
            </Item.Description>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );

  return (
    <Container>
      <Segment style={{ padding: '60px 10%' }}>
        <Header
          as='h2'
          style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: 50 }}
        >
          How to drive in Iceland
        </Header>

        {/* Travel Tips */}
        <Header as='h3' style={{ fontSize: '1.8rem', margin: '35px 0' }}>
          Below are very important travel tips
        </Header>
        {renderTipsList()}

        <Header style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}>
          Please be aware that:
        </Header>
        {renderAwareItems()}

        {/* Information */}
        <Header as='h3' style={{ fontSize: '1.8rem', margin: '50px 0 10px' }}>
          Useful travel information
        </Header>
        <StyledText>
          To help you travel safely we have listed a few web links to help you
          find a useful travel information.
        </StyledText>

        {renderTavelInformationItems()}
      </Segment>
    </Container>
  );
};
