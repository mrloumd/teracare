import styled from 'styled-components';
import { Table } from 'antd';

const StyledTable = styled(Table)`
  .ant-table-pagination {
    justify-content: space-between !important;
  }
  .ant-pagination:after {
    content: none; // remove this if there is bug in pagination css
  }
  .ant-pagination-options-quick-jumper input {
    value: 1;
  }
  .ant-table-thead > tr > th {

  }

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 2px solid #e8e8e8 !important;
`;

export default StyledTable;
