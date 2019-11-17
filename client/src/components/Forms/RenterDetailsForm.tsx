import React, { useEffect, useCallback } from 'react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { Form, Segment, Divider, Button } from 'semantic-ui-react';

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
  let firstName, lastName, email, telephoneNumber;

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

  const onSubmit = (formData: IRenterInformation) => {
    console.log(formData);
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
