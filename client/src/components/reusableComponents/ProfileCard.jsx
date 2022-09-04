import React from 'react'
import { Row, Card, Col } from 'antd'

function ProfileCard({
  name = {},
  device = {},
  heartRate = {},
  oxygenLevel = {},
}) {
  return (
    <Card>
      <Row>
        <Col span={12}>
          <img style={{ width: '100%' }} alt="" />
        </Col>
      </Row>
      <Row>
        <Col span={24}>{name}</Col>
      </Row>
    </Card>
  )
}

export default ProfileCard
