import React from 'react';
import {
  Input, InputNumber, Row, Form, Select, Button,
} from 'antd';

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

function patientForm() {
  const onFinish = (values) => {

  };

  return (
    <Row>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={['user', 'name']}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[{ type: 'number', min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Location">
          <Input.Group compact>
            <Form.Item
              name={['address', 'province']}
              noStyle
              rules={[{ required: true, message: 'Province is required' }]}
            >
              <Select placeholder="Select Room number">
                <Option value="Room 1">Room 1</Option>
                <Option value="Room 2">Room 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['address', 'street']}
              noStyle
              rules={[{ required: true, message: 'Street is required' }]}
            >
              <Input style={{ width: '50%' }} placeholder="Input bed number" />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}

export default patientForm;
