import React from 'react';
import {
  Avatar, Button, Col, Row,
} from 'antd';
import { StyledCard } from 'components/styledComponents/card';

function PatientDetailsCard({
  id = {},
  name = {},
  isActive = {},
  patient = {},
  onOpenPatientDetails = {},
}) {
  return (

    <StyledCard
      title={`ID: ${id}`}
      hoverable
      extra={(
        <Button type="primary" onClick={() => onOpenPatientDetails(patient)}>
          Edit
        </Button>
)}
      style={{ width: 300 }}
    >
      <Row justify="center" gutter={[8, 8]}>
        <Col>
          <Avatar size={128} src={patient.avatar || 'https://joeschmoe.io/api/v1/random'} />
        </Col>
      </Row>
      <p>
        Name:
        {patient.name}
      </p>
      <p>
        Status:
        {isActive ? 'Active' : 'Inactive'}
      </p>
    </StyledCard>

  );
}

export default PatientDetailsCard;
