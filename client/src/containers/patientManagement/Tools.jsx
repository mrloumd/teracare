import React from 'react';
import { Tabs, Form } from 'antd';
import { StyledCard, StyledContainer } from 'components/styledComponents/toolsCard';
import PatientForm from 'components/reusableComponents/PatientForm';
import ToolsDetails from 'components/reusableComponents/ToolsDetails';
import ToolsDrawer from 'components/reusableComponents/ToolsDrawer';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function Tools() {
  return (
    <div>
      <div style={{ float: 'right', marginTop: '2rem' }}>
        <ToolsDrawer />
        {' '}
      </div>
      <br />
      <br />
      <br />
      <StyledContainer>
        <StyledCard title="Available Device" style={{}}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Details" key="1">
              <ToolsDetails />
            </TabPane>
            <TabPane tab="Assign Ptient" key="2">
              <Form>
                <PatientForm />
              </Form>
            </TabPane>
          </Tabs>
        </StyledCard>

        <StyledCard title="Available Device" style={{}}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Details" key="1">
              <ToolsDetails />
            </TabPane>
            <TabPane tab="Assign Ptient" key="2">
              <Form>
                <PatientForm />
              </Form>
            </TabPane>
          </Tabs>
        </StyledCard>
      </StyledContainer>
    </div>
  );
}

export default Tools;
