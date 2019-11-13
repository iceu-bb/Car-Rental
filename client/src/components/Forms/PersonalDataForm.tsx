import React, { useEffect, useCallback, useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { mappedCountriesList } from '../../helpers/countriesList';
import { useUpdateUserDataMutation, User } from '../../graphql/types';

interface IPersonalData {
  title: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  dateOfBirth: string | null | undefined;
  countryOfBirth: string | null | undefined;
}

const titleOptions = [
  { key: 'Mr', text: 'Mr', value: 'Mr' },
  { key: 'Mrs', text: 'Mrs', value: 'Mrs' },
  { key: 'Miss', text: 'Miss', value: 'Miss' },
  { key: 'Dr', text: 'Dr', value: 'Dr' },
  { key: 'Ms', text: 'Ms', value: 'Ms' },
  { key: 'Other', text: 'Other', value: 'Other' }
];

const SignupSchema = yup.object().shape({
  title: yup.string().required(),
  firstName: yup
    .string()
    .required()
    .max(32),
  lastName: yup
    .string()
    .required()
    .max(32),
  dateOfBirth: yup.string().required(),
  countryOfBirth: yup.string().required()
});

interface Props {
  user: User;
}

export const PersonalDataForm: React.FC<Props> = ({ user }) => {
  const { title, firstName, lastName, dateOfBirth, countryOfBirth } = user;

  const [message, setMessage] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    formState: { dirty, isSubmitting }
  } = useForm<IPersonalData>({
    validationSchema: SignupSchema,
    defaultValues: {
      title,
      firstName,
      lastName,
      dateOfBirth,
      countryOfBirth
    }
  });

  const [updateUserData] = useUpdateUserDataMutation();

  const onSubmit = useCallback(
    async (formData: IPersonalData) => {
      console.log(formData);
      const { data } = await updateUserData({
        variables: { id: user._id!, ...formData }
      });
      console.log(data, 'update');
      setMessage(true);
      // TODO positive message or Error
      reset();
    },
    [updateUserData, user._id]
  );

  // TODO debounce
  const onChange = useCallback(
    (e, { name, value }) => {
      setValue(name, value, true);
    },
    [setValue]
  );

  useEffect(() => {
    register({ name: 'title' });
    register({ name: 'firstName' });
    register({ name: 'lastName' });
    register({ name: 'dateOfBirth' });
    register({ name: 'countryOfBirth' });
  }, [register]);

  console.log(isSubmitting);

  return (
    <Form
      success={message}
      loading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Select
        name='title'
        defaultValue={title as string}
        label='Title'
        options={titleOptions}
        placeholder='Title'
        onChange={onChange}
        error={errors.title && errors.title.message}
      />

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
        name='dateOfBirth'
        label='Date of birth'
        defaultValue={dateOfBirth}
        placeholder='Date of birth'
        onChange={onChange}
        error={errors.dateOfBirth && errors.dateOfBirth.message}
      />

      <Form.Select
        name='countryOfBirth'
        search
        label='Country'
        defaultValue={countryOfBirth as string}
        options={mappedCountriesList}
        placeholder='Country of birth'
        onChange={onChange}
        error={errors.countryOfBirth && errors.countryOfBirth.message}
      />

      <Message
        success
        header='Form Updated'
        content='Your data has been saved correctly'
      />

      <Button
        color='violet'
        type='submit'
        size='big'
        disabled={Object.keys(errors).length > 0 || !dirty}
      >
        Update
      </Button>
    </Form>
  );
};
