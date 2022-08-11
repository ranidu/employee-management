import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Radio, Input, message, Typography, Modal } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import * as yup from 'yup';

import { useAppSelector, useAppDispatch } from '../../hooks';
import MainLayout from '../../layout/Main';
import Button from '../../components/Button';
import InputField from '../../components/Input';
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from '../../actions/employeeAction';
import { useCallbackPrompt } from '../../hooks/useCallbackPromots';

const { Title } = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .required('First name is a required field')
      .min(6, 'First name must be at least 6 characters')
      .max(10, 'First name must be at most 10 characters'),
    lastName: yup
      .string()
      .required('Last name is a required field')
      .min(6, 'Last name must be at least 6 characters')
      .max(10, 'Last name must be at most 10 characters'),
    email: yup
      .string()
      .required('Email is a required field')
      .email('Email must be a valid email'),
    phoneNumber: yup
      .string()
      .required('Phone number is a required field')
      .matches(/[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/, {
        message: "Phone number should be in valid format",
      }),
  })
  .required();

const Employee = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const { id: employeeId } = useParams();
  const employee: any = useAppSelector((state) => state.employee);
  const loading = useAppSelector((state) => state.loading);
  const updatedSuccess = useAppSelector((state) => state.updatedSuccess);
  const createdSuccess = useAppSelector((state) => state.createdSuccess);

  const [state, setState] = useState({})
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(showDialog)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
    setShowDialog(true)
  }

  useEffect(() => {
    if (employeeId) {
      setIsEdit(true);
      dispatch(getEmployeeById(employeeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  useEffect(() => {
    if (isEdit && employee) {
      setValue("firstName", employee.firstName);
      setValue("lastName", employee.lastName);
      setValue("email", employee.email);
      setValue("phoneNumber", employee.phoneNumber);
      setValue("gender", employee.gender);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee, isEdit]);

  useEffect(() => {
    if (createdSuccess || updatedSuccess) {
      message.success(
        `Record has been successfully ${isEdit ? 'updated' : 'created'}`
      );
    }

    if (updatedSuccess) {
      // message.error("This is an error message");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdSuccess, updatedSuccess]);

  useEffect(() => {
    if(!wasSubmitted){
      showPrompt && changesDetectModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt])

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {

    if (isEdit) {
      dispatch(updateEmployee(employeeId, data));
    } else {
      dispatch(createEmployee(data));
      resetForm();
    }

    setState({})
    setShowDialog(false)
    setWasSubmitted(true);
  };

  const resetForm = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: 'Male',
    });

    setState({})
    setShowDialog(false)

  };

  const changesDetectModal = () => {
    Modal.confirm({
      title: 'Form has been modified',
      icon: <ExclamationCircleOutlined />,
      content: 'You will loose your unsaved changes. Are you sure you want to close this form ?',
      okText: 'Ok',
      cancelText: 'Cancel',
      onOk() {confirmNavigation()},
      onCancel() {cancelNavigation()},
    });
  }

  return (
    <MainLayout>
      <Row className='ButtonWrapper'>
        <Col span={6}>
          <Title level={3}>{`${isEdit ? 'Update' : 'Add'} Employee`}</Title>
        </Col>
        <Col span={6}>
          <Button
            title='Back'
            icon={<LeftCircleOutlined />}
            onClick={() => navigate(-1)}
            className='navigateButtonWrapper'
          />
        </Col>
      </Row>
      <Row>
        <Col span={9} offset={5}>
          {!loading ? (
            <Form
              {...layout}
              name='nest-messages'
              onFinish={handleSubmit(onSubmit)}
              onChange={handleChange}
            >
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label='First name'
                    className='input-required'
                    validateStatus={errors.firstName && 'error'}
                    help={String(errors?.firstName?.message || '')}
                  >
                    <InputField {...field} />
                  </Form.Item>
                )}
              />
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label='Last name'
                    className='input-required'
                    validateStatus={errors.lastName && 'error'}
                    help={String(errors?.lastName?.message || '')}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label='Email address'
                    className='input-required'
                    validateStatus={errors.email && 'error'}
                    help={String(errors?.email?.message || '')}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label='Phone number'
                    className='input-required'
                    validateStatus={errors.phoneNumber && 'error'}
                    help={String(errors?.phoneNumber?.message || '')}
                  >
                    <Input {...field} />
                  </Form.Item>
                )}
              />
              <Controller
                name='gender'
                control={control}
                defaultValue='Male'
                render={({ field }) => (
                  <Form.Item label='Gender'>
                    <Radio.Group {...field}>
                      <Radio value={'Male'}>Male</Radio>
                      <Radio value={'Female'}>Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                )}
              />

              <Button
                title={isEdit ? 'Update' : 'Submit'}
                htmlType='submit'
                className='formButtonWrap'
                disabled={loading ? true : false}
              />
              <Button
                htmlType='reset'
                type={'default'}
                title='Reset'
                onClick={resetForm}
              />
            </Form>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </MainLayout>
  );
};

export default Employee;
