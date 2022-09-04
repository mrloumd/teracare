import Table from 'components/reusableComponents/Table'

import React, { useEffect, useState } from 'react'
import { useGetAllPatientReadingsQuery } from 'redux/patient'
import { useParams } from 'react-router-dom'

function VitalsTable() {
  const { id } = useParams()

  const [filteredInfo, setFilteredInfo] = useState({})
  const [sortedInfo, setSortedInfo] = useState({})
  const [stackedData, setStackedData] = useState([])

  const {
    data: { rows: patientReadingsData } = [],
    isLoading: isPatientReadingsLoading,
  } = useGetAllPatientReadingsQuery({
    id,
  })

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
    <div>
      {' '}
      hello
      <Table columns={columns} dataSource={patientReadingsData} />
    </div>
  )
}

export default VitalsTable
