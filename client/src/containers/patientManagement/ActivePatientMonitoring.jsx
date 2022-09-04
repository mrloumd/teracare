import React from 'react'
import { useGetAllPatientWithDeviceQuery } from 'redux/patient'
import { useGetAllDeviceQuery } from 'redux/device'
import { Col, Row } from 'antd'
import ActivePatientCard from 'components/reusableComponents/ActivePatientCard'
import { StyledButton } from 'components/styledComponents/button'
import { Link } from 'react-router-dom'
// import oxygenLogo from 'assets/img/oxygen.png'

function ActivePatientMonitoring() {
  const [items, setItems] = React.useState([])
  const {
    data: patientListData = {},
    isLoading: isPatientListLoading,
  } = useGetAllPatientWithDeviceQuery()

  const {
    data: { rows: deviceListData } = {},
    isLoading: isDeviceListLoading,
  } = useGetAllDeviceQuery()

  return (
    <Row justify="center" gutter={[8, 8]} span={24}>
      {Object.entries(patientListData).map(([key, value]) => (
        <Col key={value.id} style={{ width: '400px', minHeight: '400px' }}>
          <div>
            <Link to={`/view-patientProfile/${value.id}`} key={value.id}>
              <div style={{ cursor: 'default' }}>
                <ActivePatientCard
                  key={value.id}
                  patient={value}
                  onClick={() => {}}
                />
              </div>

              <StyledButton>View patient profile</StyledButton>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default ActivePatientMonitoring
