import React, { useEffect, useCallback, useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import useForm from 'react-hook-form';
import * as yup from 'yup';
import { useUpdateUserPasswordMutation } from '../../graphql/types';

interface IPersonalData {
  newPassword: string | null | undefined;
  newPasswordConfirm: string | null | undefined;
  currentPassword: string | null | undefined;
}

const SignupSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('No password provided')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/[A-Z]/, 'at least one uppercase char')
    .matches(
      /[a-zA-Z]+[^a-zA-Z\s]+/,
      'at least 1 number or special char (@,!,#, etc).'
    ),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), 'Password are not equal'])
    .required('No password provided'),
  currentPassword: yup.string().required('No password provided.')
});

interface Props {
  userId: string | null | undefined;
}

export const UpdatePasswordForm: React.FC<Props> = ({ userId }) => {
  const [message, setMessage] = useState(false);
  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    formState: { dirty, isSubmitting }
  } = useForm<IPersonalData>({
    validationSchema: SignupSchema
  });

  const onSubmit = useCallback(
    async (formData: IPersonalData) => {
      console.log(formData);

      const { newPassword, newPasswordConfirm, currentPassword } = formData;

      if (!newPassword || !newPasswordConfirm || !currentPassword) {
        return;
      }

      const { data } = await updateUserPassword({
        variables: {
          id: userId!,
          newPassword,
          newPasswordConfirm,
          currentPassword
        }
      });
      console.log(data, 'update');
      setMessage(true);
      // TODO positive message or Error
      reset();
    },
    [updateUserPassword, userId]
  );

  // TODO debounce
  const onChange = useCallback(
    (e, { name, value }) => {
      setValue(name, value, true);
    },
    [setValue]
  );

  useEffect(() => {
    register({ name: 'newPassword' });
    register({ name: 'newPasswordConfirm' });
    register({ name: 'currentPassword' });
  }, [register]);

  return (
    <Form
      success={message}
      loading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Input
        name='newPassword'
        label='New Password'
        placeholder='New Password'
        onChange={onChange}
        error={errors.newPassword && errors.newPassword.message}
      />

      <Form.Input
        name='newPasswordConfirm'
        label='New Password Confirm'
        placeholder='New Password Confirm'
        onChange={onChange}
        error={errors.newPasswordConfirm && errors.newPasswordConfirm.message}
      />

      <Form.Input
        name='currentPassword'
        label='Current Password'
        placeholder='Current Password'
        onChange={onChange}
        error={errors.oldPassword && errors.oldPassword.message}
      />

      <Message
        success
        header='Password Updated'
        content='Your assword has been updated correctly'
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
