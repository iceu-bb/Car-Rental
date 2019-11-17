import React from 'react';
import { Segment } from 'semantic-ui-react';

interface Props {}

export const QuoteDetails: React.FC<Props> = () => {
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
          <div>ISK 30000</div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minHeight: '60px'
          }}
        >
          <p style={{ margin: 0 }}>Damage Liability</p>
          <p>ISK 250000</p>
        </div>
        <div>Unlimited kilometres</div>
      </Segment>
    </>
  );
};
