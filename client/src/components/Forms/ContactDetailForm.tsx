import React, { useEffect, useCallback, useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateUserDataMutation, User } from '../../graphql/types';
import { mappedCountriesList } from '../../helpers/countriesList';

interface IPersonalData {
  telephoneNumber: number | null | undefined;
  addressLine1: string | null | undefined;
  addressLine2: string | null | undefined;
  city: string | null | undefined;
  region: string | null | undefined;
  postcode: string | null | undefined;
  country: string | null | undefined;
  newsletterCheck: boolean | null | undefined;
  emailCheck: boolean | null | undefined;
  smsCheck: boolean | null | undefined;
}

const SignupSchema = yup.object().shape({
  telephoneNumber: yup
    .number()
    .required()
    .integer('phone number can contain only cyphers'),
  addressLine1: yup
    .string()
    .required()
    .max(50),
  city: yup
    .string()
    .required()
    .max(50),
  postcode: yup
    .string()
    .required()
    .max(15),
  country: yup
    .string()
    .required()
    .max(35)
});

interface Props {
  user: User;
}

export const ContactDetailForm: React.FC<Props> = ({ user }) => {
  const {
    telephoneNumber,
    addressLine1,
    addressLine2,
    city,
    region,
    postcode,
    country,
    newsletterCheck,
    emailCheck,
    smsCheck
  } = user;

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
      telephoneNumber,
      addressLine1,
      addressLine2,
      city,
      region,
      postcode,
      country,
      newsletterCheck,
      emailCheck,
      smsCheck
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
      reset();
    },
    [updateUserData, user._id]
  );

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

  useEffect(() => {
    register({ name: 'telephoneNumber' });
    register({ name: 'addressLine1' });
    register({ name: 'addressLine2' });
    register({ name: 'city' });
    register({ name: 'region' });
    register({ name: 'postcode' });
    register({ name: 'country' });
    register({ name: 'newsletterCheck' });
    register({ name: 'emailCheck' });
    register({ name: 'smsCheck' });
  }, [register]);

  return (
    <Form
      success={message}
      loading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input
        name='telephoneNumber'
        defaultValue={telephoneNumber as number}
        label='Telephone Number'
        placeholder='Telephone Number'
        onChange={onChange}
        error={errors.telephoneNumber && errors.telephoneNumber.message}
      />

      <Form.Input
        name='addressLine1'
        defaultValue={addressLine1}
        label='Address Line 1'
        placeholder='Address Line 1'
        onChange={onChange}
        error={errors.addressLine1 && errors.addressLine1.message}
      />

      <Form.Input
        name='addressLine2'
        defaultValue={addressLine2}
        label='Address Line 2'
        placeholder='Address Line 2'
        onChange={onChange}
        error={errors.addressLine2 && errors.addressLine2.message}
      />

      <Form.Input
        name='city'
        defaultValue={city}
        label='City/Town'
        placeholder='City/Town'
        onChange={onChange}
        error={errors.city && errors.city.message}
      />

      <Form.Input
        name='region'
        label='Region/State'
        defaultValue={region}
        placeholder='Region/State'
        onChange={onChange}
        error={errors.region && errors.region.message}
      />

      <Form.Input
        name='postcode'
        label='Postcode'
        defaultValue={postcode}
        placeholder='Postcode'
        onChange={onChange}
        error={errors.postcode && errors.postcode.message}
      />

      <Form.Select
        name='country'
        search
        label='Country'
        defaultValue={country as string}
        options={mappedCountriesList}
        placeholder='Country'
        onChange={onChange}
        error={errors.country && errors.country.message}
      />

      <Form.Checkbox
        name='newsletterCheck'
        defaultChecked={newsletterCheck || false}
        onChange={onCheck}
        label='I wish to receive email newsletter'
      />
      <Form.Checkbox
        name='emailCheck'
        defaultChecked={emailCheck || false}
        onChange={onCheck}
        label='I wish to receive special offers via email'
      />
      <Form.Checkbox
        name='smsCheck'
        defaultChecked={smsCheck || false}
        onChange={onCheck}
        label='I wish to receive special offers via SMS'
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
