import React, { useContext } from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

import { useRelatedCarsQuery } from '../../graphql/types';
import { extrasItems } from '../../helpers/constants';
import { Store } from '../../Store';

export const UpgradeCar: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const {
    bookingCar,
    bookingInfo,
    totalExtras,
    extrasToGroupRate,
    bookingType
  } = state;

  const { data, loading, error } = useRelatedCarsQuery({
    variables: { id: bookingCar._id!, group: bookingCar.group }
  });

  if (!data || !data.relatedCars || error || loading) {
    return null;
  }

  const car = data.relatedCars[0];
  const { _id, name, producer, group, transmission, pricePerDay } = car;

  //the same fn in CarCardBooking
  const prices = (nr: number) => {
    let price = bookingInfo.days * pricePerDay;
    if (bookingInfo.renterAge !== '25+') {
      price *= 1.15;
    }
    const pricesArr = [
      Math.round(price),
      Math.round(0.9 * price),
      Math.round(1.25 * price)
    ];
    return pricesArr[nr];
  };

  //similiar in QuoteDetails(TODO - DRY)
  // count extrasTotal, slice(0,4) - only for coverages
  const ExtrasTOTALfirst = Object.entries(totalExtras)
    .slice(0, 4)
    .reduce((prev, pair: any, currentIndex) => {
      const [key, value] = pair;

      // this check is for FullCover when we set packacges values to 1, we want to skip them(they will be markes as 'included')
      if (value === 1) return prev;

      //check system ('day' or 'unit')
      return extrasItems[currentIndex].system === 'day'
        ? prev + bookingInfo.days * value
        : prev + value;
    }, 0);

  // slice(4, length) - extras for unit
  const ExtrasTOTALsecond = Object.entries(totalExtras)
    .slice(4, extrasItems.length)
    .reduce((prev, pair: any) => {
      const [key, value] = pair;

      return prev + value;
    }, 0);

  // similar calculations in STORE ACTION SET_UPGRADED_CAR
  //   count value for the upper group car
  const upperCarPrice = () => {
    // add Extras to upgraded Price, packages are multiply by new group rate and divied by current group rate
    const packagesTotal =
      (ExtrasTOTALfirst * extrasToGroupRate[group]) /
      extrasToGroupRate[bookingCar.group];

    const index = ['location', 'prepaid', 'fullCover'].indexOf(bookingType);

    return Math.round(prices(index) + packagesTotal + ExtrasTOTALsecond);
  };

  const handleCarUpgrade = () => {
    const index = ['location', 'prepaid', 'fullCover'].indexOf(bookingType);
    dispatch({ type: 'SET_TOTAL_DAYS', payload: prices(index) });
    dispatch({
      type: 'SET_UPGRADED_CAR',
      payload: { _id, name, group, transmission, upgraded: true }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}
    >
      <Image
        src={`${process.env.PUBLIC_URL}/assets/${name}.png`}
        alt={`${producer} ${name}`}
        style={{ width: '40%', objectFit: 'contain' }}
      />

      <Card style={{ boxShadow: 'none' }}>
        <Card.Content>
          <Card.Header>{`${producer} ${name} | Group ${group}`}</Card.Header>
          <Card.Meta
            style={{ marginTop: '5px', fontSize: '.7rem', lineHeight: '12px' }}
          >
            Reservations are made by car category only. We cannot guarantee a
            specific car model.
          </Card.Meta>
          <Card.Description style={{ margin: '15px 0 5px' }}>
            <p>
              ISK{' '}
              <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                {upperCarPrice()}
              </span>
            </p>
          </Card.Description>
          <Button onClick={() => handleCarUpgrade()} color='violet'>
            Upgrade Car
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};
