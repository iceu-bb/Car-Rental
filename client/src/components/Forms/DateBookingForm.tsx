import React, { useState, useContext } from 'react';
import { Store } from '../../Store';
import moment from 'moment';

import { Form, Button, Segment, Modal } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { useHistory } from 'react-router-dom';
import { useCheckBookingDateFormMutation } from '../../graphql/types';

interface IndexedDateObject {
  startDay: string;
  startHour: string;
  returnDay: string;
  returnHour: string;
  renterAge: string;
  [index: string]: any;
}

const ageOptions = [
  { key: 'young', text: '20-25', value: '20-25' },
  { key: 'normal', text: '25+', value: '25+' }
];

export const DateBookingForm = () => {
  const { dispatch } = useContext(Store);
  const history = useHistory();

  const [checkBookingDateForm] = useCheckBookingDateFormMutation();

  const [modalError, setModalError] = useState('');
  const [date, setDate] = useState({
    startDay: '',
    startHour: '',
    returnDay: '',
    returnHour: '',
    renterAge: ''
  } as IndexedDateObject);

  const handleDateChange = (e: any, { name, value }: any) => {
    // check if data match pattern for Date or Hour
    const testRegexDay = /^\d{2}\-\d{2}\-\d{4}$/.test(value);
    const testRegexStartHour = /^\d{2}\:\d{2}$/.test(value);
    if (!testRegexDay && !testRegexStartHour) {
      return;
    }
    setDate({ ...date, [name]: value });
  };

  const handleSelectChange = (e: any, { name, value }: any) => {
    setDate({ ...date, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data } = await checkBookingDateForm({
      variables: {
        ...date
      }
    });
    if (!data || !data.checkBookingDateForm) return;

    const { days, error } = data.checkBookingDateForm;

    if (error) {
      // display Modal
      setModalError(error);
      return;
    }

    if (days) {
      dispatch({ type: 'BOOKING_STEP_1', payload: { ...date, days } });
      history.push('/booking/selection');
    }
  };

  return (
    <Segment>
      <Modal
        size='small'
        open={modalError.length > 1}
        onClose={() => setModalError('')}
      >
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>{modalError}</Modal.Content>
        <Modal.Actions>
          <Button
            icon='close'
            color='violet'
            content='Close'
            onClick={() => setModalError('')}
          />
        </Modal.Actions>
      </Modal>
      <Form size='large' onSubmit={handleSubmit}>
        Pick Up Date
        <Form.Group>
          <DateInput
            placeholder='Date'
            popupPosition='bottom left'
            name='startDay'
            closable
            markColor='violet'
            minDate={moment(new Date()).add(1, 'days')}
            // maxDate={
            //   date.returnDay !== ''
            //     ? date.returnDay
            //     : moment(new Date()).add(1, 'year')
            // }
            animation='fade'
            hideMobileKeyboard
            value={date.startDay}
            iconPosition='left'
            preserveViewMode={true}
            autoComplete='off'
            onChange={handleDateChange}
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
            onChange={handleDateChange}
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
            preserveViewMode={true}
            autoComplete='off'
            onChange={handleDateChange}
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
            onChange={handleDateChange}
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
            onChange={handleSelectChange}
          />
        </Form.Group>
        <Button type='submit' size='huge' color='violet'>
          Find a vehicle
        </Button>
      </Form>
    </Segment>
  );
};
