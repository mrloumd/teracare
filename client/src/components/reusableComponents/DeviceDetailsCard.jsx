import React from 'react';
import { Button, Col, Row } from 'antd';
import { StyledCard } from 'components/styledComponents/card';
import oxiLogo from 'assets/img/oxiLogo.png';

function DeviceDetailsCard({
  id = {},
  name = {},
  isActive = {},
  patientName = '',
  device = {},
  onOpenPatientDetails = {},
}) {
  return (

    <StyledCard
      hoverable
      title={`ID: ${id}`}
      extra={(
        <Button type="primary" onClick={() => onOpenPatientDetails(device)}>
          Edit
        </Button>
)}
      style={{ width: 300 }}
    >
      <Row justify="start" gutter={[16]}>
        <Col span={8}>
          <img src={oxiLogo} alt="logo" style={{ width: '100%' }} />
        </Col>
        <Col span={14}>
          <p>
            Name:
            {name}
          </p>
          <p>
            Status:
            {isActive ? 'Active' : 'Inactive'}
          </p>
          <p>
            Assigned Patient:
            {patientName}
          </p>
        </Col>
      </Row>
    </StyledCard>

  );
}

export default DeviceDetailsCard;
