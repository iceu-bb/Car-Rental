import React from 'react';
import { Segment, Select } from 'semantic-ui-react';

interface Props {}

const currencyOptions = [
  { key: 'isk', value: 'isk', text: 'ISK' },
  { key: 'euro', value: 'euro', text: 'EUR' },
  { key: 'pound', value: 'pound', text: 'GBP' },
  { key: 'dollar', value: 'dollar', text: 'USD' }
];

export const Currency: React.FC<Props> = () => {
  return (
    <Segment
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Currency</div>
      <Select
        defaultValue={currencyOptions[0].key}
        options={currencyOptions}
        style={{ minWidth: '10px' }}
      />
    </Segment>
  );
};
