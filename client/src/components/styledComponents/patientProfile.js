/* eslint-disable no-tabs */
import styled from "styled-components";
import { Card, Button } from "antd";

const StyledDetails = styled(Card)`
	width: 25%;
	overflow: hidden;
	position: relative;
	text-align: center;
	box-shadow: 0 3px 10px rgb(0 0 0 / 20%);

	@media (max-width: 835px) {
		width: 100%;
	}
`;

const StyledButton = styled(Button)`
	font-size: 1.2rem;
	margin: 0.5rem;
	width: 100%;
	height: 100%;

	:hover {
		background-color: #4ccec6;
		border-radius: 0rem 12rem 70rem 0rem;
		border: none;
	}
`;
export { StyledDetails, StyledButton };
