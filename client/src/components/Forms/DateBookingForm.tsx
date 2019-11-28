import React, { useState, useContext } from 'react';
import { Store } from '../../Store';
import moment from 'moment';

import { Form, Button, Segment, Modal } from 'semantic-ui-react';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { useHistory } from 'react-router-dom';
import { useCheckBookingDateFormMutation } from '../../graphql/types';
import styled, { css } from 'styled-components';

const InputStyles = css`
  input {
    border: 1px solid #fff !important;
    color: #fff !important;
    background-color: rgba(255, 255, 255, 0.2) !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.9) !important;
    }
  }

  label {
    color: #fff !important;
  }

  .icon {
    color: rgba(255, 255, 255, 0.9) !important;
  }
`;

const StyledDateInput = styled(DateInput)`
  ${InputStyles}
`;

const StyledTimeInput = styled(TimeInput)`
  ${InputStyles}
`;

const StyledFormSelect = styled(Form.Select)`
  .ui.selection.dropdown {
    background: rgba(255, 255, 255, 0.2) !important;
    border: 1px solid #fff !important;
    color: #fff !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.9) !important;
    }
  }

  .ui.dropdown:not(.button) > .default.text {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .ui.selection.visible.dropdown > .text:not(.default) {
    color: rgba(255, 255, 255, 0.9) !important;
  }
`;

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
      // trigger to display Modal
      setModalError(error);
      return;
    }

    if (days) {
      dispatch({ type: 'BOOKING_STEP_2', payload: { ...date, days } });
      history.push('/booking/selection');
    }
  };

  console.log(date);

  return (
    <Segment
      style={{
        backgroundColor: 'rgba(0,0,0,.1)',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 600
      }}
    >
      <Modal
        size='small'
        open={modalError.length > 1}
        onClose={() => setModalError('')}
        centered={false}
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
      <Form
        size='large'
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <Form.Group
          style={{
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <StyledDateInput
            label='Pick Up Date'
            placeholder='Date'
            popupPosition='bottom left'
            name='startDay'
            closable
            markColor='violet'
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
            preserveViewMode={true}
            autoComplete='off'
            onChange={handleDateChange}
          />

          <StyledTimeInput
            label='Pick Up Time'
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

        <Form.Group
          style={{
            marginBottom: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <StyledDateInput
            label='Return Date'
            placeholder='Date'
            popupPosition='bottom left'
            name='returnDay'
            closable
            minDate={
              date.startDay === ''
                ? moment(new Date()).add(1, 'days')
                : date.startDay
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

          <StyledTimeInput
            label='Return Time'
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
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 25
          }}
        >
          <StyledFormSelect
            name='renterAge'
            options={ageOptions}
            placeholder='Renter Age'
            onChange={handleSelectChange}
          />
        </Form.Group>
        <Button type='submit' size='huge' color='yellow'>
          Find a vehicle
        </Button>
      </Form>
    </Segment>
  );
};
