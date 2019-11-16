import React, { useState, useContext } from 'react';
import { Store } from '../../Store';
import moment from 'moment';

import { Form, Button, Segment } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { useHistory } from 'react-router-dom';

interface IndexedDateObject {
  startDay: string;
  startHour: string;
  returnDay: string;
  returnHour: string;
  renterAge: string;
  discountCode: string;
  [index: string]: any;
}

const ageOptions = [
  { key: 'young', text: '20-25', value: '20-25' },
  { key: 'normal', text: '25+', value: '25+' }
];

export const DateBookingForm = () => {
  const { dispatch } = useContext(Store);
  const history = useHistory();

  const [date, setDate] = useState({
    startDay: '',
    startHour: '',
    returnDay: '',
    returnHour: '',
    renterAge: '',
    discountCode: ''
  } as IndexedDateObject);

  const handleChange = (e: any, { name, value }: any) => {
    setDate({ ...date, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'BOOKING_STEP_1', payload: date });
    history.push('/booking/selection');
  };

  return (
    <Segment>
      <Form size='large' onSubmit={handleSubmit}>
        Pick Up Date
        <Form.Group>
          <DateInput
            placeholder='Date'
            popupPosition='bottom left'
            name='startDay'
            closable
            minDate={moment(new Date()).add(1, 'days')}
            maxDate={
              date.returnDay !== ''
                ? date.returnDay
                : moment(new Date()).add(1, 'year')
            }
            animation='fade'
            hideMobileKeyboard
            value={date.startDay}
            iconPosition='left'
            preserveViewMode={false}
            autoComplete='off'
            onChange={handleChange}
          />
          <TimeInput
            placeholder='Time'
            popupPosition='bottom left'
            name='startHour'
            animation='fade'
            duration={300}
            closable
            autoComplete='off'
            hideMobileKeyboard
            value={date.startHour}
            iconPosition='left'
            onChange={handleChange}
          />
        </Form.Group>
        Drop Off Date
        <Form.Group style={{ marginBottom: 30 }}>
          <DateInput
            placeholder='Date'
            popupPosition='bottom left'
            name='returnDay'
            closable
            minDate={
              date.startDay !== ''
                ? date.startDay
                : moment(new Date()).add(1, 'days')
            }
            maxDate={moment(new Date()).add(1, 'year')}
            animation='fade'
            hideMobileKeyboard
            value={date.returnDay}
            iconPosition='left'
            preserveViewMode={false}
            autoComplete='off'
            onChange={handleChange}
          />
          <TimeInput
            placeholder='Time'
            popupPosition='bottom left'
            name='returnHour'
            animation='fade'
            duration={300}
            closable
            autoComplete='off'
            hideMobileKeyboard
            value={date.returnHour}
            iconPosition='left'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group
          style={{
            maxWidth: 500,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Form.Select
            name='renterAge'
            options={ageOptions}
            placeholder='Renter Age'
            onChange={handleChange}
          />
          <Form.Input
            name='discountCode'
            placeholder='Discount Code'
            onChange={handleChange}
            icon='money'
            iconPosition='left'
          />
        </Form.Group>
        <Button type='submit' size='huge' color='violet'>
          Find a vehicle
        </Button>
      </Form>
    </Segment>
  );
};
