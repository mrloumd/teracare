import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Row, Button, Menu } from 'antd'
// import { SmileOutlined } from '@ant-design/icons'
import logo from 'assets/img/logo.png'
import logoBig from 'assets/img/logoBig.png'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'

import ViewPatientList from 'containers/patientManagement/ViewPatientList'
import PatientProfile from 'containers/patientManagement/PatientProfile'
import Tools from 'containers/patientManagement/Tools'
import ViewDeviceList from 'containers/deviceManagement/ViewDeviceList'
import PatientProfileData from 'components/reusableComponents/PatientProfileData'
import ActivePatientMonitoring from 'containers/patientManagement/ActivePatientMonitoring'
import ViewPatientProfile from 'containers/patientManagement/ViewPatientProfile'

const { Sider, Content, Header } = Layout

function Dashboard() {
  const [collapsed, setCollapsed] = React.useState(false)
  const [smallScreen, setSmallScreen] = React.useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Router>
      <Layout>
        <Sider
          breakpoint="xs"
          collapsible
          trigger={!smallScreen ? null : undefined}
          collapsedWidth={smallScreen ? 0 : 80}
          collapsed={collapsed}
          style={
            smallScreen
              ? {
                  // change sider style on xs screen
                  position: 'absolute',
                  zIndex: '1',
                  height: '100vh',
                }
              : {}
          }
          onBreakpoint={(broken) => {
            console.log(broken)
            setSmallScreen(broken)
          }}
          onCollapse={toggle}
        >
          {collapsed ? (
            <Row style={{ padding: '1rem' }}>
              <img
                src={logo}
                alt="logo"
                style={{ height: '32px', margin: 'auto' }}
              />
            </Row>
          ) : (
            <Row style={{ padding: '1rem' }}>
              <img
                src={logoBig}
                alt="logo"
                style={{ height: '32px', margin: 'auto' }}
              />
            </Row>
          )}

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/">Dashboard</Link>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <Link to="/view-patientList">Patient List</Link>,
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: <Link to="/tools">Tools</Link>,
              },
              {
                key: '5',
                icon: <UploadOutlined />,
                label: <Link to="/view-deviceList">Device List</Link>,
              },
            ]}
          />
          <Row>
            <Button
              type="primary"
              onClick={toggle}
              style={{ margin: 'auto', width: '90%' }}
            >
              {collapsed ? 'Open' : 'Close'}
            </Button>
          </Row>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
              margin: '1rem',
            }}
          >
            <Route exact path="/" component={ActivePatientMonitoring} />
            <Route path="/patientProfile/:id" component={PatientProfile} />
            <Route
              path="/view-patientProfile/:id"
              component={ViewPatientProfile}
            />
            <Route
              path="/patientProfileData/:id"
              component={PatientProfileData}
            />
            <Route path="/view-patientList" component={ViewPatientList} />
            <Route path="/tools" component={Tools} />
            <Route path="/view-deviceList" component={ViewDeviceList} />
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default Dashboard
