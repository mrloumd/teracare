import React from 'react';
import {
  Row,
  Col,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProfileCard from 'components/reusableComponents/ProfileCard';
import { useGetAllPatientsQuery, useCreatePatientMutation } from 'redux/patient';
import { useGetAllDeviceQuery } from 'redux/device';

const { Option } = Select;

function ViewPatientList() {
  const [isVisibleDrawer, setIsVisibleDrawer] = React.useState(false);
  const {
    data: { rows: patientListData } = {},
    isLoading: isPatientListLoading,
  } = useGetAllPatientsQuery();

  const [
    createPatient,
    { isLoading: isCreatePatientLoading },
  ] = useCreatePatientMutation();

  const {
    data: { rows: deviceListData } = {},
    isLoading: isDeviceListLoading,
  } = useGetAllDeviceQuery();

  const [form] = Form.useForm();

  const onFormFinish = (values) => {
    createPatient(values);
  };

  const showDrawer = () => {
    setIsVisibleDrawer(true);
  };
  const onCloseDrawer = () => {
    setIsVisibleDrawer(false);
  };

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  return (
    <>
      <Row justify="end" style={{ margin: '1rem 0' }}>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New patient
        </Button>
      </Row>

      <Row justify="center" style={{ background: 'white', padding: '1rem' }}>
        {patientListData?.map((patient) => (
          <Col key={patient.id}>
            <ProfileCard
              key={patient.id}
              name={patient.name}
              device={patient.device}
              heart_rate={patient.heart_rate}
              oxygen_level={patient.oxygen_level}
            />
          </Col>
        ))}
      </Row>

      <Drawer
        title="Add Patient"
        placement="right"
        onClose={onCloseDrawer}
        visible={isVisibleDrawer}
      >
        <Form form={form} onFinish={onFormFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'age']}
            label="Age"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 99,
                required: true,
                message: 'Please input your age!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please input your gender' }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Button htmlType="submit">Submit</Button>
        </Form>
      </Drawer>
    </>
  );
}

export default ViewPatientList;
