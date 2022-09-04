import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import {
  useGetAllPatientsQuery, useUpdatePatientMutation, useCreatePatientMutation,
  useDeletePatientMutation,
} from 'redux/patient';
import DrawerForm from 'components/reusableComponents/DrawerForm';
import PatientDetailsCard from 'components/reusableComponents/PatientDetailsCard';
import ModalForm from 'components/reusableComponents/ModalForm';

function ViewPatientList() {
  const [items, setItems] = React.useState([]);
  const [viewItems, setViewItems] = React.useState([]);
  const [updatePatientForm] = Form.useForm();
  const [createPatientForm] = Form.useForm();
  const [isVisible, setIsVisible] = React.useState(false);

  // Data Logic
  const {
    data: { rows: patientListData } = {},
    isLoading: isPatientListLoading,
  } = useGetAllPatientsQuery();

  const [
    createPatient,
    { isLoading: isCreatePatientLoading },
  ] = useCreatePatientMutation();

  const [updatePatient, { isLoading: isUpdateLoading }] = useUpdatePatientMutation();

  const [deletePatient, { isLoading: isDeleteLoading }] = useDeletePatientMutation();
  //

  const onOpenPatientDetails = (patient) => {
    updatePatientForm.resetFields();
    setViewItems([
      {
        label: 'STATUS',
        name: 'is_active',
        type: 'switch',
        initialValue: patient.is_active,
        rules: [{ required: true, message: 'Please input your status!' }],
      },
      {
        label: 'ID',
        name: 'id',
        type: 'input',
        isDisabled: true,
        initialValue: patient.id,
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Name',
        name: 'name',
        type: 'input',
        initialValue: patient.name,
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Avatar',
        name: 'avatar',
        type: 'uploadImage',
        initialValue: patient.avatar,
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
        label: 'Name',
        name: 'name',
        type: 'input',
        rules: [{ required: true, message: 'Please input your first name!' }],
      },
      {
        label: 'Avatar',
        name: 'avatar',
        type: 'uploadImage',
      },
    ]);
  }, []);

  return (
    <Row span={24}>
      <Col span={24}>
        <Row justify="end" style={{ margin: '1rem', marginRight: '0' }}>
          <DrawerForm
            form={createPatientForm}
            items={items}
            isCreateLoading={isCreatePatientLoading}
            create={createPatient}
            title="Patient"
          />
        </Row>
        <Row justify="center" gutter={[8, 8]}>
          {patientListData?.map((patient) => (
            <Col key={patient.id} style={{ width: '300px', height: '350px' }}>
              <PatientDetailsCard
                key={patient.id}
                id={patient.id}
                name={patient.name}
                isActive={patient.is_active}
                onOpenPatientDetails={onOpenPatientDetails}
                patient={patient}
              />
            </Col>
          ))}
        </Row>
        <ModalForm
          isUpdateLoading={isUpdateLoading}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          viewItems={viewItems}
          form={updatePatientForm}
          update={updatePatient}
          onDelete={deletePatient}
          isDeleteLoading={isDeleteLoading}
        />
      </Col>
    </Row>
  );
}

export default ViewPatientList;
