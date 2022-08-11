import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Space, Popconfirm } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { useAppDispatch, useAppSelector } from '../../hooks';
import MainLayout from '../../layout/Main';
import Table from '../../components/Table';
import Button from '../../components/Button';
import { getEmployees, deleteEmployee } from '../../actions/employeeAction';

interface DataType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
}

export default function Summary() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees);
  const deleteSuccess = useAppSelector((state) => state.deleteSuccess);

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/employee/edit/${record.id}`}>Edit</Link>
          <Popconfirm
            title="Are you sure to delete this employee ?"
            onConfirm={() => deleteConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Link to={""}>Delete</Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(deleteSuccess) {
      dispatch(getEmployees());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSuccess])

  const deleteConfirm = (employeeId: any) => {
    dispatch(deleteEmployee(employeeId))
  }


  return (
    <>
      <MainLayout>
        <Row className='ButtonWrapper'>
          <Col span={20} offset={2}>
            <Button
              title='Add'
              icon={<UserAddOutlined />}
              onClick={() => navigate('/employee/add')}
              size='middle'
            />
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <Table columns={columns} data={employees} />
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
