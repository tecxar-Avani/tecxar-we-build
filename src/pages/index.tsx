import { Button, Row, Col, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, userSelector } from '../store/reducers/currentUser.reducer';
import Link from 'next/link';
import * as utils from '../utils';
import { customerSelector, loginCustomer } from '../store/reducers/customerReducer';
import { useTranslation } from 'react-i18next';
import FeatherIcons from 'feather-icons-react';
import Image from 'next/image';
import { FormInput, Spinner } from '@/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IProps {
  subDomain: string;
}

export default function Login(props: IProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ICustomerCredentials>();

  // let loader = false;
  // const { loading: userLoading } = useAppSelector(userSelector);
  // const { loading: customerLoading,customer } = useAppSelector(customerSelector);
  // console.log('@@@@@@@@@@@@@ userLoading @@@@@@@@@@@@', userLoading);
  // console.log('@@@@@@@@@@@@@ customerLoading @@@@@@@@@@@@', customerLoading);
  // if (!props.subDomain) {
  //   loader = userLoading;
  // } else {
  //   loader = customerLoading;
  // }

  const dispatch = useAppDispatch();
  const { userLoading } = useAppSelector(userSelector);

  let parts: string | any[] = '';
  if (!utils.isServer()) {
    parts = window.location.hostname.split('.')[0];
    // var parts = location.hostname.split('.');
  }
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const onSubmit = handleSubmit((data: ICustomerCredentials) => {
    data.email = data.email.toLowerCase();
    dispatch(loginUser(data));
    // if (props.subDomain === undefined || props.subDomain === 'customer') {
    //   dispatch(loginCustomer(data));
    // } else {
    //   dispatch(loginUser(data));
    // }
  });

  // const schemaResolver = yupResolver(
  //   yup.object().shape({
  //     email: yup.string().required(t('Please enter Email')).email('Please enter valid Email'),
  //     password: yup.string().required(t('Please enter Password')).min(8, 'Password must be of 8 characters'),
  //   }),
  // );

  return (
    <>
      <div className="auth-logo mx-auto text-center">
        <Image src={`/PeoplePro_Name.svg`} alt="logo" width={170} height={60} />

        {/* <span className="logo-lg">
          <img src={'/logo_main.png'} alt="" height="24" />
        </span> */}
      </div>

      <h6 className="h5 mb-0 mt-0 text-center">{t('Welcome back!')}</h6>
      <p className="text-muted mt-1 mb-4 text-center">{t('Enter your email address and password to access your account.')}</p>
      {/* <VerticalForm<ICustomerCredentials> onSubmit={onSubmit} resolver={schemaResolver} formClass="authentication-form"> */}
      <Form noValidate method="POST" onSubmit={onSubmit}>
        <FormInput
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/,
              message: 'Enter valid email address',
            },
          })}
          type="email"
          name="email"
          label={t('Email Address')}
          startIcon={<FeatherIcons icon={'mail'} className="icon-dual" />}
          action={<span className="text-danger">*</span>}
          placeholder={t('hi@tecxar.io')}
          containerClass={'mb-2'}
          onChange={(e: { target: { value: string } }) => setValue('email', e.target.value.trimStart(), { shouldValidate: true })}
        />
        <p className="text-danger">{errors.email?.message}</p>
        <FormInput
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
          type={passwordShown ? 'text' : 'password'}
          name="password"
          label={t('Password')}
          startIcon={<FeatherIcons icon={'lock'} className="icon-dual" />}
          action={<span className="text-danger">*</span>}
          endIcon={<FeatherIcons icon={passwordShown ? 'eye' : 'eye-off'} className="icon-dual" onClick={togglePasswordVisiblity} />}
          // action={
          //   <Link href={'/forgetPassword'}>
          //     <a className="float-end text-muted text-unline-dashed ms-1">{t('Forgot your password?')}</a>
          //   </Link>
          // }
          onChange={(e: { target: { value: string } }) => setValue('password', e.target.value.trimStart(), { shouldValidate: true })}
          placeholder={t('Enter your Password')}
          containerClass={'mb-2'}
        />
        <p className="text-danger">{errors.password?.message}</p>

        {/* {var parts = location.hostname.split('.')} */}
        {/* {console.log('dddddddd', parts[0])} */}

        <div className="d-flex mb-2 justify-content-between align-items-center">
          {/* {parts === 'customer' && ( */}
          {/* <Link href={'/register'}>
            <a className="float-end text-muted text-unline-dashed ms-1">{t('Register')}</a>
          </Link> */}
          {/* )} */}
          <Link href={'/forgetPassword'}>
            <a className="text-muted text-unline-dashed ms-1">{t('Forgot your password?')}</a>
          </Link>
        </div>

        <div className="mb-2  text-center d-grid">
          {userLoading ? (
            <div>
              <Spinner className="m-2" color={'primary'} />
            </div>
          ) : (
            <Button type="submit">{t('Log In')}</Button>
          )}
        </div>
        <Row className="">
          <Col xs={12} className="text-center">
            <p className="text-muted">
              {t("Don't have an account?")}{' '}
              <Link href={'/register'} className="text-primary fw-bold ms-1">
                {t('Sign Up')}
              </Link>
            </p>
          </Col>
        </Row>
        {/* </VerticalForm> */}
      </Form>
    </>
  );
}
