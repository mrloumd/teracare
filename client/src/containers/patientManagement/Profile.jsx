import React from 'react'
import { Avatar } from 'antd'
import { useGetPatientDetailsQuery } from 'redux/patient'
import { useParams } from 'react-router-dom'

function Profile() {
  const { id } = useParams()

  const {
    data: { data: patientDetailsData } = {},
    isLoading: isPatientDetailsLoading,
  } = useGetPatientDetailsQuery({
    id,
  })

  return (
    <div>
      {' '}
      <div>
        hello{' '}
        <Avatar
          size={120}
          src={
            patientDetailsData.avatar || 'https://joeschmoe.io/api/v1/random'
          }
        />
        <div style={{ fontSize: '1.5rem', display: 'block' }}>
          {patientDetailsData.name}
        </div>
      </div>
    </div>
  )
}

export default Profile
