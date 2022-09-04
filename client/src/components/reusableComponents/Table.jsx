import React from 'react';
import { useHistory } from 'react-router-dom';
import StyledTable from 'components/styledComponents/table';
import {
  Row, Col, Button, Select, InputNumber, Space,
} from 'antd';

function Table({
  columns,
  dataSource,
  loading,
  rowLink,
  onChange,
  fetching,
  pageCount,
  currentPage,
  setCurrentPage,
  setPageSize,
  rowsCount,
  pagination = true,
  handleFilterReset,
}) {
  const history = useHistory();
  // const { merchantBranding } = useSelector((state) => state.merchant);

  return (
    <>
      {handleFilterReset ? (
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={handleFilterReset}>Clear filters</Button>
          {rowsCount}
          {' '}
          results found
        </Space>
      ) : null}

      <StyledTable
        columns={columns}
        dataSource={dataSource}
        loading={loading || fetching}
        onRow={
          rowLink // if rowLink is provided, then the row will be clickable
            ? (record) => ({
              onClick: () => {
                history.push(`/${rowLink}/${record.id}`);
              }, // click row
            })
            : null
        }
        scroll={{ x: 'calc(700px + 50%)', y: 400 }}
        pagination={false}
        onChange={onChange}

        // pagination={{
        //   simple: true,
        //   pageSize: 1,
        //   showSizeChanger: true,
        //   position: ['bottomCenter'],
        // }}
      />

      {!pagination ? null : (
        <Row
          wrap
          style={{
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '.5rem',
            marginTop: '1rem',
            border: '2px solid #e8e8e8',
            boxShadow:
              'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
          }}
        >
          <Col span={6} md={6} xs={24}>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%', height: '100%' }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </Button>
          </Col>
          <Col
            span={10}
            md={10}
            xs={24}
            style={{ alignItems: 'center', textAlign: 'center' }}
          >
            <div
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ margin: '0 1rem' }}>Page</span>
              <InputNumber
                placeholder="Search"
                style={{ width: '3rem' }}
                value={currentPage}
                // onKeyDown={e => {
                //   if (e.key === 'Enter') {
                //     setCurrentPage(e.target.value);
                //   }
                // }}
                formatter={(value) => `${value}`}
                onChange={(value) => setCurrentPage(value)}
                max={pageCount}
                min={1}
              />
              <span style={{ margin: '0 1rem' }}>
                of
                {pageCount}
              </span>
            </div>
            <Select
              defaultValue="10"
              style={{ width: '7rem' }}
              onChange={(e) => setPageSize(e)}
            >
              <Select.Option value="10">10 Rows</Select.Option>
              <Select.Option value="20">20 Rows</Select.Option>
              <Select.Option value="30">30 Rows</Select.Option>
            </Select>
          </Col>
          <Col span={6} md={6} xs={24}>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%', height: '100%' }}
              disabled={currentPage === pageCount}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Table;
