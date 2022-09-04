/* eslint-disable no-tabs */
import styled from "styled-components";
import { Card } from "antd";

const StyledCard = styled(Card)`
	/* box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);

	box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.12);

	box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.14);*/
	border-radius: 1rem 1rem 0 0;
	box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
	width: 100% !important;
	height: 100% !important;

	// :hover {
	// 	background-position: 100% 0;
	// 	moz-transition: all .4s ease-in-out;
	// 	-o-transition: all .4s ease-in-out;
	// 	-webkit-transition: all .4s ease-in-out;
	// 	transition: all .4s ease-in-out;
	// 	background-image: linear-gradient(180deg, rgba(245, 247, 250, 1) 10%, rgba(172, 224, 249, .5)	100%);

	// }
`;

const StyledCardGrid = styled(Card.Grid)`
	.ant-card-grid {
		width: 50%;
	}
`;

export { StyledCard, StyledCardGrid };
