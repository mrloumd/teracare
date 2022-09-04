/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'

import {
  useGetAllPatientReadingsQuery,
  useGetPatientDetailsQuery,
} from 'redux/patient'
import { useParams } from 'react-router-dom'
import { Avatar, Col, Progress, Row, Skeleton } from 'antd'
import Table from 'components/reusableComponents/Table'
import OxygenLevelAreaPlot from 'components/reusableComponents/OxygenLevelAreaPlot'
import HeartRateAreaPlot from 'components/reusableComponents/HeartRateAreaPlot'
import { StyledCard } from 'components/styledComponents/card'
import heartRateLogo from 'assets/img/heartRateLogo.png'

function PatientProfile() {
  const { id } = useParams()
  const [tableItems, setTableItems] = React.useState([])
  const [data, setData] = React.useState([])

  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const [stackedData, setStackedData] = useState([])
  const [oxygenLevel, setOxygenLevel] = React.useState(0)

  const {
    data: { rows: patientReadingsData } = [],
    isLoading: isPatientReadingsLoading,
  } = useGetAllPatientReadingsQuery({
    id,
  })

  const {
    data: { data: patientDetailsData } = {},
    isLoading: isPatientDetailsLoading,
  } = useGetPatientDetailsQuery({
    id,
  })

  const oxygenPlotConfig = {
    height: 60,
    autoFit: true,
    percent: oxygenLevel / 100,
    color: ['#5B8FF9', '#E8EDF3'],
  }

  const heartRatePlotConfig = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
  }

  useEffect(() => {
    if (patientReadingsData) {
      let newData = []
      newData = patientReadingsData.map((reading) => ({
        type: 'heart_rate',
        created_at: reading.created_at,
        value: reading.heart_rate,
      }))

      newData = newData.concat(
        patientReadingsData.map((reading) => ({
          type: 'oxygen_level',
          created_at: reading.created_at,
          value: reading.oxygen_level,
        })),
      )

      setStackedData(newData)
      // setOxygenLevel(patientDetailsData.oxygen_level);
      // setData(patientDetailsData.readings.map((reading) => reading.heart_rate));
    }
  }, [patientReadingsData])

  const columns = [
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      filteredValue: filteredInfo.name || null,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Oxygen Level',
      dataIndex: 'oxygen_level',
      key: 'oxygen_level',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      filteredValue: filteredInfo.is_active || null,
      sortOrder: sortedInfo.columnKey === 'is_active' && sortedInfo.order,
    },
    {
      title: 'Heart Rate',
      dataIndex: 'heart_rate',
      key: 'heart_rate',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
      filteredValue: filteredInfo.is_active || null,
      sortOrder: sortedInfo.columnKey === 'is_active' && sortedInfo.order,
    },
  ]

  console.log('patientReadingsData', patientReadingsData)
  return (
    <Row span={24} gutter={[8, 8]}>
      {isPatientReadingsLoading ||
      isPatientDetailsLoading ||
      !patientReadingsData ? (
        <Skeleton /> // show loading screen
      ) : (
        <Col span={24}>
          {/* <div className="tc-container">
              <div className="tc-card" style={{ borderRadius: '1rem 0 0 1rem' }}>
                <PatientDetails
                  patient={patientDetailsData}
                />
              </div>
              <div className="tc-card" style={{ borderRadius: '0 1rem 1rem 0' }}>
                <h1>Heart Rate</h1>
                <div className="tc-patient-heartRate">
                  <div className="tc-patient-heartRate--data">
                    realtime data
                    <TinyLine style={{ height: '20%' }} {...heartRatePlotConfig} />
                    <div>
                      {patientListData?.heart_rate}
                      {' '}
                      BPM
                    </div>
                  </div>
                  <div className="tc-patient-heartRate--data">highest bpm</div>
                  <div className="tc-patient-heartRate--data">lowest bpm</div>
                  <div className="tc-patient-heartRate--data">avrg bpm</div>
                </div>
                <h1>Oxygen Level</h1>
                <div className="tc-patient-oxygenLevel">
                  {' '}
                  <div className="tc-patient-oxygenLevel--data">
                    realtime data
                    <RingProgress
                      style={{ height: '80%', marginTop: '0.5rem' }}
                      {...oxygenPlotConfig}
                    />
                  </div>
                  <div className="tc-patient-oxygenLevel--data">
                    highest oxygen level
                    <RingProgress
                      style={{ height: '55%', marginTop: '1.7rem' }}
                      {...oxygenPlotConfig}
                    />
                  </div>
                  <div className="tc-patient-oxygenLevel--data">
                    lowest oxygen level
                    <RingProgress
                      style={{ height: '55%', marginTop: '1.7rem' }}
                      {...oxygenPlotConfig}
                    />
                  </div>
                  <div className="tc-patient-oxygenLevel--data">
                    avrg oxygen level
                    <RingProgress
                      style={{ height: '55%', marginTop: '1.7rem' }}
                      {...oxygenPlotConfig}
                    />
                  </div>
                </div>
              </div>

            </div> */}
          <Row gutter={[16, 16]}>
            <Col md={{ span: 18, order: 0 }} xs={{ span: 24, order: 1 }}>
              <Row gutter={[16, 16]}>
                <Col md={12} xs={24}>
                  <StyledCard hoverable>
                    <Row justify="center" align="middle">
                      <Col>
                        <img
                          src={heartRateLogo}
                          alt="profile"
                          style={{ width: '50%' }}
                        />
                      </Col>
                      <Col>
                        <div style={{ fontSize: '2rem', display: 'block' }}>
                          {patientDetailsData.heart_rate || 0}
                          bpm
                        </div>
                        <div style={{ display: 'block' }}> Heart Rate</div>
                      </Col>
                    </Row>
                    <Row>
                      <Progress
                        strokeColor={
                          patientDetailsData.heart_rate > 80
                            ? '#f5222d'
                            : '#52c41a'
                        }
                        percent={
                          (patientDetailsData.heart_rate / 80) * 100 || 0
                        }
                        status="active"
                        strokeWidth={5}
                        showInfo={false}
                      />
                    </Row>
                  </StyledCard>
                </Col>
                <Col md={12} xs={24}>
                  <StyledCard hoverable>
                    <Row justify="center" align="middle">
                      <Col>
                        <img
                          src={heartRateLogo}
                          alt="profile"
                          style={{ width: '50%' }}
                        />
                      </Col>
                      <Col>
                        <div style={{ fontSize: '2rem', display: 'block' }}>
                          {patientDetailsData.oxygen_level || 0}%
                        </div>
                        <div style={{ display: 'block' }}> Oxygen Level</div>
                      </Col>
                    </Row>
                    <Row>
                      <Progress
                        strokeColor={
                          patientDetailsData.oxygen_level < 85
                            ? '#f5222d'
                            : '#52c41a'
                        }
                        percent={patientDetailsData.oxygen_level || 0}
                        status="active"
                        strokeWidth={5}
                        showInfo={false}
                      />
                    </Row>
                  </StyledCard>
                </Col>
                {/* <Col span={24}>
                    <StyledCard
                      hoverable
                    >
                      <StackedAreaPlot
                        data={stackedData}
                      />
                    </StyledCard>
                  </Col> */}
              </Row>
            </Col>
            <Col md={6} xs={24} style={{ height: 'auto' }}>
              <Row span={24} gutter={[16, 16]} style={{ height: '100%' }}>
                <Col span={24}>
                  <StyledCard hoverable>
                    <Row align="center">
                      <Avatar
                        size={120}
                        src={
                          patientDetailsData.avatar ||
                          'https://joeschmoe.io/api/v1/random'
                        }
                      />
                    </Row>
                    <Row align="center">
                      <Col>
                        <div style={{ fontSize: '1.5rem', display: 'block' }}>
                          {patientDetailsData.name}
                        </div>
                      </Col>
                    </Row>
                  </StyledCard>
                </Col>
                {/* <Col span={24}>
                    <StyledCard
                      hoverable
                    >
                      <RadialFitnessPLot />

                    </StyledCard>
                  </Col> */}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={24} style={{ paddingTop: '1rem' }}>
              <HeartRateAreaPlot data={patientReadingsData} />
            </Col>
            <Col lg={12} md={24} style={{ paddingTop: '1rem' }}>
              <OxygenLevelAreaPlot data={patientReadingsData} />
            </Col>
            <Row justify="center" style={{ margin: '1rem' }}>
              {/* <CSVLink data={patientReadingsData} headers={columns}>
                  <Button type="primary">
                    Download Readings CSV
                  </Button>
                </CSVLink> */}
            </Row>
            <Table columns={columns} dataSource={patientReadingsData} />
          </Row>
        </Col>
      )}
    </Row>
  )
}

export default PatientProfile
