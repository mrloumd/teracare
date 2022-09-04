import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { TinyLine, RingProgress } from '@ant-design/plots';
import {
  StyledCard,
  StyledContainer,
} from 'components/styledComponents/readingCard';
import { useGetAllPatientsQuery } from 'redux/patient';
// import oxygenLogo from 'assets/img/oxygen.png'

function PatientList() {
  const [data, setData] = React.useState([
    264,
    417,
    438,
    887,
    309,
    397,
    550,
    575,
    563,
    430,
    525,
    592,
    492,
    467,
    513,
    546,
    983,
    340,
    539,
    243,
    226,
    192,
  ]);
  const [oxygenLevel, setOxygenLevel] = React.useState(0);
  const {
    data: { data: patientListData } = {},
    isLoading: isPatientListLoading,
  } = useGetAllPatientsQuery();

  const oxygenPlotConfig = {
    height: 60,
    autoFit: true,
    percent: oxygenLevel / 100,
    color: ['#5B8FF9', '#E8EDF3'],
  };

  const heartRatePlotConfig = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
  };

  useEffect(() => {
    if (patientListData) {
      const newData = [...data];
      newData.push(patientListData.heart_rate);
      setOxygenLevel(patientListData.oxygen_level);
      newData.shift();
      setData(newData);
    }
  }, [patientListData]);

  return (
    <StyledContainer>
      {' '}
      <StyledCard>
        <div
          className="tc-patient--container"
          style={{ borderBottom: 'solid 1px' }}
        >
          {' '}
          <div className="tc-patient--card ">
            {' '}
            <div className="tc-patient-profile">
              <Avatar size={96} src="https://joeschmoe.io/api/v1/random" />
            </div>
          </div>
          <div className="tc-patient--card">
            <div className="tc-patient-details">
              <h3>Mike Marquilencia</h3>
              <div className="patient-status">
                status:
                {' '}
                <em>Normal</em>
              </div>
            </div>
          </div>
        </div>
        <div className="tc-patient--container">
          <div className="tc-patient--card">
            <div className="tc-patient-heartRate">
              {' '}
              <TinyLine {...heartRatePlotConfig} />
              <div>
                <div>
                  {patientListData?.heart_rate}
                  {' '}
                  BPM
                </div>
              </div>
            </div>
          </div>
          <div className="tc-patient--card">
            <div className="tc-patient-oxygenLevel">
              <RingProgress {...oxygenPlotConfig} />
            </div>
          </div>
        </div>
      </StyledCard>
      <StyledCard>
        <div
          className="tc-patient--container"
          style={{ borderBottom: 'solid 1px' }}
        >
          {' '}
          <div className="tc-patient--card">
            {' '}
            <div className="tc-patient-profile">
              <Avatar size={96} src="https://joeschmoe.io/api/v1/random" />
            </div>
          </div>
          <div className="tc-patient--card">
            <div className="tc-patient-details">Details</div>
          </div>
        </div>
        <div className="tc-patient--container">
          <div className="tc-patient--card">
            <div className="tc-patient-heartRate">
              {' '}
              <TinyLine {...heartRatePlotConfig} />
              <div>
                <div>
                  {patientListData?.heart_rate}
                  {' '}
                  BPM
                </div>
              </div>
            </div>
          </div>
          <div className="tc-patient--card">
            <div className="tc-patient-oxygenLevel">
              <RingProgress {...oxygenPlotConfig} />
            </div>
          </div>
        </div>
      </StyledCard>
    </StyledContainer>
  );
}

export default PatientList;
