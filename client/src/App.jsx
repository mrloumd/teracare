import React from 'react';
import { Layout } from 'antd';
import Dashboard from 'containers/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <ToastContainer
        position="bottom-right"
      />
      <Dashboard />
    </Layout>
  );
}

export default App;
