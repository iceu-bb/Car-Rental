import React from 'react';
import { Segment, Input, Icon, Button } from 'semantic-ui-react';

interface Props {}

export const Discount: React.FC<Props> = () => {
  // TODO loading state, backend verification

  return (
    <Segment
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: 15 }}>
        Apply Discount
      </div>
      <Input
        name='discountCode'
        placeholder='Discount Code'
        // onChange={handleChange}
        icon={<Button color='violet'>Apply</Button>}
      />
    </Segment>
  );
};
