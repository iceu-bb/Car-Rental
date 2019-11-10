import React from 'react';
import { useCarQuery, Car } from '../../graphql/types';
import { Icon, Item } from 'semantic-ui-react';
import {
  Container,
  Segment,
  Image,
  Header,
  Grid,
  Divider
} from 'semantic-ui-react';
import { features } from '../../helpers/constants';
import { RouteComponentProps } from 'react-router-dom';

interface IndexedCar extends Car {
  [index: string]: any;
}

export const CarDetail: React.FC<RouteComponentProps> = ({ match }) => {
  const { slug }: any = match.params;
  const [carName, carTransmission] = slug!.split('-');

  const { data, error } = useCarQuery({
    variables: { name: carName, transmission: carTransmission }
  });

  if (data === undefined || data.car === undefined || error) {
    return null;
  }

  const car: IndexedCar = data.car;

  const renderFeatures = () => {
    // 1) Get only existing properties from car
    const carProperties = Object.entries(car).map(
      ([key, value]) => value && key
    );

    // 2) filter features which does not exist on 'car'
    const iconFeatures = features.filter(feature =>
      carProperties.includes(feature.name)
    );

    //  3) render icons
    return iconFeatures.map(iconFeature => {
      const { name, text, icon, isNumber, isString }: any = iconFeature;
      return (
        <Grid.Column key={name}>
          <Grid.Row>
            <Icon name={icon} size='huge' color='violet' />
          </Grid.Row>
          <Grid.Row style={{ marginTop: 15, fontSize: '1.4rem' }}>
            {(isNumber || isString) && name === 'incineration'
              ? car[name] + ' C02 g/km '
              : car[name] === true
              ? text
              : car[name] + ' ' + name}
          </Grid.Row>
        </Grid.Column>
      );
    });
  };

  return (
    <Segment style={{ margin: 0, padding: '100px 0 50px' }}>
      <Container>
        {/* 1 - Car Image and name */}
        <Grid
          divided='vertically'
          stackable
          style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}
        >
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image
                centered
                src={`../assets/${car.name}.png`}
                alt={`${car.name}`}
              />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Header as='h3' size='huge'>
                {`${car.producer} ${car.name} or similar | ${car.transmission}`}
                <Header.Subheader>{`Group ${car.group}`}</Header.Subheader>
              </Header>
              <Item style={{ fontSize: '.75rem', opacity: '.8' }}>
                Reservations are made by car category only. We cannot guarantee
                a specific car model.
              </Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider horizontal style={{ margin: '100px 0 80px' }}>
          <Header
            as='h4'
            size='large'
            style={{
              backgroundColor: '#ddd',
              padding: '10px 20px',
              borderRadius: '5px'
            }}
          >
            Vehicle Features
          </Header>
        </Divider>

        {/* 2 - Icons */}
        <Grid doubling columns={6} textAlign='center'>
          {renderFeatures()}
        </Grid>

        <Divider horizontal style={{ margin: '100px 0 80px' }}>
          <Header as='h4' size='large'>
            Related Vehicles
          </Header>
        </Divider>

        {/* 3 - TODO - Related Vehicles */}
      </Container>
    </Segment>
  );
};
