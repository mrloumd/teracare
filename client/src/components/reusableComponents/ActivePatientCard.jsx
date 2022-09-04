import { RingProgress, TinyLine } from '@ant-design/plots'
import { Avatar, Col, Divider, Row } from 'antd'
import { StyledCard } from 'components/styledComponents/card'
import React, { useEffect } from 'react'
import hearRateLogo from 'assets/img/heartRateLogo.png'
import oxygenLevelLogo from 'assets/img/oxygenLevelLogo.png'

function ActivePatientCard({ patient = {} }) {
  const [oxygenLevel, setOxygenLevel] = React.useState(0)
  const [heartRate, setHeartRate] = React.useState(0)

  // eslint-disable-next-line max-len
  const [hearRateData, setHearRateData] = React.useState(
    patient.readings.map((reading) => reading.heart_rate),
  )

  const oxygenPlotConfig = {
    height: 60,
    autoFit: true,
    percent: oxygenLevel / 100,
    color: ['#5B8FF9', '#E8EDF3'],
  }

  const heartRatePlotConfig = {
    height: 60,
    autoFit: true,
    data: hearRateData,
    smooth: true,
  }

  useEffect(() => {
    if (patient) {
      const newHearRateData = [...hearRateData]
      newHearRateData.push(patient.heart_rate)
      if (newHearRateData.length > 50) {
        newHearRateData.shift()
      }
      setOxygenLevel(patient.oxygen_level)
      setHearRateData(newHearRateData)
      console.log(newHearRateData)
    }
  }, [patient])

  return (
    <StyledCard>
      <Row span={24}>
        <Col span={8}>
          <Avatar
            size={120}
            src={patient.avatar || 'https://joeschmoe.io/api/v1/random'}
          />
        </Col>
        <Col span={16} style={{ paddingLeft: '2rem' }}>
          <Row>{patient.name}</Row>
          <Row>Address</Row>
          <Row>Gender</Row>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 8]}>
        <Col md={12} xs={24}>
          <StyledCard>
            <Row justify="center">
              <img
                src={hearRateLogo}
                alt="heartRate"
                width="30px"
                style={{ margin: '0 1rem' }}
              />
              <p>
                Heart Rate
                {patient.heart_rate}
              </p>
            </Row>

            <TinyLine {...heartRatePlotConfig} />
          </StyledCard>
        </Col>
        <Col md={12} xs={24}>
          <StyledCard>
            <Row justify="center">
              <img
                src={oxygenLevelLogo}
                alt="heartRate"
                width="30px"
                style={{ margin: '0 1rem' }}
              />
              <p>
                Oxygen Level:
                {patient.oxygen_level}
              </p>
            </Row>
            <RingProgress {...oxygenPlotConfig} />
          </StyledCard>
        </Col>
      </Row>
      <Row />
    </StyledCard>
  )
}

export default ActivePatientCard
