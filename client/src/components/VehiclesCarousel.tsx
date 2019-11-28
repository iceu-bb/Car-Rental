import React from 'react';
import { CarouselProvider, Slider } from 'pure-react-carousel';

import { Container } from 'semantic-ui-react';
import { CarouselSlide } from './CarouselSlide';
import styled from 'styled-components';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { useCarsQuery } from '../graphql/types';

interface Props {}

const StyledCarouselProvider = styled(CarouselProvider)`
  margin-right: -30px;
  margin-bottom: -80px;
`;

export const VehiclesCarousel: React.FC<Props> = () => {
  const { data } = useCarsQuery();

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  const renderCards = () => {
    return data.cars.map(car => (
      <CarouselSlide
        key={car._id!}
        index={car._id!}
        name={car.name}
        producer={car.producer}
        group={car.group}
        transmission={car.transmission}
      />
    ));
  };

  return (
    <StyledCarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1.25}
      totalSlides={4}
      visibleSlides={3}
      step={1}
      dragStep={1}
      interval={3000}
      isPlaying={true}
      infinite={true}
    >
      <Slider>{renderCards()}</Slider>
    </StyledCarouselProvider>
  );
};
