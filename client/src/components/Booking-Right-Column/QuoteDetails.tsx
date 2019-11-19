import React from 'react';
import { Segment, Divider, Header, List } from 'semantic-ui-react';
import { extrasItems } from '../../helpers/constants';

interface Props {
  totalDays: number;
  totalExtras: any;
  days: number;
  fullCoverage: boolean;
}

export const QuoteDetails: React.FC<Props> = ({
  totalDays,
  totalExtras,
  days,
  fullCoverage
}) => {
  // total Amount of Exrtas, useCallback?
  const ExtrasTOTAL = Object.entries(totalExtras).reduce(
    (prev, pair: any, currentIndex) => {
      const [key, value] = pair;

      // this check is for FullCover when we set packacges values to 1, we want to skip them(they will be markes as 'included')
      if (value === 1) return prev;

      //check system ('day' or 'unit')
      return extrasItems[currentIndex].system === 'day'
        ? prev + days * value
        : prev + value;
    },
    0
  );

  const renderPricingList = () => {
    return extrasItems.map(item => {
      const itemValue = totalExtras[item.symbol];
      const isRender = itemValue !== 0;
      return isRender ? (
        <List.Item key={item.name}>
          <List.Content
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '300',
              fontSize: '.9rem'
            }}
          >
            <div>{item.name}</div>
            <div>
              {item.system === 'unit'
                ? itemValue
                : fullCoverage
                ? item.symbol === 'SAAP'
                  ? days * itemValue
                  : 'included'
                : days * itemValue}
            </div>
          </List.Content>
        </List.Item>
      ) : null;
    });
  };

  return (
    <>
      <Segment>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}
        >
          Quote Details
        </div>
        <Divider />
        {/* Pricing List */}
        <Header as='h5' style={{ marginBottom: 5 }}>
          Pricing{' '}
        </Header>
        <List style={{ marginTop: 5 }}>
          {renderPricingList()}
          <List.Item>
            <List.Content
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '300',
                fontSize: '.9rem'
              }}
            >
              <div>Days</div>
              <div>{totalDays}</div>
            </List.Content>
          </List.Item>
        </List>

        {/* TOTAL */}
        <div
          style={{
            backgroundColor: 'violet',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: '60px'
          }}
        >
          Total
          <div>ISK {totalDays + ExtrasTOTAL}</div>
        </div>
        {/* kilometeres */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: '60px',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}
        >
          Unlimited kilometres
        </div>
      </Segment>
    </>
  );
};
