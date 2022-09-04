import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Button1, PageLayout } from './styledComponents/index';

const { Header, Content } = PageLayout;

function Main() {
  return (
    <div className="Main">
      <PageLayout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <span>TeraCare</span>
          <Menu theme="dark" mode="horizontal">
            {' '}
            <span>red</span>
            <span>blue</span>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: '0 50px', marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            Content
          </div>
        </Content>
      </PageLayout>

      <Button1 type="dashed">Link Button</Button1>
    </div>
  );
}

export default Main;
