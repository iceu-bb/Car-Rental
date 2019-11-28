import React from 'react';
import { Slide } from 'pure-react-carousel';
import { Card, Image, CardContent, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  padding: 15px 20px 0;
  min-width: 315px;
  box-shadow: none !important;
  border: 1px solid #ddd !important;
`;

interface Props {
  index: any;
  name: string;
  producer: string;
  group: string;
  transmission: string;
}

export const CarouselSlide: React.FC<Props> = ({
  index,
  name,
  producer,
  group,
  transmission
}) => {
  return (
    <Slide index={index}>
      <StyledCard>
        <CardContent style={{ textAlign: 'center' }}>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/${name}.png`}
            alt={`${producer} ${name}`}
            style={{ backgroundColor: 'white', marginBottom: 15 }}
          />
          <Card.Header style={{ fontSize: '2rem', marginBottom: 15 }}>
            {`${producer} ${name}`}
            <p
              style={{
                fontSize: '1.3rem',
                fontWeight: 300,
                color: '#282828',
                marginBottom: 15
              }}
            >{`Group ${group}`}</p>
          </Card.Header>
          <Button
            fluid
            as={Link}
            to={`/vehicles/${name}-${transmission}`}
            color='violet'
            size='big'
          >
            More Details
          </Button>
        </CardContent>
      </StyledCard>
    </Slide>
  );
};
