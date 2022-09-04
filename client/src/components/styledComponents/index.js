import styled from "styled-components";
import { Button } from "antd";
import { Layout } from "antd";

export const PageLayout = styled(Layout)`
	/* span {
		color: red;
	} */

	.ant-menu-dark.ant-menu-horizontal {
		float: right;
	}
	span {
		margin: 0 20px;
	}
`;

export const Button1 = styled(Button)`
	color: yellow;
`;
