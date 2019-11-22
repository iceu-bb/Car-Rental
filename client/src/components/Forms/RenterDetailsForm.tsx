import React, { useEffect, useCallback, useContext } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { Form, Segment, Divider, Button } from 'semantic-ui-react';
import { useCreateBookingMutation } from '../../graphql/types';
import { Store } from '../../Store';
import { useHistory } from 'react-router-dom';

interface Props {
  userData?: {
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    email: string | null | undefined;
    telephoneNumber: number | null | undefined;
  };
}

interface IRenterInformation {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  telephoneNumber: number | null | undefined;
  airlineCode: string | null | undefined;
  flightNumber: number | null | undefined;
  newsletterCheck: boolean | null | undefined;
}

interface IExtrasObject {
  name: string;
  value: number;
}

const RenterDetailSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .max(32),
  lastName: yup
    .string()
    .required()
    .max(32),
  telephoneNumber: yup
    .number()
    .required()
    .integer('phone number can contain only cyphers'),
  email: yup.string().required(),
  newsletterCheck: yup.boolean().required()
});

export const RenterDetailsForm: React.FC<Props> = ({ userData }) => {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const [createBooking] = useCreateBookingMutation();

  let firstName, lastName, email, telephoneNumber;
  // for populating Form with user Data if user is Logged In
  if (userData) {
    firstName = userData.firstName;
    lastName = userData.lastName;
    email = userData.email;
    telephoneNumber = userData.telephoneNumber;
  }

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    formState: { dirty, isSubmitting }
  } = useForm<IRenterInformation>({
    validationSchema: RenterDetailSchema,
    defaultValues: {
      firstName,
      lastName,
      email,
      telephoneNumber
    }
  });

  useEffect(() => {
    register({ name: 'firstName' });
    register({ name: 'lastName' });
    register({ name: 'email' });
    register({ name: 'telephoneNumber' });
    register({ name: 'airlineCode' });
    register({ name: 'flightNumber' });
    register({ name: 'newsletterCheck' });
  }, [register]);

  const onChange = useCallback(
    (e, { name, value }) => {
      setValue(name, value, true);
    },
    [setValue]
  );

  const onCheck = useCallback(
    (e, { name, checked }) => {
      setValue(name, checked);
    },
    [setValue]
  );

  const onSubmit = async (formData: IRenterInformation) => {
    // create array of extras
    const extrasArray = [] as IExtrasObject[];
    Object.entries(state.totalExtras).map(([key, value]) => {
      extrasArray.push({ name: key, value });
    });

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.telephoneNumber
    ) {
      return history.push('/');
    }

    const { firstName, lastName, email, telephoneNumber } = formData;

    const { data } = await createBooking({
      variables: {
        car: state.bookingCar._id,
        firstName,
        lastName,
        email,
        telephoneNumber,
        bookingType: state.bookingType,
        bookingDate: {
          ...state.bookingInfo
        },
        totalDays: state.totalDays,
        extras: extrasArray
      }
    });

    if (!data || !data.createBooking) {
      dispatch({ type: 'SET_BOOKING_STEP', payload: 0 });
      reset();
      alert('We are sorry. Please try agian');
      return history.push('/');
    }

    const bookingNumber = data.createBooking.bookingNumber;

    dispatch({
      type: 'SET_RENTER_INFORMATION',
      payload: { firstName, lastName, email, telephoneNumber }
    });
    dispatch({ type: 'SET_BOOKING_NUMBER', payload: bookingNumber });
    dispatch({ type: 'SET_BOOKING_STEP', payload: 5 });
    reset();

    history.replace(`/booking-confirmation/${bookingNumber}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Segment>
        Renter Information
        <Divider />
        <Form.Input
          name='firstName'
          defaultValue={firstName}
          label='First name'
          placeholder='First name'
          onChange={onChange}
          error={errors.firstName && errors.firstName.message}
        />
        <Form.Input
          name='lastName'
          defaultValue={lastName}
          label='Last name'
          placeholder='Last name'
          onChange={onChange}
          error={errors.lastName && errors.lastName.message}
        />
        <Form.Input
          name='email'
          defaultValue={email}
          label='Email address'
          placeholder='Email address'
          onChange={onChange}
          error={errors.email && errors.email.message}
        />
        <Form.Input
          name='telephoneNumber'
          defaultValue={telephoneNumber}
          label='Phone Number'
          placeholder='Phone Number'
          onChange={onChange}
          error={errors.telephoneNumber && errors.telephoneNumber.message}
        />
      </Segment>
      <Segment>
        Flight Information (Optional) <Divider />
        <Form.Input
          name='airlineCode'
          label='Airline Code'
          placeholder='Airline Code'
          onChange={onChange}
          error={errors.airlineCode && errors.airlineCode.message}
        />
        <Form.Input
          name='flightNumber'
          label='Flight Number'
          placeholder='Flight Number'
          onChange={onChange}
          error={errors.flightNumber && errors.flightNumber.message}
        />
      </Segment>
      <Segment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <p>Book your Vehicle Now</p>
            <Form.Checkbox
              name='newsletterCheck'
              onChange={onCheck}
              label='I agree to the Terms & Conditions'
              error={
                errors.newsletterCheck && {
                  content: 'You must agree to the terms and conditions',
                  pointing: 'left'
                }
              }
            />
          </div>
          <Button type='submit' color='yellow'>
            Book Vehicle
          </Button>
        </div>
      </Segment>
    </Form>
  );
};
