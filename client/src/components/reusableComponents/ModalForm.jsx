import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col, Form, Input, InputNumber, Modal, Row, Select, Switch, Upload, message,
} from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  console.log(img);
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function ModalForm({
  setIsVisible,
  isVisible,
  viewItems = [],
  isUpdateLoading = {},
  update = {},
  form = {},
  isDeleteLoading = false,
  onDelete = {},
}) {
  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState(null);

  const handleFinish = (values) => {
    console.log('Received values of form: ', values);
    update({ ...values, avatar });
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleDelete = (values) => {
    onDelete(values);
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
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
    <Modal title="Basic Modal" visible={isVisible} footer={null} onCancel={handleCancel} destroyOnClose>
      <Form
        layout="vertical"
        hideRequiredMark
        form={form}
        onFinish={handleFinish}
      >
        {viewItems?.map((item) => (
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
                {{ // switch case to dertermine the type of input to render
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
                      allowClear
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
                      // beforeUpload={beforeUpload}
                      onChange={handleImageUpload}
                      data={{
                        key: '9da4911c0a43df12fc906ec4a7642b4f',
                      }}
                      maxCount={1}
                    >
                      {avatar || item.initialValue ? (
                        <img
                          src={avatar || item.initialValue}
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
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isUpdateLoading}>
            Update
          </Button>
          <Button
            type="danger"
            htmlType="button"
            size="large"
            loading={isDeleteLoading}
            onClick={(value) => handleDelete({
              id: form.getFieldValue('id'),
            })}
          >
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalForm;
