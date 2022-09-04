import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import {
  useGetAllDeviceQuery, useUpdateDeviceMutation, useCreateDeviceMutation, useDeleteDeviceMutation,
} from 'redux/device';
import { useGetAllPatientsQuery } from 'redux/patient';
import DrawerForm from 'components/reusableComponents/DrawerForm';
import DeviceDetailsCard from 'components/reusableComponents/DeviceDetailsCard';
import ModalForm from 'components/reusableComponents/ModalForm';

function ViewDeviceList() {
  const [items, setItems] = React.useState([]);
  const [viewItems, setViewItems] = React.useState([]);
  const [updateDeviceForm] = Form.useForm();
  const [createDeviceForm] = Form.useForm();
  const [isVisible, setIsVisible] = React.useState(false);

  // Data Logic
  const {
    data: { rows: patientListData } = {},
    isLoading: isPatientListLoading,
  } = useGetAllPatientsQuery();

  const {
    data: { rows: deviceListData } = {},
    isLoading: isDeviceListLoading,
  } = useGetAllDeviceQuery();

  const [
    createDevice,
    { isLoading: isCreateDeviceLoading },
  ] = useCreateDeviceMutation();

  const [updateDevice, { isLoading: isUpdateLoading }] = useUpdateDeviceMutation();

  const [deleteDevice, { isLoading: isDeleteLoading }] = useDeleteDeviceMutation();

  //

  const onOpenPatientDetails = (device) => {
    updateDeviceForm.resetFields();
    setViewItems([
      {
        label: 'STATUS',
        name: 'is_active',
        type: 'switch',
        initialValue: device.is_active,
        rules: [{ required: true, message: 'Please input your status!' }],
      },
      {
        label: 'ID',
        name: 'id',
        type: 'input',
        isDisabled: true,
        initialValue: device.id,
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Name',
        name: 'name',
        type: 'input',
        initialValue: device.name,
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Assigned Patient',
        name: 'patient_id',
        type: 'select',
        initialValue: device.patient_id,
        selectData: patientListData.map((patient) => ({
          id: patient.id,
          name: patient.name,
          label: patient.name,
        })),
      },
    ]);

    setIsVisible(true);
  };

  useEffect(() => {
    setItems([
      {
        label: 'STATUS',
        name: 'is_active',
        type: 'switch',
        initialValue: true,
        rules: [{ required: true, message: 'Please input your status!' }],
      },
      {
        label: 'ID',
        name: 'id',
        type: 'input',
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Name',
        name: 'name',
        type: 'input',
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
    ]);
  }, []);

  return (
    <Row span={24}>
      <Col span={24}>
        <Row justify="end" style={{ margin: '1rem', marginRight: '0' }}>
          <DrawerForm
            form={createDeviceForm}
            items={items}
            isCreateLoading={isCreateDeviceLoading}
            create={createDevice}
            title="Device"
          />
        </Row>
        <Row justify="center" gutter={[8, 8]}>
          {deviceListData?.map((device) => (
            <Col key={device.id} style={{ width: '350px', height: '250px' }}>
              <DeviceDetailsCard
                key={device.id}
                id={device.id}
                name={device.name}
                patientName={device.patient?.name}
                isActive={device.is_active}
                patientListData={patientListData}
                onOpenPatientDetails={onOpenPatientDetails}
                device={device}
              />
            </Col>
          ))}
        </Row>
        <ModalForm
          isUpdateLoading={isUpdateLoading}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          viewItems={viewItems}
          form={updateDeviceForm}
          update={updateDevice}
          onDelete={deleteDevice}
        />
      </Col>
    </Row>
  );
}

export default ViewDeviceList;
