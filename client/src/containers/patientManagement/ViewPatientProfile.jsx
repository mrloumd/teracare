import React from 'react'
import { Avatar } from 'antd'
import { useGetPatientDetailsQuery } from 'redux/patient'
import { useParams } from 'react-router-dom'
import {
  StyledContainer,
  StyledCard,
} from 'components/styledComponents/patientCard'
import { StyledButton } from 'components/styledComponents/patientProfile'
import { StyledDetails } from 'components/styledComponents/patientProfile'
import PatientProfileData from 'components/reusableComponents/PatientProfileData'

function ViewPatientProfile() {
  const { id } = useParams()

  const {
    data: { data: patientDetailsData } = {},
    isLoading: isPatientDetailsLoading,
  } = useGetPatientDetailsQuery({
    id,
  })

  return (
    <StyledContainer>
      {' '}
      <StyledDetails>
        <Avatar
          size={120}
          src={
            patientDetailsData?.avatar || 'https://joeschmoe.io/api/v1/random'
          }
        />
        <div style={{ fontSize: '1.5rem', display: 'block' }}>
          {patientDetailsData?.name}
        </div>
        <StyledButton type="primary">Overview</StyledButton>
        <StyledButton type="primary">Table</StyledButton>
      </StyledDetails>
      <StyledCard>
        <PatientProfileData />
      </StyledCard>
    </StyledContainer>
  )
}

export default ViewPatientProfile
