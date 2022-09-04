import React, { useState } from 'react';
import {
  Drawer, Form, Button, Col, Row, Input, Space, Select, InputNumber, Switch, message, Upload,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 5000 / 5000 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt2M;
}

function DrawerForm({
  form = {},
  items = [],
  isCreateLoading = {},
  create = {},
  title = '',
}) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onFinish = (values) => {
    create({ ...values, avatar });
  };
  const handleImageUpload = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(
      //   info.file.originFileObj,
      //   (img) => setAvatar(img),
      // );
      setAvatar(info.file.response.data.url);
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        {`Create ${title}`}
      </Button>
      <Drawer
        title={`Add ${title}`}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={(
          <Form
            form={form}
          >
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button loading={isCreateLoading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form>
   )}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          form={form}
        >
          {items.map((item) => (
            <Row key={item.name} gutter={16}>
              <Col span={16}>
                <Form.Item
                  name={item.name}
                  label={item.label}
                  rules={item.rules}
                  type={item.type}
                  initialValue={item.initialValue}
                  valuePropName={item.type === 'switch' ? 'checked' : 'value'}
                >
                  {{ // switch case to dertermine the type of input to render\
                    input: (
                      <Input
                        placeholder={item.placeholder}
                        disabled={item.isDisabled}
                      />
                    ),
                    select: (
                      <Select
                        placeholder={item.placeholder}
                        disabled={item.isDisabled}
                      >
                        {item.selectData?.map((selectItem) => (
                          <Option key={selectItem.id} value={selectItem.id}>
                            {selectItem?.name}
                          </Option>
                        ))}
                      </Select>
                    ),
                    inputNumber: (
                      <InputNumber
                        placeholder={item.placeholder}
                        disabled={item.isDisabled}
                        min={0}
                      />
                    ),
                    switch: (
                      <Switch
                        disabled={item.isDisabled}
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                      />
                    ),
                    textArea: (
                      <Input.TextArea
                        placeholder={item.placeholder}
                        disabled={item.isDisabled}
                      />
                    ),
                    uploadImage: (
                      <Upload
                        name="image"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://api.imgbb.com/1/upload"
                        onChange={handleImageUpload}
                        beforeUpload={beforeUpload}
                        data={{
                          key: '9da4911c0a43df12fc906ec4a7642b4f',
                        }}
                        maxCount={1}

                      >
                        {avatar ? (
                          <img
                            src={avatar}
                            alt="avatar"
                            style={{ width: '100%', padding: '.5rem' }}
                          />
                        ) : (
                          <div>
                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    ),
                  }[item.type]}

                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      </Drawer>
    </>
  );
}

export default DrawerForm;
