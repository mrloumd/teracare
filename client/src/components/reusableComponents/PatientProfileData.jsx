import React, { useEffect, useState } from 'react'
import {
  useGetAllPatientReadingsQuery,
  useGetPatientDetailsQuery,
} from 'redux/patient'
import { useParams } from 'react-router-dom'
import { Progress, Skeleton } from 'antd'

import OxygenLevelAreaPlot from 'components/reusableComponents/OxygenLevelAreaPlot'
import HeartRateAreaPlot from 'components/reusableComponents/HeartRateAreaPlot'
// import PatientProfileCard from 'components/reusableComponents/PatientProfileCard'

// import { StyledDetails } from 'components/styledComponents/patientProfile'
import Table from './Table'

import heartRateLogo from 'assets/img/heartRateLogo.png'

function PatientProfileData() {
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
    <div className="tc-component">
      {isPatientReadingsLoading ||
      isPatientDetailsLoading ||
      !patientReadingsData ? (
        <Skeleton /> // show loading screen
      ) : (
        <div className="tc-vitals--container">
          <div className="tc-vitals--card ">
            <div className="tc-vitals" style={{ padding: '2rem' }}>
              <img src={heartRateLogo} alt="profile" style={{ width: '15%' }} />
              <span>
                {patientDetailsData.heart_rate || 0}
                bpm
              </span>
              <div style={{ display: 'block' }}> Heart Rate</div>
              <Progress
                strokeColor={
                  patientDetailsData.heart_rate > 80 ? '#f5222d' : '#52c41a'
                }
                percent={(patientDetailsData.heart_rate / 80) * 100 || 0}
                status="active"
                strokeWidth={5}
                showInfo={false}
              />
            </div>
            <div className="tc-vitals" style={{ padding: '2rem' }}>
              <img src={heartRateLogo} alt="profile" style={{ width: '15%' }} />
              <span> {patientDetailsData.oxygen_level || 0}%</span>
              <div style={{ display: 'block' }}> Oxygen Level </div>
              <Progress
                strokeColor={
                  patientDetailsData.oxygen_level < 85 ? '#f5222d' : '#52c41a'
                }
                percent={patientDetailsData.oxygen_level || 0}
                status="active"
                strokeWidth={5}
                showInfo={false}
              />
            </div>
          </div>

          <div className="tc-vitals--card" style={{ width: '70vh' }}>
            <div className="tc-vitals" style={{ height: '40vh' }}>
              {' '}
              <HeartRateAreaPlot data={patientReadingsData} />
            </div>
            <div className="tc-vitals" style={{ height: '40vh' }}>
              {' '}
              <OxygenLevelAreaPlot data={patientReadingsData} />
            </div>
          </div>
          <Table columns={columns} dataSource={patientReadingsData} />
        </div>
      )}
    </div>
  )
}

export default PatientProfileData
